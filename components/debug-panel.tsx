"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { AlertCircle, CheckCircle, Settings, Database } from "lucide-react"

export function DebugPanel() {
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "checking" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [needsTables, setNeedsTables] = useState(false)

  // Verificar variáveis de ambiente
  const envVars = {
    supabaseUrl: process.env.SUPABASE_SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY_ANON_KEY,
    groqKey: process.env.GROQ_API_KEY,
  }

  const checkConnection = async () => {
    setConnectionStatus("checking")
    setErrorMessage("")
    setNeedsTables(false)

    try {
      if (!supabase) {
        throw new Error("Supabase não configurado - verifique as variáveis de ambiente")
      }

      console.log("🔍 Testando conexão com Supabase...")

      // Primeiro, testar conexão básica
      const { data: authData, error: authError } = await supabase.auth.getSession()
      console.log("✅ Conexão básica funcionando")

      // Tentar acessar tabela users
      const { data, error } = await supabase.from("users").select("count").limit(1)

      if (error) {
        console.log("⚠️ Erro ao acessar tabelas:", error.message)
        if (error.code === "42P01") {
          // Tabela não existe
          setNeedsTables(true)
          throw new Error("Tabelas não criadas ainda - execute o script SQL")
        }
        throw error
      }

      console.log("✅ Tabelas acessíveis")
      setConnectionStatus("success")
      setErrorMessage("")
    } catch (error: any) {
      console.error("❌ Erro na conexão:", error)
      setConnectionStatus("error")
      setErrorMessage(error.message || "Erro desconhecido")
    }
  }

  const openSupabaseSQL = () => {
    const projectId = envVars.supabaseUrl?.split("//")[1]?.split(".")[0]
    if (projectId) {
      window.open(`https://supabase.com/dashboard/project/${projectId}/sql`, "_blank")
    }
  }

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-blue-900">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Status da Configuração</span>
          </div>
          {envVars.supabaseUrl && (
            <Button size="sm" variant="outline" onClick={openSupabaseSQL}>
              <Database className="w-4 h-4 mr-1" />
              Abrir SQL Editor
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-900 mb-3">📋 Variáveis de Ambiente:</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <div>
                  <div className="font-medium">SUPABASE_URL</div>
                  <div className="text-xs text-gray-600">
                    {envVars.supabaseUrl ? `${envVars.supabaseUrl.substring(0, 30)}...` : "Não configurada"}
                  </div>
                </div>
                <Badge variant={envVars.supabaseUrl ? "default" : "destructive"}>
                  {envVars.supabaseUrl ? "✅ OK" : "❌ Missing"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <div>
                  <div className="font-medium">SUPABASE_ANON_KEY</div>
                  <div className="text-xs text-gray-600">
                    {envVars.supabaseKey ? `${envVars.supabaseKey.substring(0, 20)}...` : "Não configurada"}
                  </div>
                </div>
                <Badge variant={envVars.supabaseKey ? "default" : "destructive"}>
                  {envVars.supabaseKey ? "✅ OK" : "❌ Missing"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <div>
                  <div className="font-medium">GROQ_API_KEY</div>
                  <div className="text-xs text-gray-600">Para análise com IA</div>
                </div>
                <Badge variant={envVars.groqKey ? "default" : "secondary"}>
                  {envVars.groqKey ? "✅ OK" : "⚠️ Optional"}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-blue-900 mb-3">🔌 Status da Conexão:</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {connectionStatus === "idle" && (
                  <>
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Clique para testar</span>
                  </>
                )}
                {connectionStatus === "checking" && (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Verificando conexão...</span>
                  </>
                )}
                {connectionStatus === "success" && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Conectado e funcionando!</span>
                  </>
                )}
                {connectionStatus === "error" && (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600">Erro de conexão</span>
                  </>
                )}
              </div>

              <Button
                onClick={checkConnection}
                disabled={connectionStatus === "checking" || !isSupabaseConfigured}
                variant="outline"
                className="w-full bg-transparent"
              >
                {connectionStatus === "checking"
                  ? "Testando..."
                  : !isSupabaseConfigured
                    ? "Configure as Variáveis Primeiro"
                    : "Testar Conexão"}
              </Button>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded p-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-red-900">Erro:</div>
                      <div className="text-red-800">{errorMessage}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instruções para criar tabelas */}
        {needsTables && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-3 flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>🔧 Próximo Passo: Criar Tabelas</span>
            </h4>
            <div className="space-y-3 text-sm text-yellow-800">
              <p>A conexão com o Supabase está funcionando, mas as tabelas ainda não foram criadas.</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Clique em "Abrir SQL Editor" acima</li>
                <li>Execute o script SQL que está no arquivo "scripts/create-tables.sql"</li>
                <li>Volte aqui e teste a conexão novamente</li>
              </ol>
              <div className="bg-yellow-100 p-3 rounded border">
                <div className="font-medium mb-1">Script SQL necessário:</div>
                <div className="text-xs font-mono">scripts/create-tables.sql</div>
              </div>
            </div>
          </div>
        )}

        {/* Status de sucesso */}
        {connectionStatus === "success" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>🎉 Tudo Configurado!</span>
            </h4>
            <div className="text-sm text-green-800 space-y-1">
              <p>✅ Supabase conectado com sucesso</p>
              <p>✅ Tabelas criadas e acessíveis</p>
              <p>✅ Autenticação funcionando</p>
              <p className="font-medium mt-2">Agora você pode usar todas as funcionalidades!</p>
            </div>
          </div>
        )}

        {/* Informações da configuração atual */}
        {isSupabaseConfigured && (
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">📊 Configuração Atual:</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <div>
                <strong>Projeto:</strong> {envVars.supabaseUrl?.split("//")[1]?.split(".")[0]}
              </div>
              <div>
                <strong>URL:</strong> {envVars.supabaseUrl}
              </div>
              <div>
                <strong>Status:</strong> {connectionStatus === "success" ? "✅ Funcionando" : "⚠️ Verificar conexão"}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
