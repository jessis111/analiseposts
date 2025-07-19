"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, TrendingUp, Smile, Frown, Meh } from "lucide-react"

interface SentimentData {
  overall: {
    positive: number
    neutral: number
    negative: number
  }
  emotions: {
    joy: number
    anger: number
    surprise: number
    sadness: number
    fear: number
  }
  topics: Array<{
    topic: string
    mentions: number
    sentiment: "positive" | "neutral" | "negative"
  }>
  insights: string[]
}

interface SentimentAnalysisProps {
  content: string
}

export function SentimentAnalysis({ content }: SentimentAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null)

  const analyzeSentiment = async () => {
    setIsAnalyzing(true)

    // Simular análise de sentimento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockSentimentData: SentimentData = {
      overall: {
        positive: 68,
        neutral: 22,
        negative: 10,
      },
      emotions: {
        joy: 45,
        anger: 8,
        surprise: 25,
        sadness: 5,
        fear: 17,
      },
      topics: [
        { topic: "qualidade do produto", mentions: 156, sentiment: "positive" },
        { topic: "atendimento", mentions: 89, sentiment: "positive" },
        { topic: "preço", mentions: 67, sentiment: "neutral" },
        { topic: "entrega", mentions: 34, sentiment: "negative" },
        { topic: "inovação", mentions: 123, sentiment: "positive" },
      ],
      insights: [
        "O sentimento geral é predominantemente positivo (68%)",
        "Qualidade do produto é o tópico mais mencionado positivamente",
        "Entrega é o principal ponto de melhoria identificado",
        "Alta presença de emoções de alegria e surpresa",
        "Recomenda-se focar em melhorar a logística de entrega",
      ],
    }

    setSentimentData(mockSentimentData)
    setIsAnalyzing(false)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-emerald-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-yellow-600"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="w-4 h-4 text-emerald-600" />
      case "negative":
        return <Frown className="w-4 h-4 text-red-600" />
      default:
        return <Meh className="w-4 h-4 text-yellow-600" />
    }
  }

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-pink-600" />
          <span>Análise de Sentimento</span>
        </CardTitle>
        <CardDescription>Análise qualitativa de engajamento e sentimentos da audiência</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!sentimentData ? (
          <div className="text-center py-8">
            <Button onClick={analyzeSentiment} disabled={isAnalyzing} className="bg-pink-600 hover:bg-pink-700">
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analisando Sentimentos...
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Analisar Sentimento dos Comentários
                </>
              )}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="overview">Sentimento Geral</TabsTrigger>
              <TabsTrigger value="emotions">Emoções</TabsTrigger>
              <TabsTrigger value="topics">Tópicos</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-4 text-center">
                    <Smile className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                    <div className="text-2xl font-bold text-emerald-600">{sentimentData.overall.positive}%</div>
                    <div className="text-sm text-emerald-700">Positivo</div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-4 text-center">
                    <Meh className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <div className="text-2xl font-bold text-yellow-600">{sentimentData.overall.neutral}%</div>
                    <div className="text-sm text-yellow-700">Neutro</div>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4 text-center">
                    <Frown className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <div className="text-2xl font-bold text-red-600">{sentimentData.overall.negative}%</div>
                    <div className="text-sm text-red-700">Negativo</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-base text-blue-900">Insights Principais</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {sentimentData.insights.map((insight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-blue-800">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emotions" className="space-y-4">
              <div className="space-y-4">
                {Object.entries(sentimentData.emotions).map(([emotion, percentage]) => (
                  <div key={emotion} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {emotion === "joy"
                          ? "😊 Alegria"
                          : emotion === "anger"
                            ? "😠 Raiva"
                            : emotion === "surprise"
                              ? "😲 Surpresa"
                              : emotion === "sadness"
                                ? "😢 Tristeza"
                                : "😰 Medo"}
                      </span>
                      <span className="text-sm font-semibold">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-purple-900 mb-2">💡 Recomendação Emocional</h4>
                  <p className="text-sm text-purple-800">
                    Com 45% de alegria e 25% de surpresa, seu conteúdo gera emoções positivas. Continue explorando
                    elementos que causam surpresa e alegria para maximizar o engajamento.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topics" className="space-y-4">
              <div className="space-y-3">
                {sentimentData.topics.map((topic, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getSentimentIcon(topic.sentiment)}
                          <div>
                            <div className="font-medium text-gray-900">{topic.topic}</div>
                            <div className="text-sm text-gray-600">{topic.mentions} menções</div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${
                            topic.sentiment === "positive"
                              ? "border-emerald-300 text-emerald-700"
                              : topic.sentiment === "negative"
                                ? "border-red-300 text-red-700"
                                : "border-yellow-300 text-yellow-700"
                          }`}
                        >
                          {topic.sentiment === "positive"
                            ? "Positivo"
                            : topic.sentiment === "negative"
                              ? "Negativo"
                              : "Neutro"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-emerald-900 mb-2 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Estratégia de Conteúdo</span>
                  </h4>
                  <div className="space-y-2 text-sm text-emerald-800">
                    <p>
                      ✅ <strong>Explore mais:</strong> Qualidade do produto e atendimento (tópicos mais positivos)
                    </p>
                    <p>
                      ⚠️ <strong>Melhore:</strong> Processo de entrega (principal ponto negativo)
                    </p>
                    <p>
                      💡 <strong>Oportunidade:</strong> Preço tem sentimento neutro - pode ser trabalhado
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
