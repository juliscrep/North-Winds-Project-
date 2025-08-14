import { faqsAll } from '../../../components/FloatingButtons/ChatBot/config/chatbotConfig'
import { NextResponse } from 'next/server'
import { SYNONYMS, WEIGHTS, SERVICE_HINT_STEMS, CONVERSATIONAL_TOPICS } from './const.js'


// Mapa de intenciones “duras” (stems → topic) para overrides confiables
const HARD_INTENTS = new Map([
  ['horari','horario'],
  ['presupuest','presupuesto'],
  ['contact','contacto'], ['contacto','contacto'],
  ['whatsapp','contacto'], ['email','contacto'], ['correo','contacto'], ['telefon','contacto'], ['llam','contacto'],
  ['ubic','ubicacion'], ['direccion','ubicacion'], ['mapa','ubicacion'],
  ['hola','saludo'], ['buen','saludo'], ['hello','saludo'], ['hi','saludo'],
  ['gracia','gracias'],
  ['ayud','ayuda_menu'], ['menu','ayuda_menu'], ['opcion','ayuda_menu'],
  ['humano','humano'], ['asesor','humano'], ['persona','humano'], ['ventas','humano'],
  ['chau','despedida'], ['adios','despedida'], ['hasta','despedida'], ['luego','despedida']
])

;['ofrec','servis','brindan','hacen','hac','ofre','oferta'].forEach(s => HARD_INTENTS.set(s, 'servicios'))

// contacto/humano
;['coordin','coordinar','coordina','coordinem','llamad','llamar','llamame','llamado','asesor','persona','humano','hablar','comunicar']
  .forEach(s => HARD_INTENTS.set(s, 'contacto'))

// ubicación
;['dond','ubicad','encuentr','quedan','queda','direccion','map','estan']
  .forEach(s => HARD_INTENTS.set(s, 'ubicacion'))

// ✅ EMPLEO / RRHH: cubre “quiero trabajar”, “busco empleo”, “enviar CV”, etc.
;[
  // formas completas
  'trabajar','trabajo','empleo','postular','postulacion','postulaciones','postulando',
  'cv','curriculum','curriculo','curriculum','rrhh','recursos','humanos','talento',
  'contratar','contratacion','vacante','vacantes','oferta','ofertas','equipo',
  // stems que produce el lightStem
  'busc','busqueda','sumarme','recurso','human'
].forEach(s => HARD_INTENTS.set(s, 'rrhh_postulaciones'))


const TOPIC_ALIASES = new Map([
  ['redes_web','contacto'],
  ['humano','contacto']
])

// —————————— Utilidades ——————————
/**
 * @function normalize
 * @description Normaliza texto (minúsculas, sin tildes/ signos, espacios colapsados).
 * @param {string | any} str - Texto de entrada.
 * @returns {string} Texto normalizado.
 * @example normalize('¡Ubicación & Horarios!') // 'ubicacion horarios'
 * @remarks Idempotente; tolera null/undefined.
 */

const normalize = (str) =>
  String(str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/**
 * @function lightStem
 * @description Stemmer liviano en español: recorta sufijos frecuentes.
 * @param {string} w - Token ya normalizado.
 * @returns {string} Stem aproximado.
 * @example lightStem('inspecciones') // 'inspeccion'
 * @remarks Heurístico y barato; prioriza recall sobre precisión.
 */
const lightStem = (w) =>
  w
    .replace(/(ciones|ciones?)$/, 'cion')
    .replace(/(mente)$/, '')
    .replace(/(ando|iendo)$/, '')
    .replace(/(es|s)$/, '')
    .replace(/(icas|icos|ica|ico)$/, 'ic')
    .replace(/(adas|ados|ada|ado)$/, 'ad')

    /**
 * @function tokenize
 * @description Normaliza, divide por espacios y aplica lightStem a cada token.
 * @param {string} str - Texto bruto.
 * @returns {string[]} Lista de tokens stem.
 * @example tokenize('Revisión y reparación de palas') // ['revision','y','reparacion','de','pal']
 * @remarks Sin tokens vacíos; base para matching/scoring.
 */
const tokenize = (str) => normalize(str).split(' ').filter(Boolean).map(lightStem)

/**
 * @function levenshtein
 * @description Distancia Levenshtein con corte temprano por umbral.
 * @param {string} a - Cadena A.
 * @param {string} b - Cadena B.
 * @param {number} [max=Infinity] - Umbral de poda; si se supera, retorna max+1.
 * @returns {number} Distancia mínima de edición.
 * @example levenshtein('palas','palos',1) // 1
 * @remarks O(m·n) peor caso; se poda por fila si no puede mejorar.
 */
const levenshtein = (a, b, max = Infinity) => {
  a = String(a); b = String(b)
  const m = a.length, n = b.length
  if (Math.abs(m - n) > max) return max + 1
  const dp = new Array(n + 1)
  for (let j = 0; j <= n; j++) dp[j] = j
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]
    dp[0] = i
    let bestRow = dp[0]
    for (let j = 1; j <= n; j++) {
      const temp = dp[j]
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost)
      prev = temp
      if (dp[j] < bestRow) bestRow = dp[j]
    }
    if (bestRow > max) return max + 1
  }
  return dp[n]
}

