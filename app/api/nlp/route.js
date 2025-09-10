import { faqsAll } from '../../../components/FloatingButtons/ChatBot/config/chatbotConfig'
import { NextResponse } from 'next/server'
import { SYNONYMS, WEIGHTS, SERVICE_HINT_STEMS, CONVERSATIONAL_TOPICS } from './const.js'

/* ──────────────────────────────────────────────────────────────────────────
   0) ENLACES CENTRALES (quedan disponibles por si los usa el front,
      PERO el backend no agrega ningún bloque de “Enlaces útiles”)
   ------------------------------------------------------------------------- */
const WA_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '')
const LINKS = {
  servicios: '/servicios',
  contacto: '/contacto',
  ubicacion: '/contacto#mapa',
  rrhh_postulaciones: '/rrhh',
  ambito_geografico: '/#experiencia',
  exterior: '/#proyectos-internacionales',
  equipo_certificaciones: '/#equipo',
  obras: '/obras',
  empresa: '/empresa',
  whatsapp: WA_NUM ? `https://wa.me/${WA_NUM}` : null,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/north.winds.sa/',
  email: 'mailto:northwinds1223@gmail.com'
}

/* ──────────────────────────────────────────────────────────────────────────
   1) INTENCIONES DURAS (stems → topic) EXTENDIDAS
   ------------------------------------------------------------------------- */
