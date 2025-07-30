import { faqs } from '../../../components/FloatingButtons/ChatBot/config/chatbotConfig'
import { NextResponse } from 'next/server'

const normalize = (str) =>
  str.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')

// Distancia de Levenshtein
const levenshtein = (a, b) => {
  const dp = Array(b.length + 1).fill().map(() => Array(a.length + 1).fill(0))
  for (let i = 0; i <= a.length; i++) dp[0][i] = i
  for (let j = 0; j <= b.length; j++) dp[j][0] = j
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i-1] === b[j-1] ? 0 : 1
      dp[j][i] = Math.min(dp[j][i-1] + 1, dp[j-1][i] + 1, dp[j-1][i-1] + cost)
    }
  }
  return dp[b.length][a.length]
}

export async function POST(request) {
  const { text } = await request.json()
  const input = normalize(text)

  // 1. Detección de operaciones aritméticas simples (suma/resta)
  const mathMatch = input.match(/(-?\d+(?:\.\d+)?)\s*([+\-])\s*(-?\d+(?:\.\d+)?)/)
  if (mathMatch) {
    const [, n1, op, n2] = mathMatch.map((v) => parseFloat(v) || v)
    const result = op === '+' ? n1 + n2 : n1 - n2
    return NextResponse.json({ answer: `El resultado de ${n1} ${op} ${n2} es ${result}.` })
  }

  // 2. Coincidencia exacta de keywords
  const matches = []
  for (const faq of faqs) {
    for (const kw of faq.keywords) {
      if (input.includes(normalize(kw))) {
        matches.push(faq.answer)
        break
      }
    }
  }
  if (matches.length > 0) {
    // Concatenar respuestas únicas
    const unique = Array.from(new Set(matches))
    return NextResponse.json({ answer: unique.join(' \n\n ') })
  }

  // 3. Fuzzy matching (Levenshtein)
  let best = { score: Infinity, answer: '' }
  for (const faq of faqs) {
    for (const kw of faq.keywords) {
      const dist = levenshtein(input, normalize(kw))
      if (dist < best.score) best = { score: dist, answer: faq.answer }
    }
  }

  // Umbral dinámico y fallback
  const threshold = Math.max(2, Math.floor(input.length * 0.2))
  if (best.score <= threshold) {
    return NextResponse.json({ answer: best.answer })
  }
  return NextResponse.json({ answer: 'Disculpa, no entendí bien. ¿Podrías reformular con más contexto?' })
}