/**
 * @function preprocessFaqs
 * @description Expande keywords por FAQ a variantes normalizadas, tokens, stems y sinónimos.
 * @param {{keywords: string[], topic?: string, answer?: string}[]} faqs - Lista de FAQs crudas.
 * @returns {({keywords: string[], topic?: string, answer?: string, _expanded: string[]})[]} FAQs con campo `_expanded`.
 * @example preprocessFaqs([{ keywords: ['torqueo y tensionado'] }])
 * @remarks No muta el input; usa normalize, tokenize, lightStem y SYNONYMS.
 */

const preprocessFaqs = (faqs) => {
  return faqs.map((f) => {
    const expanded = new Set()
    for (const kw of f.keywords) {
      const nk = normalize(kw)
      expanded.add(nk)
      tokenize(nk).forEach(t => expanded.add(t))
      nk.split(' ').forEach(w => {
        const stem = lightStem(w)
        if (stem) expanded.add(stem)
        ;(SYNONYMS[stem] || []).forEach(s => {
          const ns = normalize(s)
          expanded.add(ns)
          tokenize(ns).forEach(t => expanded.add(t))
        })
      })
    }
    return { ...f, _expanded: Array.from(expanded) }
  })
}

/**
 * @function scoreFaq
 * @description Puntúa similitud entre la consulta y una FAQ.
 * @param {string} inputRaw - Texto de usuario (bruto).
 * @param {{keywords: string[], _expanded: string[]}} faq - FAQ preprocesada.
 * @returns {number} Puntuación total.
 * @example scoreFaq('hacen torqueo?', faq) // número > 0
 * @remarks Suma: frase exacta, token exacto/sinónimo/difuso y hits por keyword; usa WEIGHTS y levenshtein.
 */
const scoreFaq = (inputRaw, faq) => {
  const inputNorm = normalize(inputRaw)
  const inputTokens = tokenize(inputNorm)
  let score = 0

  for (const kw of faq.keywords) {
    const nkw = normalize(kw)
    if (nkw && inputNorm.includes(nkw)) score += WEIGHTS.exactPhrase
  }

  for (const t of inputTokens) {
    if (!t) continue
    if (faq._expanded.includes(t)) { score += WEIGHTS.tokenExact; continue }
    const syns = SYNONYMS[t] || []
    if (syns.length) score += WEIGHTS.tokenSynonym

    const maxDist = t.length <= 4 ? 1 : 2
    let matchedFuzzy = false
    for (const e of faq._expanded) {
      const d = levenshtein(t, e, maxDist)
      if (d <= maxDist) { matchedFuzzy = true; break }
    }
    if (matchedFuzzy) score += WEIGHTS.tokenFuzzy
  }

  let hits = 0
  for (const kw of faq.keywords) {
    const nkw = normalize(kw)
    const d = levenshtein(inputNorm, nkw, Math.ceil(nkw.length * 0.2))
    if (inputNorm.includes(nkw) || d <= Math.max(2, Math.floor(nkw.length * 0.2))) hits++
  }
  score += hits * WEIGHTS.keywordHit

  return score
}

/**
 * @function getPreprocessedFaqs
 * @description Devuelve FAQs preprocesadas con memoización a nivel de módulo.
 * @returns {({keywords: string[], topic?: string, answer?: string, _expanded: string[]})[]} Arreglo memoizado.
 * @example const faqs = getPreprocessedFaqs()
 * @remarks Inicializa desde `faqsAll` la primera vez; luego reutiliza `_faqsPre`.
 */

