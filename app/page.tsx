"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle,
  Lightbulb,
  TrendingUp,
  Eye,
  MessageCircle,
  Search,
  Crown,
  Star,
  Users,
  ArrowRight,
  Play,
  FileText,
  Settings,
  Download,
} from "lucide-react"
import { AuthProvider, useAuth } from "@/components/auth-provider"
import { AuthModal } from "@/components/auth-modal"
import { PricingModal } from "@/components/pricing-modal"
import { DebugPanel } from "@/components/debug-panel"
import { isSupabaseConfigured } from "@/lib/supabase"

interface AnalysisResult {
  overallScore: number
  categories: {
    clarity: { score: number; feedback: string; suggestions: string[] }
    engagement: { score: number; feedback: string; suggestions: string[] }
    originality: { score: number; feedback: string; suggestions: string[] }
    format: { score: number; feedback: string; suggestions: string[] }
    tone: { score: number; feedback: string; suggestions: string[] }
    grammar: { score: number; feedback: string; suggestions: string[] }
    seo: { score: number; feedback: string; suggestions: string[] }
    geo: { score: number; feedback: string; suggestions: string[] }
  }
  examples: Array<{
    title: string
    description: string
    engagement: string
    platform: string
  }>
}

function PostAnalysisContent() {
  const { user, loading, signOut } = useAuth()
  const [text, setText] = useState("")
  const [contentType, setContentType] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [analysisCount, setAnalysisCount] = useState(user ? 5 : 2)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [showDebug, setShowDebug] = useState(true)

  const analyzeContent = async () => {
    if (!text.trim() || !contentType) return

    // Verificar se usuário está logado (apenas se Supabase estiver configurado)
    if (isSupabaseConfigured && !user) {
      setShowAuthModal(true)
      return
    }

    if (!isPremium && analysisCount <= 0) {
      setShowPricingModal(true)
      return
    }

    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (!isPremium && user) {
      setAnalysisCount((prev) => prev - 1)
    }

    const generateContextualExamples = (contentType: string, text: string) => {
      const textLower = text.toLowerCase()

      const themes = {
        business:
          textLower.includes("negócio") ||
          textLower.includes("empresa") ||
          textLower.includes("vendas") ||
          textLower.includes("marketing"),
        tech:
          textLower.includes("tecnologia") ||
          textLower.includes("digital") ||
          textLower.includes("app") ||
          textLower.includes("software"),
        lifestyle:
          textLower.includes("vida") ||
          textLower.includes("saúde") ||
          textLower.includes("bem-estar") ||
          textLower.includes("rotina"),
      }

      const getTheme = () => {
        if (themes.business) return "business"
        if (themes.tech) return "tech"
        if (themes.lifestyle) return "lifestyle"
        return "general"
      }

      const theme = getTheme()

      const examplesByTypeAndTheme = {
        carousel: {
          business: [
            {
              title: "5 Estratégias de Vendas que Funcionam",
              description: "Carrossel com técnicas práticas que aumentaram vendas em 40%",
              engagement: "18.5% taxa de engajamento",
              platform: "LinkedIn",
            },
            {
              title: "Como Escalar seu Negócio Digital",
              description: "Post educativo sobre crescimento empresarial",
              engagement: "14.2% taxa de engajamento",
              platform: "Instagram",
            },
          ],
          general: [
            {
              title: "Dicas de Produtividade Pessoal",
              description: "Carrossel com métodos comprovados de organização",
              engagement: "15.2% taxa de engajamento",
              platform: "Instagram",
            },
            {
              title: "Hábitos que Mudam Vidas",
              description: "Post inspiracional sobre transformação pessoal",
              engagement: "17.4% taxa de engajamento",
              platform: "LinkedIn",
            },
          ],
        },
        video: {
          business: [
            {
              title: "Pitch Perfeito em 60 Segundos",
              description: "Roteiro para apresentar sua ideia de forma impactante",
              engagement: "12.4% taxa de engajamento",
              platform: "TikTok",
            },
          ],
          general: [
            {
              title: "Rotina Matinal de Sucesso",
              description: "Vídeo motivacional sobre hábitos matinais",
              engagement: "8.7% taxa de engajamento",
              platform: "TikTok",
            },
          ],
        },
        caption: {
          business: [
            {
              title: "Reflexão sobre Empreendedorismo",
              description: "Legenda inspiracional que gerou debate sobre negócios",
              engagement: "16.7% taxa de engajamento",
              platform: "LinkedIn",
            },
          ],
          general: [
            {
              title: "Sobre Aceitar Mudanças",
              description: "Legenda reflexiva que tocou milhares de pessoas",
              engagement: "12.3% taxa de engajamento",
              platform: "LinkedIn",
            },
          ],
        },
      }

      return (
        examplesByTypeAndTheme[contentType as keyof typeof examplesByTypeAndTheme]?.[theme] ||
        examplesByTypeAndTheme[contentType as keyof typeof examplesByTypeAndTheme]?.general ||
        []
      )
    }

    const mockAnalysis: AnalysisResult = {
      overallScore: Math.floor(Math.random() * 30) + 70,
      categories: {
        seo: {
          score: Math.floor(Math.random() * 40) + 60,
          feedback: "Otimização para mecanismos de busca pode ser melhorada.",
          suggestions: [
            "Adicione palavras-chave relevantes ao seu nicho",
            "Use hashtags mais estratégicas e específicas",
            "Inclua termos de busca populares do seu setor",
          ],
        },
        geo: {
          score: Math.floor(Math.random() * 35) + 45,
          feedback: "Conteúdo precisa ser otimizado para motores de busca generativos (IA).",
          suggestions: [
            "Adicione citações de fontes confiáveis e autoritativas",
            "Inclua dados estatísticos e evidências quantitativas",
            "Use linguagem mais autoritativa e persuasiva",
            "Simplifique a linguagem para melhor compreensão da IA",
          ],
        },
        clarity: {
          score: Math.floor(Math.random() * 25) + 75,
          feedback: "Linguagem clara e objetiva, estrutura bem organizada.",
          suggestions: ["Considere dividir frases muito longas", "Use mais conectivos para melhor fluidez"],
        },
        engagement: {
          score: Math.floor(Math.random() * 30) + 65,
          feedback: "Bom potencial de engajamento, mas pode ser mais impactante.",
          suggestions: [
            "Adicione uma pergunta no início para gerar curiosidade",
            "Inclua uma CTA mais persuasiva e específica",
            "Use mais elementos emocionais e storytelling",
          ],
        },
        originality: {
          score: Math.floor(Math.random() * 35) + 60,
          feedback: "Abordagem interessante, mas pode ser mais única.",
          suggestions: ["Explore ângulos menos óbvios", "Adicione sua perspectiva pessoal", "Use analogias criativas"],
        },
        format: {
          score: Math.floor(Math.random() * 25) + 75,
          feedback: "Bem adequado ao formato escolhido.",
          suggestions: ["Otimize a divisão entre slides", "Considere elementos visuais complementares"],
        },
        tone: {
          score: Math.floor(Math.random() * 20) + 80,
          feedback: "Tom consistente e apropriado para o público.",
          suggestions: ["Mantenha a consistência em todo o conteúdo"],
        },
        grammar: {
          score: Math.floor(Math.random() * 15) + 85,
          feedback: "Excelente qualidade gramatical e ortográfica.",
          suggestions: ["Revisar pontuação em algumas frases"],
        },
      },
      examples: generateContextualExamples(contentType, text),
    }

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600"
    if (score >= 60) return "text-amber-600"
    return "text-red-500"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-emerald-600" />
    if (score >= 60) return <AlertCircle className="w-4 h-4 text-amber-600" />
    return <XCircle className="w-4 h-4 text-red-500" />
  }

  const saveAnalysis = () => {
    if (!analysis) return

    if (!isSupabaseConfigured) {
      alert("Configure o Supabase para salvar análises!")
      return
    }

    if (!user) {
      setShowAuthModal(true)
      return
    }

    const title = prompt("Digite um título para esta análise:")
    if (title) {
      // Simular salvamento
      alert(`✅ Análise "${title}" salva com sucesso!`)
    }
  }

  const exportAnalysis = () => {
    if (!isPremium) {
      alert("Exportação de relatórios disponível apenas no plano Premium!")
      return
    }
    alert("Exportando relatório em PDF...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">PostAnalysis Pro</h1>
              {isSupabaseConfigured && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  ✅ Conectado
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {user && !isPremium && <div className="text-sm text-gray-600">{analysisCount} análises restantes</div>}

              <Badge variant={isPremium ? "default" : "secondary"} className="px-3 py-1">
                {isPremium ? (
                  <>
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </>
                ) : user ? (
                  "Gratuito"
                ) : (
                  "Visitante"
                )}
              </Badge>

              {isSupabaseConfigured ? (
                user ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{user.email}</span>
                    <Button onClick={signOut} size="sm" variant="outline">
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setShowAuthModal(true)} size="sm" className="bg-slate-900 hover:bg-slate-800">
                    Entrar
                  </Button>
                )
              ) : (
                <Badge variant="outline" className="text-orange-600">
                  Configure Supabase
                </Badge>
              )}

              <Button onClick={() => setShowDebug(!showDebug)} size="sm" variant="outline" className="text-blue-600">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Debug Panel */}
        {showDebug && <DebugPanel />}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Suite Completa de Análise de Conteúdo</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ferramenta avançada com IA para análise, geração e otimização de conteúdo para redes sociais
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Análises</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Melhoria</p>
                <p className="text-2xl font-bold text-emerald-600">+34%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuários</p>
                <p className="text-2xl font-bold text-gray-900">8,932</p>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfação</p>
                <p className="text-2xl font-bold text-amber-600">4.9/5</p>
              </div>
              <Star className="w-8 h-8 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Análise de Conteúdo</CardTitle>
                <CardDescription className="text-gray-600">
                  Cole seu texto e selecione o tipo de conteúdo para análise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Textarea
                    placeholder="Cole aqui o texto do seu post, carrossel, roteiro de vídeo ou legenda..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[200px] resize-none border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de conteúdo</label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger className="border-gray-300 focus:border-slate-500 focus:ring-slate-500">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carousel">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Carrossel</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="video">
                          <div className="flex items-center space-x-2">
                            <Play className="w-4 h-4" />
                            <span>Roteiro de Vídeo</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="caption">
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>Legenda</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={analyzeContent}
                  disabled={!text.trim() || !contentType || isAnalyzing}
                  className="w-full bg-slate-900 hover:bg-slate-800 h-12"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analisando...
                    </>
                  ) : (
                    <>
                      Analisar Conteúdo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Recursos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Engajamento</p>
                    <p className="text-sm text-gray-600">Análise de potencial</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Search className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-gray-900">SEO</p>
                    <p className="text-sm text-gray-600">Otimização para buscas</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">GEO</p>
                    <p className="text-sm text-gray-600">Motores Generativos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {analysis && (
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={saveAnalysis} variant="outline" className="w-full bg-transparent">
                    Salvar Análise
                  </Button>

                  <Button onClick={exportAnalysis} variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar PDF {!isPremium && "🔒"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="mt-8 space-y-8">
            {/* Overall Score */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Pontuação Geral</CardTitle>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{analysis.overallScore}</div>
                    <div className="text-sm text-gray-600">de 100</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={analysis.overallScore} className="h-2 mb-4" />
                <p className="text-gray-600">
                  {analysis.overallScore >= 80
                    ? "Excelente qualidade! Seu conteúdo está otimizado."
                    : analysis.overallScore >= 60
                      ? "Boa qualidade, com espaço para melhorias estratégicas."
                      : "Necessita de melhorias significativas para maximizar o engajamento."}
                </p>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="analysis" className="data-[state=active]:bg-white">
                  Análise Detalhada
                </TabsTrigger>
                <TabsTrigger value="suggestions" className="data-[state=active]:bg-white">
                  Sugestões
                </TabsTrigger>
                <TabsTrigger value="examples" className="data-[state=active]:bg-white">
                  Exemplos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(analysis.categories).map(([key, category]) => (
                    <Card key={key} className="bg-white border-gray-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-medium text-gray-900">
                            {key === "clarity"
                              ? "Clareza"
                              : key === "engagement"
                                ? "Engajamento"
                                : key === "originality"
                                  ? "Originalidade"
                                  : key === "format"
                                    ? "Formato"
                                    : key === "tone"
                                      ? "Tom de Voz"
                                      : key === "grammar"
                                        ? "Gramática"
                                        : key === "seo"
                                          ? "SEO"
                                          : "GEO"}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            {getScoreIcon(category.score)}
                            <span className={`font-semibold ${getScoreColor(category.score)}`}>{category.score}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Progress value={category.score} className="h-1 mb-3" />
                        <p className="text-sm text-gray-600">{category.feedback}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="suggestions" className="mt-6">
                <div className="space-y-6">
                  {Object.entries(analysis.categories).map(
                    ([key, category]) =>
                      category.suggestions.length > 0 && (
                        <Card key={key} className="bg-white border-gray-200">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-base font-medium text-gray-900">
                              <Lightbulb className="w-4 h-4 text-amber-500" />
                              <span>
                                {key === "clarity"
                                  ? "Clareza"
                                  : key === "engagement"
                                    ? "Engajamento"
                                    : key === "originality"
                                      ? "Originalidade"
                                      : key === "format"
                                        ? "Formato"
                                        : key === "tone"
                                          ? "Tom de Voz"
                                          : key === "grammar"
                                            ? "Gramática"
                                            : key === "seo"
                                              ? "SEO"
                                              : "GEO"}
                              </span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {category.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ),
                  )}
                </div>
              </TabsContent>

              <TabsContent value="examples" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analysis.examples.map((example, index) => (
                    <Card key={index} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-base font-medium text-gray-900">{example.title}</CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {example.platform}
                        </Badge>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">{example.description}</p>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium text-emerald-600">{example.engagement}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="w-3 h-3 mr-1" />
                            Ver
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Search className="w-3 h-3 mr-1" />
                            Analisar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Modals */}
        {isSupabaseConfigured && (
          <>
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            <PricingModal isOpen={showPricingModal} onClose={() => setShowPricingModal(false)} />
          </>
        )}
      </div>
    </div>
  )
}

export default function PostAnalysisTool() {
  return (
    <AuthProvider>
      <PostAnalysisContent />
    </AuthProvider>
  )
}
