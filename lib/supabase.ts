"use client"

import { createClient } from "@supabase/supabase-js"

// ✅ Usando as variáveis corretas que você configurou
const supabaseUrl = process.env.SUPABASE_SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY_ANON_KEY || ""

console.log("🔍 Verificando configuração Supabase:")
console.log("URL:", supabaseUrl ? "✅ Configurada" : "❌ Faltando")
console.log("Key:", supabaseKey ? "✅ Configurada" : "❌ Faltando")

// Criar cliente Supabase
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null
export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey)

// Tipos para o banco
export interface Analysis {
  id: string
  user_id: string
  title: string
  content: string
  content_type: string
  analysis_result: any
  score: number
  created_at: string
}

export interface User {
  id: string
  email: string
  plan: "free" | "premium"
  analyses_count: number
  created_at: string
}

export class DatabaseService {
  static async saveAnalysis(analysis: Omit<Analysis, "id" | "created_at">) {
    if (!supabase) {
      throw new Error("Supabase não configurado")
    }

    const { data, error } = await supabase.from("analyses").insert([analysis]).select().single()

    if (error) throw error
    return data
  }

  static async getUserAnalyses(userId: string) {
    if (!supabase) {
      throw new Error("Supabase não configurado")
    }

    const { data, error } = await supabase
      .from("analyses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async deleteAnalysis(id: string, userId: string) {
    if (!supabase) {
      throw new Error("Supabase não configurado")
    }

    const { error } = await supabase.from("analyses").delete().eq("id", id).eq("user_id", userId)

    if (error) throw error
  }

  static async getUser(userId: string) {
    if (!supabase) {
      throw new Error("Supabase não configurado")
    }

    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

    if (error) throw error
    return data
  }
}