let _faqsPre = null
const getPreprocessedFaqs = () => {
  if (!_faqsPre) _faqsPre = preprocessFaqs(faqsAll)
  return _faqsPre
}


/**
 * @function collapseTopic
 * @description Colapsa alias de tópico a su forma canónica.
 * @param {string} t - Tópico detectado.
 * @returns {string} Tópico canónico.
 * @example collapseTopic('humano') // 'contacto'
 * @remarks Usa `TOPIC_ALIASES`; retorna `t` si no hay alias.
 */
const collapseTopic = (t) => TOPIC_ALIASES.get(t) || t

/**
 * @function detectExplicitTopics
 * @description Detecta tópicos explícitos por stems “duros” y frases exactas presentes en FAQs.
 * @param {string} inputNorm - Texto normalizado del usuario.
 * @param {string[]} inputTokens - Tokens (stems) del usuario.
 * @param {{keywords:string[], topic?:string}[]} faqs - FAQs (sin o con _expanded).
 * @returns {string[]} Lista de tópicos (deduplicados).
 * @example detectExplicitTopics('horario y ubicación', ['horari','y','ubicacion'], faqs)
 * @remarks Prioriza HARD_INTENTS; también incluye coincidencias por keyword normalizada.
 */

const detectExplicitTopics = (inputNorm, inputTokens, faqs) => {
  const topics = new Set()
  for (const t of inputTokens) {
    const topic = HARD_INTENTS.get(t)
    if (topic) topics.add(topic)
  }
  for (const f of faqs) {
    for (const kw of f.keywords) {
      const k = normalize(kw)
      if (!k) continue
      if (inputNorm.includes(k)) { topics.add(f.topic || 'no_topic'); break }
    }
  }
  return Array.from(topics)
}

/**
 * @function composeAnswer
 * @description Ensambla la respuesta final con orden “humano” y deduplicación.
 * @param {{
 *   items: Array<{ f: { topic?: string, answer?: string }, score: number }>,
 *   explicitTopics?: string[],
 *   hasServiceHint?: boolean,
 *   seen: Set<string>
 * }} args - Parámetros de composición.
 * @returns {string} Texto final a mostrar.
 * @example composeAnswer({ items, explicitTopics: ['horario'], hasServiceHint: true, seen: new Set() })
 * @remarks Orden: saludo (si aplica) → directos → servicios → específicos (máx 2) → CTA; colapsa alias; quita duplicados.
 */

const composeAnswer = ({ items, explicitTopics = [], hasServiceHint, seen }) => {
  const normItems = items.map(x => ({ ...x, topic: collapseTopic(x.f.topic || 'no_topic') }))
  const byTopic = (t) => normItems.find(x => x.topic === t)?.f?.answer

  const parts = []
  const explicitSet = new Set(explicitTopics.map(collapseTopic))

  // 1) Saludo primero SOLO si fue explícito y no se saludó antes
  if (explicitSet.has('saludo') && !seen.has('saludo')) {
    const saludo = byTopic('saludo')
    if (saludo) parts.push(saludo)
  }

  // 2) Intenciones directas (ordenadas de más “concreto” a menos)
  const DIRECT_ORDER = [
    'ubicacion','horario','presupuesto','contacto',
    'rrhh_postulaciones','equipo_certificaciones',
    'ambito_geografico','exterior','disponibilidad','quien_soy'
  ]
  for (const t of DIRECT_ORDER) {
    const a = byTopic(t)
    if (a) parts.push(a)
  }

  // 3) Servicios generales
  const servicios = byTopic('servicios')
  if (servicios) parts.push(servicios)

  // 4) Específicos (máx 2): eólico/solar
  const especificos = normItems
    .filter(x => /^eolico_|^solar_/.test(x.topic))
    .slice(0, 2)
    .map(x => x.f.answer)
  parts.push(...especificos)

  // 5) Si el usuario no mostró intención de negocio, cerramos con una vía de acción
  if (!hasServiceHint) {
    const contacto = byTopic('contacto')
    const presupuesto = byTopic('presupuesto')
    if (contacto) parts.push(contacto)
    else if (presupuesto) parts.push(presupuesto)
  }

  // Si aún no hay nada, devolvemos lo que haya
  if (!parts.length) parts.push(...normItems.map(x => x.f.answer))

  return Array.from(new Set(parts.filter(Boolean))).join('\n\n')
}

