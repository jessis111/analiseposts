"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Copy, Target, Hash, FileText, Lightbulb } from "lucide-react"

interface ContentSuggestion {
  title: string
  content: string
  hashtags: string[]
  keywords: string[]
  structure: string[]
  seoScore: number
  geoElements: string[]
}

export function ContentGenerator() {
  const [topic, setTopic] = useState("")
  const [contentType, setContentType] = useState("")
  const [location, setLocation] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([])

  const generateContent = async () => {
    if (!topic.trim() || !contentType) return

    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockSuggestions: ContentSuggestion[] = [
      {
        title: "5 Estratégias de Marketing Digital que Funcionam em 2024",
        content: `Slide 1: Introdução
"O marketing digital mudou drasticamente em 2024. Aqui estão as 5 estratégias que realmente funcionam:"

Slide 2: Estratégia 1 - Conteúdo Hiperlocal
"Crie conteúdo específico para sua região. Em São Paulo, fale sobre o ecossistema de startups da Faria Lima."

Slide 3: Estratégia 2 - IA Generativa
"Use ferramentas de IA para personalizar mensagens. 73% dos consumidores preferem conteúdo personalizado."

Slide 4: Estratégia 3 - Vídeos Curtos
"TikTok e Reels dominam. Crie vídeos de 15-30 segundos com valor imediato."

Slide 5: CTA Final
"Qual estratégia você vai testar primeiro? Comenta aí! 👇"`,
        hashtags: ["#marketingdigital", "#saopaulo", "#estrategias2024", "#empreendedorismo", "#startups"],
        keywords: ["marketing digital", "estratégias", "2024", "São Paulo", "startups"],
        structure: [
          "Hook forte no primeiro slide",
          "Numeração clara (5 estratégias)",
          "Dados estatísticos para credibilidade",
          "Referência local (Faria Lima)",
          "CTA engajador no final",
        ],
        seoScore: 87,
        geoElements: ["São Paulo", "Faria Lima", "ecossistema de startups paulista"],
      },
      {
        title: "Como Aumentar Vendas Online: Guia Prático para Empreendedores",
        content: `Slide 1: "Vendas Online em Alta"
"E-commerce brasileiro cresceu 47% em 2024. Veja como aproveitar essa onda:"

Slide 2: "Otimize seu Funil"
"Mapeie cada etapa: visitante → lead → cliente. Use ferramentas como RD Station."

Slide 3: "Prova Social Funciona"
"Depoimentos de clientes de São Paulo aumentaram conversões em 34%."

Slide 4: "Checkout Simplificado"
"Reduza etapas do checkout. PIX aumentou conversões em 28%."

Slide 5: "Acompanhe Métricas"
"CAC, LTV, taxa de conversão. Meça tudo!"`,
        hashtags: ["#vendasonline", "#ecommerce", "#empreendedorismo", "#brasil", "#conversao"],
        keywords: ["vendas online", "e-commerce", "conversão", "empreendedores", "Brasil"],
        structure: [
          "Estatística impactante na abertura",
          "Dicas práticas e acionáveis",
          "Ferramentas específicas mencionadas",
          "Dados locais (Brasil/São Paulo)",
          "Métricas importantes destacadas",
        ],
        seoScore: 82,
        geoElements: ["Brasil", "São Paulo", "PIX", "RD Station"],
      },
    ]

    setSuggestions(mockSuggestions)
    setIsGenerating(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Conteúdo copiado para a área de transferência!")
  }

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>Gerador de Conteúdo Otimizado</span>
        </CardTitle>
        <CardDescription>Crie conteúdo otimizado para SEO e GEO com base em temas e palavras-chave</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tema/Palavra-chave</label>
            <Input
              placeholder="Ex: marketing digital, vendas online..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border-gray-300 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Conteúdo</label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="border-gray-300 focus:border-purple-500">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carousel">Carrossel</SelectItem>
                <SelectItem value="video">Roteiro de Vídeo</SelectItem>
                <SelectItem value="caption">Legenda</SelectItem>
                <SelectItem value="blog">Post de Blog</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Localização (Opcional)</label>
            <Input
              placeholder="Ex: São Paulo, Brasil..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-gray-300 focus:border-purple-500"
            />
          </div>
        </div>

        <Button
          onClick={generateContent}
          disabled={!topic.trim() || !contentType || isGenerating}
          className="w-full bg-purple-600 hover:bg-purple-700 h-12"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Gerando Conteúdo Otimizado...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Conteúdo
            </>
          )}
        </Button>

        {suggestions.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Sugestões Geradas</h3>

            {suggestions.map((suggestion, index) => (
              <Card key={index} className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base text-purple-900">{suggestion.title}</CardTitle>
                    <Badge className="bg-purple-100 text-purple-800">SEO: {suggestion.seoScore}/100</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-purple-100">
                      <TabsTrigger value="content">Conteúdo</TabsTrigger>
                      <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
                      <TabsTrigger value="structure">Estrutura</TabsTrigger>
                      <TabsTrigger value="geo">GEO</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="mt-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-900">Conteúdo Completo</h4>
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(suggestion.content)}>
                            <Copy className="w-3 h-3 mr-1" />
                            Copiar
                          </Button>
                        </div>
                        <Textarea
                          value={suggestion.content}
                          readOnly
                          className="min-h-[200px] bg-white border-purple-200"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="hashtags" className="mt-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                          <Hash className="w-4 h-4" />
                          <span>Hashtags Recomendadas</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.hashtags.map((tag, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="cursor-pointer hover:bg-purple-100"
                              onClick={() => copyToClipboard(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <h4 className="font-medium text-gray-900 mt-4">Palavras-chave SEO</h4>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.keywords.map((keyword, i) => (
                            <Badge key={i} className="bg-emerald-100 text-emerald-800">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="structure" className="mt-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Estrutura Otimizada</span>
                        </h4>
                        <ul className="space-y-2">
                          {suggestion.structure.map((item, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="geo" className="mt-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                          <Target className="w-4 h-4" />
                          <span>Elementos GEO Incluídos</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.geoElements.map((element, i) => (
                            <Badge key={i} className="bg-blue-100 text-blue-800">
                              {element}
                            </Badge>
                          ))}
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
                          <h5 className="font-medium text-blue-900 mb-2 flex items-center space-x-1">
                            <Lightbulb className="w-4 h-4" />
                            <span>Dica GEO</span>
                          </h5>
                          <p className="text-sm text-blue-800">
                            Este conteúdo inclui referências locais específicas que aumentam a relevância para motores
                            de busca generativos e melhoram o engajamento regional.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
