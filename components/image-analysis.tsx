"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Palette, Type, Layout } from "lucide-react"

interface ImageAnalysisProps {
  imageUrl: string
}

interface ImageAnalysisResult {
  composition: {
    score: number
    feedback: string
  }
  colors: {
    dominant: string[]
    harmony: number
    accessibility: number
  }
  text: {
    readability: number
    hierarchy: number
    contrast: number
  }
  engagement: {
    visualAppeal: number
    brandConsistency: number
  }
}

export function ImageAnalysis({ imageUrl }: ImageAnalysisProps) {
  const [analysis, setAnalysis] = useState<ImageAnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeImage = async () => {
    setIsAnalyzing(true)

    // Simular análise de imagem
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockAnalysis: ImageAnalysisResult = {
      composition: {
        score: 85,
        feedback: "Boa composição com regra dos terços aplicada",
      },
      colors: {
        dominant: ["#3B82F6", "#EF4444", "#10B981"],
        harmony: 78,
        accessibility: 92,
      },
      text: {
        readability: 88,
        hierarchy: 82,
        contrast: 95,
      },
      engagement: {
        visualAppeal: 79,
        brandConsistency: 86,
      },
    }

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Análise Visual
        </CardTitle>
        <CardDescription>Análise da imagem anexada ao conteúdo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Imagem para análise"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {!analysis ? (
          <Button onClick={analyzeImage} disabled={isAnalyzing} className="w-full">
            {isAnalyzing ? "Analisando Imagem..." : "Analisar Imagem"}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layout className="w-4 h-4" />
                    <span className="font-medium">Composição</span>
                  </div>
                  <Badge variant="secondary">{analysis.composition.score}/100</Badge>
                  <p className="text-sm text-gray-600 mt-1">{analysis.composition.feedback}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4" />
                    <span className="font-medium">Cores</span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {analysis.colors.dominant.map((color, index) => (
                      <div key={index} className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <div className="text-xs space-y-1">
                    <div>Harmonia: {analysis.colors.harmony}/100</div>
                    <div>Acessibilidade: {analysis.colors.accessibility}/100</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="w-4 h-4" />
                    <span className="font-medium">Texto</span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div>Legibilidade: {analysis.text.readability}/100</div>
                    <div>Hierarquia: {analysis.text.hierarchy}/100</div>
                    <div>Contraste: {analysis.text.contrast}/100</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Engajamento</span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div>Apelo Visual: {analysis.engagement.visualAppeal}/100</div>
                    <div>Consistência: {analysis.engagement.brandConsistency}/100</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
