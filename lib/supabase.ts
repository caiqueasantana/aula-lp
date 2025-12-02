import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("[v0] Inicializando Supabase com URL:", url)
    if (!url || !key) {
      console.error("[v0] Variáveis de ambiente do Supabase não configuradas")
      throw new Error("Variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórias")
    }

    supabaseClient = createBrowserClient(url, key)
  }
  return supabaseClient
}

export const supabase = getSupabaseClient()
