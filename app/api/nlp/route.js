import { faqs } from '../../../components/FloatingButtons/ChatBot/config/chatbotConfig'
import { NextResponse } from 'next/server'

const normalize = (str) =>
  str.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')

const levenshtein = (a, b) => {
  const dp = Array(b.length + 1).fill().map(() => Array(a.length + 1).fill(0))
  for (let i = 0; i <= a.length; i++) dp[0][i] = i
  for (let j = 0; j <= b.length; j++) dp[j][0] = j
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[j][i] = Math.min(dp[j][i - 1] + 1, dp[j - 1][i] + 1, dp[j - 1][i - 1] + cost)
    }
  }
  return dp[b.length][a.length]
}

export async function POST(request) {
  const { text } = await request.json()
  const input = normalize(text)

  const mathMatch = input.match(/(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)/)
  if (mathMatch) {
    const [, n1Str, op, n2Str] = mathMatch
    const n1 = parseFloat(n1Str)
    const n2 = parseFloat(n2Str)
    let result
    switch (op) {
      case '+': result = n1 + n2; break
      case '-': result = n1 - n2; break
      case '*': result = n1 * n2; break
      case '/': result = n2 !== 0 ? n1 / n2 : '∞'; break
    }
    const operation = `${n1} ${op} ${n2}`
    const servicePrompt = 'Hablando de otros temas, ¿te gustaría conocer nuestros servicios en parques eólicos y solares?'
    return NextResponse.json({
      answer: `Por favor evita incluir números en tus consultas de servicios. Detecté la operación "${operation}" cuyo resultado es ${result}. ${servicePrompt}`
    })
  }

  const matches = []
  for (const faq of faqs) {
    for (const kw of faq.keywords) {
      if (input.includes(normalize(kw))) {
        matches.push(faq.answer)
        break
      }
    }
  }
  if (matches.length) {
    const unique = Array.from(new Set(matches))
    return NextResponse.json({ answer: unique.join(' \n\n ') })
  }

  let best = { score: Infinity, answer: '' }
  for (const faq of faqs) {
    for (const kw of faq.keywords) {
      const dist = levenshtein(input, normalize(kw))
      if (dist < best.score) best = { score: dist, answer: faq.answer }
    }
  }

  const threshold = Math.max(2, Math.floor(input.length * 0.2))
  if (best.score <= threshold) {
    return NextResponse.json({ answer: best.answer })
  }
  return NextResponse.json({ answer: 'Disculpa, no entendí bien. ¿Podrías reformular con más contexto?' })
}