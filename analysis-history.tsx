"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye } from "lucide-react"

interface HistoryItem {
  id: string
  title: string
  date: string
  score: number
  type: string
}

interface AnalysisHistoryProps {
  analyses: HistoryItem[]
  onDelete: (id: string) => void
  onView: (id: string) => void
}

export function AnalysisHistory({ analyses, onDelete, onView }: AnalysisHistoryProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "carousel":
        return "Carrossel"
      case "video":
        return "Vídeo"
      case "caption":
        return "Legenda"
      default:
        return "Desconhecido"
    }
  }

  if (analyses.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Nenhuma análise salva ainda.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Histórico de Análises</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyses.map((analysis) => (
          <Card key={analysis.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{analysis.title}</CardTitle>
                  <CardDescription>{analysis.date}</CardDescription>
                </div>
                <Badge className={getScoreColor(analysis.score)}>{analysis.score}/100</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant="outline">{getTypeLabel(analysis.type)}</Badge>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onView(analysis.id)} className="flex-1">
                  <Eye className="w-3 h-3 mr-1" />
                  Ver
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(analysis.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