const HARD_INTENTS = new Map([
  ['horari','horario'],
  ['presupuest','presupuesto'],

  ['contact','contacto'], ['contacto','contacto'],
  ['whatsapp','contacto'], ['email','contacto'], ['correo','contacto'], ['telefon','contacto'], ['llam','contacto'],

  ['ubic','ubicacion'], ['direccion','ubicacion'], ['mapa','ubicacion'], ['map','ubicacion'],

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
;['dond','ubicad','encuentr','quedan','queda','direccion','map','estan','están','localizacion','localización']
  .forEach(s => HARD_INTENTS.set(s, 'ubicacion'))

// Ámbito geográfico (Argentina)
;['argentin','pais','provinc','zona','ambit','nacional','donde trabaj','trabajan','operan','region','región','bahia','rio','chubut','madryn','cordob','pomona','achiras']
  .forEach(s => HARD_INTENTS.set(s, 'ambito_geografico'))

// Exterior / internacional
;['exterior','internacional','afuera','uruguay','brasil','venezuela','caracoles','acarau','itarema','guajira']
  .forEach(s => HARD_INTENTS.set(s, 'exterior'))

// Disponibilidad
;['disponibil','agenda','cuando','turno','fecha','plazo','urgente','cuand','podrian','podrán','pueden']
  .forEach(s => HARD_INTENTS.set(s, 'disponibilidad'))

// RRHH / postulaciones
;[
  'trabajar','trabajo','empleo','postular','postulacion','postulaciones','postulando',
  'cv','curriculum','curriculo','rrhh','recursos','humanos','talento',
  'contratar','contratacion','vacante','vacantes','oferta','ofertas','equipo',
  'busc','busqueda','sumarme','recurso','human'
].forEach(s => HARD_INTENTS.set(s, 'rrhh_postulaciones'))

// Equipo / certificaciones
;['equipo','personal','formacion','formación','certificacion','certificación','wtc','capacitacion','capacitación']
  .forEach(s => HARD_INTENTS.set(s, 'equipo_certificaciones'))

/* Alias de tópicos */
const TOPIC_ALIASES = new Map([
  ['redes_web','contacto'],
  ['humano','contacto']
])

/* ──────────────────────────────────────────────────────────────────────────
   2) HELPERS NLP
   ------------------------------------------------------------------------- */
const normalize = (str) =>
  String(str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const lightStem = (w) =>
  w
    .replace(/(ciones|ciones?)$/, 'cion')
    .replace(/(mente)$/, '')
    .replace(/(ando|iendo)$/, '')
    .replace(/(es|s)$/, '')
    .replace(/(icas|icos|ica|ico)$/, 'ic')
    .replace(/(adas|ados|ada|ado)$/, 'ad')

const tokenize = (str) => normalize(str).split(' ').filter(Boolean).map(lightStem)

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

/* ──────────────────────────────────────────────────────────────────────────
   3) SUPLEMENTO DE FAQs DESDE EL DOCUMENTO (se agrega, no pisa nada)
   ------------------------------------------------------------------------- */
const DOC_SUPPLEMENT_FAQS = [
  {
    topic: 'ambito_geografico',
    keywords: [
      'donde trabajan', 'ambito geografico', 'zonas', 'provincias',
      'operan en argentina', 'alcance nacional', 'bahia blanca', 'rio negro', 'pomona',
      'cordoba', 'achiras', 'chubut', 'puerto madryn', 'la rioja'
    ],
    answer:
      'Operamos en **todo el territorio argentino**. Experiencia en parques de La Rioja, Bahía Blanca, Río Negro (Pomona), Córdoba (Achiras), Chubut y Puerto Madryn.'
  },
  {
    topic: 'exterior',
    keywords: [
      'trabajan en el exterior', 'internacional', 'otros paises', 'uruguay', 'brasil', 'venezuela',
      'sierra de los caracoles', 'acarau', 'itarema', 'la guajira'
    ],
    answer:
      'Sí, también trabajamos en el **exterior**. Participamos en proyectos en **Venezuela (La Guajira), Brasil (Acarau e Itarema) y Uruguay (Sierra de los Caracoles)**.'
  },
  {
    topic: 'disponibilidad',
    keywords: ['disponibilidad', 'agenda', 'plazos', 'cuando pueden', 'urgente'],
    answer:
      'Contamos con **disponibilidad nacional e internacional**, adaptándonos a la necesidad y cronograma de cada proyecto.'
  },
  {
    topic: 'rrhh_postulaciones',
    keywords: ['empleo', 'trabajo', 'postulacion', 'enviar cv', 'rrhh', 'vacantes', 'sumarme al equipo'],
    answer:
      'Estamos **ampliando el equipo** de forma continua. Si tu perfil se alinea, podés **enviar tu CV** a nuestro correo y te contactamos.'
  },
  {
    topic: 'equipo_certificaciones',
    keywords: ['equipo', 'personal', 'formacion', 'certificaciones', 'wtc', 'wind training center'],
    answer:
      'Nuestro equipo está integrado por **técnicos y profesionales con experiencia desde 2010**, con **certificaciones WTC (Wind Training Center)** en calidad, seguridad y procedimientos del sector eólico.'
  }
]

/* Merge por topic (no pisa; solo agrega si el topic no existe) */
const mergeFaqsByTopic = (base, extras) => {
  const hasTopic = new Set((base || []).map(f => f.topic).filter(Boolean))
  const toAdd = (extras || []).filter(f => f.topic && !hasTopic.has(f.topic))
  return Array.isArray(base) ? base.concat(toAdd) : toAdd
}

/* ──────────────────────────────────────────────────────────────────────────
   4) PREPROC + SCORING
   ------------------------------------------------------------------------- */
const preprocessFaqs = (faqs) => {
  return faqs.map((f) => {
    const expanded = new Set()
    for (const kw of f.keywords || []) {
      const nk = normalize(kw)
      if (!nk) continue
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

const scoreFaq = (inputRaw, faq) => {
  const inputNorm = normalize(inputRaw)
  const inputTokens = tokenize(inputNorm)
  let score = 0

  // Frase exacta dentro del input
  for (const kw of faq.keywords || []) {
    const nkw = normalize(kw)
    if (nkw && inputNorm.includes(nkw)) score += WEIGHTS.exactPhrase
  }

  // Coincidencias por token
  for (const t of inputTokens) {
    if (!t) continue
    if (faq._expanded?.includes(t)) { score += WEIGHTS.tokenExact; continue }
    const syns = SYNONYMS[t] || []
    if (syns.length) score += WEIGHTS.tokenSynonym

    // Fuzzy más estricto (solo palabras ≥5 letras, distancia 1)
    const maxDist = 1
    let matchedFuzzy = false
    if (t.length >= 5 && faq._expanded?.length) {
      for (const e of faq._expanded) {
        const d = levenshtein(t, e, maxDist)
        if (d <= maxDist) { matchedFuzzy = true; break }
      }
    }
    if (matchedFuzzy) score += WEIGHTS.tokenFuzzy
  }

  // Hits por keyword (coincidencia o semejanza global)
  let hits = 0
  for (const kw of faq.keywords || []) {
    const nkw = normalize(kw)
    const d = levenshtein(inputNorm, nkw, Math.ceil(nkw.length * 0.2))
    if (inputNorm.includes(nkw) || d <= Math.max(2, Math.floor(nkw.length * 0.2))) hits++
  }
  score += hits * WEIGHTS.keywordHit

  return score
}

let _faqsPre = null
const getPreprocessedFaqs = () => {
  if (!_faqsPre) {
    const fused = mergeFaqsByTopic(faqsAll, DOC_SUPPLEMENT_FAQS)
    _faqsPre = preprocessFaqs(fused)
  }
  return _faqsPre
}

const collapseTopic = (t) => TOPIC_ALIASES.get(t) || t

const detectExplicitTopics = (inputNorm, inputTokens, faqs) => {
  const topics = new Set()
  for (const t of inputTokens) {
    const topic = HARD_INTENTS.get(t)
    if (topic) topics.add(topic)
  }
  for (const f of faqs) {
    for (const kw of f.keywords || []) {
      const k = normalize(kw)
      if (!k) continue
      if (inputNorm.includes(k)) { topics.add(f.topic || 'no_topic'); break }
    }
  }
  return Array.from(topics)
}

/* ──────────────────────────────────────────────────────────────────────────
   5) COBERTURA DE DOMINIO (para cortar fuera-de-dominio)
   ------------------------------------------------------------------------- */
const getDomainTokens = (() => {
  let memo = null
  return () => {
    if (memo) return memo
    const faqs = getPreprocessedFaqs()
    memo = new Set(
      faqs.flatMap(f => (f._expanded || []))
          .filter(w => w && w.length >= 3)
    )
    return memo
  }
})()

const domainCoverage = (inputTokens) => {
  const DOMAIN = getDomainTokens()
  const uniq = Array.from(new Set(inputTokens))
  const hits = uniq.filter(t => DOMAIN.has(t)).length
  return hits / Math.max(1, uniq.length)
}

/* ──────────────────────────────────────────────────────────────────────────
   6) ENSAMBLA RESPUESTA (sin anexar links)
   ------------------------------------------------------------------------- */
const composeAnswer = ({ items, explicitTopics = [], hasServiceHint, seen }) => {
  const normItems = items.map(x => ({ ...x, topic: collapseTopic(x.f.topic || 'no_topic') }))
  const byTopic = (t) => normItems.find(x => x.topic === t)?.f?.answer

  const parts = []
  const explicitSet = new Set(explicitTopics.map(collapseTopic))

  // Saludo
  if (explicitSet.has('saludo') && !seen.has('saludo')) {
    const saludo = byTopic('saludo')
    if (saludo) parts.push(saludo)
  }

  // Directos
  const DIRECT_ORDER = [
    'ubicacion','horario','presupuesto','contacto',
    'rrhh_postulaciones','equipo_certificaciones',
    'ambito_geografico','exterior','disponibilidad','quien_soy'
  ]
  for (const t of DIRECT_ORDER) {
    const a = byTopic(t)
    if (a) parts.push(a)
  }

  // Servicios gen.
  const servicios = byTopic('servicios')
  if (servicios) parts.push(servicios)

  // Específicos (máx 2)
  const especificos = normItems
    .filter(x => /^eolico_|^solar_/.test(x.topic))
    .slice(0, 2)
    .map(x => x.f.answer)
  parts.push(...especificos)

  // CTA suave si no hubo hint de servicio
  if (!hasServiceHint) {
    const contacto = byTopic('contacto')
    const presupuesto = byTopic('presupuesto')
    if (contacto) parts.push(contacto)
    else if (presupuesto) parts.push(presupuesto)
  }

  // Devolver deduplicado
  return Array.from(new Set(parts.filter(Boolean))).join('\n\n')
}

/* ──────────────────────────────────────────────────────────────────────────
   7) HANDLER POST
   ------------------------------------------------------------------------- */
export async function POST(request) {
  const { text, seenTopics = [] } = await request.json()
  const input = typeof text === 'string' ? text : ''
  const inputNorm = normalize(input)
  const inputTokens = tokenize(inputNorm)
  const seen = new Set(Array.isArray(seenTopics) ? seenTopics : [])

  // Política anti-números
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

  // Scoring base
  const faqs = getPreprocessedFaqs()
  const scored = faqs.map((f) => ({ f, score: scoreFaq(input, f) }))

  // Mejor por topic
  const bestByTopic = new Map()
  for (const item of scored) {
    const topic = item.f.topic || 'no_topic'
    const prev = bestByTopic.get(topic)
    if (!prev || item.score > prev.score) bestByTopic.set(topic, item)
  }

  // Overrides explícitos
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
      const topics = Array.from(new Set(explicitItems.map(x => collapseTopic(x.f.topic || 'no_topic'))))
      return NextResponse.json({
        answer,
        isFallback: false,
        topics
      })
    }
  }

  // Heurística general + cobertura de dominio
  const isVeryShort = inputTokens.length <= 3
  const hasServiceHint = inputTokens.some(t => SERVICE_HINT_STEMS.has(t))
  const coverage = domainCoverage(inputTokens)

  // Gate: fuera de dominio (sin hints ni explícitos)
  if (!explicitTopics.length && !hasServiceHint && coverage < 0.18) {
    return NextResponse.json({
      answer: 'Disculpá, no te entendí 🤔. Puedo ayudarte con *Servicios*, *Ubicación*, *Contacto*, *Horario*, *Presupuesto* o *Empleo*.',
      isFallback: true,
      topics: ['fallback']
    })
  }

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

  // Umbral y respuesta
  const top = winners.slice(0, 5)
  const maxScore = top[0]?.score ?? 0
  const threshold = Math.max(2.6, maxScore * 0.5)

  const selected = top.filter(x => x.score >= threshold)
  if (selected.length) {
    // Si tampoco hay hints y la cobertura sigue baja, devolvemos fallback
    if (!hasServiceHint && coverage < 0.18) {
      return NextResponse.json({
        answer: 'Disculpá, no te entendí 🤔. Puedo ayudarte con *Servicios*, *Ubicación*, *Contacto*, *Horario*, *Presupuesto* o *Empleo*.',
        isFallback: true,
        topics: ['fallback']
      })
    }

    const answer = composeAnswer({
      items: selected,
      explicitTopics,
      hasServiceHint,
      seen
    })
    const topics = Array.from(new Set(selected.map(x => collapseTopic(x.f.topic || 'no_topic'))))
    return NextResponse.json({
      answer,
      isFallback: false,
      topics
    })
  }

  // Fallback final
  return NextResponse.json({
    answer: 'Disculpá, no te entendí 🤔. Puedo ayudarte con *Servicios*, *Ubicación*, *Contacto*, *Horario*, *Presupuesto* o *Empleo*.',
    isFallback: true,
    topics: ['fallback']
  })
}
