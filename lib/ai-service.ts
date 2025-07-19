"use client"

import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"

// Usando Groq (gratuito e rápido) para análises
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || "",
})

export class AIService {
  static async analyzeContent(content: string, contentType: string) {
    try {
      const { text } = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        prompt: `Analise este conteúdo de ${contentType} para redes sociais:

"${content}"

Retorne uma análise JSON com:
- overallScore (0-100)
- categories: clarity, engagement, originality, format, tone, grammar, seo, geo
- Para cada categoria: score, feedback, suggestions[]
- examples: 3 exemplos similares de sucesso

Foque especialmente em SEO e GEO (Generative Engine Optimization).`,
        maxTokens: 2000,
      })

      return JSON.parse(text)
    } catch (error) {
      console.error("Erro na análise:", error)
      return null
    }
  }

  static async generateContent(topic: string, contentType: string, location?: string) {
    try {
      const { text } = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        prompt: `Gere conteúdo otimizado para ${contentType} sobre "${topic}"${location ? ` focado em ${location}` : ""}.

Retorne JSON com:
- title: título chamativo
- content: conteúdo completo estruturado
- hashtags: array de hashtags relevantes
- keywords: palavras-chave SEO
- structure: pontos da estrutura
- seoScore: pontuação estimada
- geoElements: elementos geográficos incluídos

Otimize para SEO e GEO (motores generativos).`,
        maxTokens: 1500,
      })

      return JSON.parse(text)
    } catch (error) {
      console.error("Erro na geração:", error)
      return null
    }
  }

  static async analyzeSentiment(content: string) {
    try {
      const { text } = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        prompt: `Analise o sentimento deste conteúdo:

"${content}"

Retorne JSON com:
- overall: {positive, neutral, negative} (percentuais)
- emotions: {joy, anger, surprise, sadness, fear} (percentuais)
- topics: array com {topic, mentions, sentiment}
- insights: array de insights acionáveis

Seja preciso e objetivo.`,
        maxTokens: 1000,
      })

      return JSON.parse(text)
    } catch (error) {
      console.error("Erro na análise de sentimento:", error)
      return null
    }
  }
}
