"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Target, Globe } from "lucide-react"

interface GeoAnalysisProps {
  content: string
  contentType: string
}

interface GeoData {
  region: string
  engagement: number
  reach: number
  demographics: {
    ageGroup: string
    percentage: number
  }[]
  trending: string[]
  localHashtags: string[]
}

export function GeoAnalysis({ content, contentType }: GeoAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [geoData, setGeoData] = useState<GeoData[]>([])
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const analyzeGeoTrends = async () => {
    setIsAnalyzing(true)

    // Simular análise geográfica
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockGeoData: GeoData[] = [
      {
        region: "São Paulo, SP",
        engagement: 24.5,
        reach: 15420,
        demographics: [
          { ageGroup: "18-24", percentage: 35 },
          { ageGroup: "25-34", percentage: 42 },
          { ageGroup: "35-44", percentage: 23 },
        ],
        trending: ["empreendedorismo", "startups", "inovação"],
        localHashtags: ["#saopaulo", "#sp", "#empreendedorismobr", "#startupbrasil"],
      },
      {
        region: "Rio de Janeiro, RJ",
        engagement: 18.3,
        reach: 12100,
        demographics: [
          { ageGroup: "18-24", percentage: 40 },
          { ageGroup: "25-34", percentage: 38 },
          { ageGroup: "35-44", percentage: 22 },
        ],
        trending: ["lifestyle", "praia", "cultura"],
        localHashtags: ["#riodejaneiro", "#rj", "#carioca", "#zonasul"],
      },
      {
        region: "Belo Horizonte, MG",
        engagement: 16.7,
        reach: 8900,
        demographics: [
          { ageGroup: "18-24", percentage: 32 },
          { ageGroup: "25-34", percentage: 45 },
          { ageGroup: "35-44", percentage: 23 },
        ],
        trending: ["tecnologia", "mineiridade", "gastronomia"],
        localHashtags: ["#belohorizonte", "#mg", "#minasgerais", "#bh"],
      },
    ]

    setGeoData(mockGeoData)
    setIsAnalyzing(false)
  }

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 20) return "bg-emerald-500"
    if (engagement >= 15) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span>Análise Geográfica (GEO)</span>
        </CardTitle>
        <CardDescription>Análise de tendências e engajamento por região geográfica</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!geoData.length ? (
          <div className="text-center py-8">
            <Button onClick={analyzeGeoTrends} disabled={isAnalyzing} className="bg-blue-600 hover:bg-blue-700">
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analisando Tendências Geográficas...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  Analisar Tendências Geográficas
                </>
              )}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="demographics">Demografia</TabsTrigger>
              <TabsTrigger value="optimization">Otimização</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {geoData.map((region, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedRegion === region.region ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedRegion(region.region)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center justify-between">
                        <span>{region.region}</span>
                        <div className={`w-3 h-3 rounded-full ${getEngagementColor(region.engagement)}`} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Engajamento</span>
                        <span className="font-semibold text-emerald-600">{region.engagement}%</span>
                      </div>
                      <Progress value={region.engagement} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Alcance</span>
                        <span className="font-semibold">{region.reach.toLocaleString()}</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-700">Trending:</span>
                        <div className="flex flex-wrap gap-1">
                          {region.trending.slice(0, 2).map((trend, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {trend}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedRegion && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-base text-blue-900">Detalhes: {selectedRegion}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const region = geoData.find((r) => r.region === selectedRegion)
                      if (!region) return null

                      return (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-blue-900 mb-2">Hashtags Locais Recomendadas:</h4>
                            <div className="flex flex-wrap gap-2">
                              {region.localHashtags.map((tag, i) => (
                                <Badge key={i} className="bg-blue-100 text-blue-800">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-blue-900 mb-2">Tópicos em Alta:</h4>
                            <div className="flex flex-wrap gap-2">
                              {region.trending.map((trend, i) => (
                                <Badge key={i} variant="outline" className="border-blue-300">
                                  {trend}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="demographics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {geoData.map((region, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">{region.region}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {region.demographics.map((demo, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{demo.ageGroup} anos</span>
                              <span className="font-medium">{demo.percentage}%</span>
                            </div>
                            <Progress value={demo.percentage} className="h-1" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="optimization" className="space-y-4">
              <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-base text-emerald-900 flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>Recomendações de Otimização GEO</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-emerald-900 mb-2">🎯 Foco Regional</h4>
                      <p className="text-sm text-gray-700">
                        Concentre seus esforços em São Paulo (24.5% engajamento) e adapte o conteúdo para o público de
                        25-34 anos que representa 42% da audiência.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-emerald-900 mb-2">📍 Localização de Conteúdo</h4>
                      <p className="text-sm text-gray-700">
                        Inclua referências locais como "startups paulistas", "empreendedorismo no Brasil" para aumentar
                        a relevância regional.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-emerald-900 mb-2">⏰ Timing Otimizado</h4>
                      <p className="text-sm text-gray-700">
                        Publique entre 18h-20h para São Paulo e 19h-21h para Rio de Janeiro, quando o engajamento é 35%
                        maior.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-emerald-900 mb-2">🏷️ Hashtags Estratégicas</h4>
                      <p className="text-sm text-gray-700">
                        Combine hashtags nacionais (#empreendedorismobr) com locais (#saopaulo) para maximizar alcance e
                        relevância.
                      </p>
                    </div>
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
