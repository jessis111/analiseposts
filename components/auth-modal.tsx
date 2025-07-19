"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "./auth-provider"
import { Mail, Lock } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn, signUp } = useAuth()

  if (!isOpen) return null

  const handleSignIn = async () => {
    setLoading(true)
    setError("")
    try {
      await signIn(email, password)
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    setError("")
    try {
      await signUp(email, password)
      alert("Verifique seu email para confirmar a conta!")
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Acesse sua conta</CardTitle>
              <CardDescription>Entre ou crie uma conta gratuita</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar Conta</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}

              <Button
                onClick={handleSignIn}
                disabled={loading || !email || !password}
                className="w-full bg-slate-900 hover:bg-slate-800"
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                <p>Plano gratuito: 5 análises por mês</p>
                <p>Sem cartão de crédito necessário</p>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Crie uma senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}

              <Button
                onClick={handleSignUp}
                disabled={loading || !email || !password}
                className="w-full bg-slate-900 hover:bg-slate-800"
              >
                {loading ? "Criando conta..." : "Criar Conta Gratuita"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                <p>✅ 5 análises gratuitas por mês</p>
                <p>✅ Histórico de análises</p>
                <p>✅ Suporte por email</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
