import { getSupabaseClient } from "./supabase"

export interface Produto {
  id?: number
  nomeProduto: string
  preco: number
  descricao?: string
  created_at?: string
  dataCriacao?: string
}

export const produtosService = {
  // READ - Buscar todos os produtos
  async obterTodos(): Promise<Produto[]> {
    try {
      console.log("[v0] Buscando todos os produtos...")
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.from("produtos").select("*").order("id", { ascending: false })

      if (error) {
        console.error("[v0] Erro ao buscar produtos:", error)
        throw new Error(error.message)
      }

      console.log("[v0] Produtos carregados:", data?.length || 0)
      return data || []
    } catch (error: any) {
      console.error("[v0] Erro em obterTodos:", error)
      throw error
    }
  },

  // READ - Buscar um produto por ID
  async obterPorId(id: number): Promise<Produto | null> {
    try {
      console.log("[v0] Buscando produto ID:", id)
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.from("produtos").select("*").eq("id", id).single()

      if (error) {
        console.error("[v0] Erro ao buscar produto:", error)
        throw new Error(error.message)
      }

      return data || null
    } catch (error: any) {
      console.error("[v0] Erro em obterPorId:", error)
      throw error
    }
  },

  // CREATE - Criar novo produto
  async criar(produto: Produto): Promise<Produto> {
    try {
      console.log("[v0] Criando novo produto:", produto)
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.from("produtos").insert([produto]).select().single()

      if (error) {
        console.error("[v0] Erro ao criar produto:", error)
        throw new Error(error.message)
      }

      console.log("[v0] Produto criado com sucesso:", data)
      return data
    } catch (error: any) {
      console.error("[v0] Erro em criar:", error)
      throw error
    }
  },

  // UPDATE - Atualizar produto
  async atualizar(id: number, produto: Partial<Produto>): Promise<Produto> {
    try {
      console.log("[v0] Atualizando produto ID:", id, "com dados:", produto)
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.from("produtos").update(produto).eq("id", id).select().single()

      if (error) {
        console.error("[v0] Erro ao atualizar produto:", error)
        throw new Error(error.message)
      }

      console.log("[v0] Produto atualizado com sucesso:", data)
      return data
    } catch (error: any) {
      console.error("[v0] Erro em atualizar:", error)
      throw error
    }
  },

  // DELETE - Deletar produto
  async deletar(id: number): Promise<void> {
    try {
      console.log("[v0] Deletando produto ID:", id)
      const supabase = getSupabaseClient()
      const { error } = await supabase.from("produtos").delete().eq("id", id)

      if (error) {
        console.error("[v0] Erro ao deletar produto:", error)
        throw new Error(error.message)
      }

      console.log("[v0] Produto deletado com sucesso")
    } catch (error: any) {
      console.error("[v0] Erro em deletar:", error)
      throw error
    }
  },
}
