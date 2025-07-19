"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap } from "lucide-react"

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null

  const handleFreePlan = () => {
    alert("Crie uma conta gratuita para começar!")
    onClose()
  }

  const handlePremiumPlan = () => {
    // Integração com Mercado Pago (gratuito)
    alert(`🚀 Upgrade para Premium!

💳 Pagamento via:
• PIX (desconto de 10%)
• Cartão de crédito
• Boleto bancário

📧 Entre em contato:
contato@postanalysis.com.br

Ou WhatsApp: (11) 99999-9999`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-between items-center mb-4">
              <div></div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>
            <CardTitle className="text-2xl">Escolha seu plano</CardTitle>
            <CardDescription>Comece grátis, faça upgrade quando precisar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plano Gratuito */}
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Gratuito</CardTitle>
                    <Badge variant="outline">Atual</Badge>
                  </div>
                  <div className="text-3xl font-bold">R$ 0</div>
                  <CardDescription>Para começar e testar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">5 análises por mês</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Análise básica SEO/GEO</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Histórico de análises</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Suporte por email</span>
                    </li>
                  </ul>
                  <Button onClick={handleFreePlan} variant="outline" className="w-full bg-transparent">
                    Continuar Gratuito
                  </Button>
                </CardContent>
              </Card>

              {/* Plano Premium */}
              <Card className="border-2 border-slate-900 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-slate-900 text-white px-3 py-1">
                    <Crown className="w-3 h-3 mr-1" />
                    Mais Popular
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>Premium</span>
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </CardTitle>
                  <div className="text-3xl font-bold">
                    R$ 29,90
                    <span className="text-base font-normal text-gray-600">/mês</span>
                  </div>
                  <CardDescription>Para profissionais e agências</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Análises ilimitadas</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Análise de imagens</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Análise geográfica avançada</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Gerador de conteúdo IA</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Análise de sentimento</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Exportação PDF</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Suporte prioritário</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Novos recursos em primeira mão</span>
                    </li>
                  </ul>
                  <Button onClick={handlePremiumPlan} className="w-full bg-slate-900 hover:bg-slate-800">
                    Fazer Upgrade
                  </Button>
                  <p className="text-xs text-center text-gray-600">💳 PIX, cartão ou boleto • Cancele quando quiser</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">🎁 Oferta de Lançamento</h3>
                <p className="text-sm text-blue-800">
                  <strong>50% OFF</strong> nos primeiros 3 meses para os primeiros 100 usuários!
                  <br />
                  Use o código: <strong>LAUNCH50</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