/**
 * @function POST
 * @description Handler de Next.js (route) para /api/nlp.
 * @param {Request} request - Request con body JSON: { text: string, seenTopics?: string[] }.
 * @returns {Promise<import('next/server').NextResponse<{
 *   answer: string, isFallback: boolean, topics: string[]
 * }>>} Respuesta JSON.
 * @example // fetch('/api/nlp', { method:'POST', body: JSON.stringify({ text:'horario' }) })
 * @remarks Pipeline: política anti-números → cacheo de FAQs → scoring → overrides explícitos → heurística (longitud, pistas de servicio, vistos) → umbral → fallback.
 */

export async function POST(request) {
  const { text, seenTopics = [] } = await request.json()
  const input = typeof text === 'string' ? text : ''
  const inputNorm = normalize(input)
  const inputTokens = tokenize(inputNorm)
  const seen = new Set(Array.isArray(seenTopics) ? seenTopics : [])

  // 1) No números
  if (/\d/u.test(inputNorm)) {
    return NextResponse.json({
      answer:
        'Para mantener la consulta clara, por favor evitá incluir números. ' +
        'Si buscás un presupuesto, contanos el servicio (eólico/solar y tarea), la escala del proyecto y la ubicación. ' +
        'Si preferís, dejá tu teléfono en *Contacto* o escribinos a **northwinds1223@gmail.com** y te llama un asesor.',
      isFallback: false,
      topics: ['policy_numeros']
    })
  }

  // 2) Puntuar
  const faqs = getPreprocessedFaqs()
  const scored = faqs.map((f) => ({ f, score: scoreFaq(input, f) }))

  // best por topic
  const bestByTopic = new Map()
  for (const item of scored) {
    const topic = item.f.topic || 'no_topic'
    const prev = bestByTopic.get(topic)
    if (!prev || item.score > prev.score) bestByTopic.set(topic, item)
  }

  // 3) Overrides explícitos
  const explicitTopics = detectExplicitTopics(inputNorm, inputTokens, faqs)
  if (explicitTopics.length) {
    const explicitItems = explicitTopics
      .map(t => bestByTopic.get(t))
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    if (explicitItems.length) {
      const answer = composeAnswer({
        items: explicitItems,
        explicitTopics,
        hasServiceHint: true,
        seen
      })
      return NextResponse.json({
        answer,
        isFallback: false,
        topics: Array.from(new Set(explicitItems.map(x => collapseTopic(x.f.topic || 'no_topic'))))
      })
    }
  }

  // 4) Heurística general
  const isVeryShort = inputTokens.length <= 3
  const hasServiceHint = inputTokens.some(t => SERVICE_HINT_STEMS.has(t))
  let winners = Array.from(bestByTopic.values()).sort((a, b) => b.score - a.score)

  if (isVeryShort && !hasServiceHint) {
    const preferred = winners.filter(w => CONVERSATIONAL_TOPICS.has(w.f.topic) && !seen.has(w.f.topic))
    winners = (preferred.length ? preferred : winners).slice(0, 1)
  } else if (hasServiceHint) {
    const nonConv = winners.filter(w => !CONVERSATIONAL_TOPICS.has(w.f.topic))
    if (nonConv.length) winners = nonConv
    winners = winners.filter(w => !(CONVERSATIONAL_TOPICS.has(w.f.topic) && seen.has(w.f.topic)))
  } else {
    winners = winners.filter(w => !(CONVERSATIONAL_TOPICS.has(w.f.topic) && seen.has(w.f.topic)))
  }

  // 5) Umbral + respuesta final
  const top = winners.slice(0, 5)
  const maxScore = top[0]?.score ?? 0
  const threshold = Math.max(2.6, maxScore * 0.5)

  const selected = top.filter(x => x.score >= threshold)
  if (selected.length) {
    const answer = composeAnswer({
      items: selected,
      explicitTopics,
      hasServiceHint,
      seen
    })
    return NextResponse.json({
      answer,
      isFallback: false,
      topics: Array.from(new Set(selected.map(x => collapseTopic(x.f.topic || 'no_topic'))))
    })
  }

  // 6) Fallback
  return NextResponse.json({
    answer:
      'No estoy seguro de haber entendido 🤔. ¿Querés ver opciones rápidas de *Servicios*, *Ubicación*, *Contacto*, *Horario*, *Disponibilidad* o *Búsqueda de personal*?',
    isFallback: true,
    topics: ['fallback']
  })
}