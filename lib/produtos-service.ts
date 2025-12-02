import { getSupabaseClient } from "./supabase"

export interface Produto {
  id?: number
  nomeProduto: string
  preco: number
  descricao?: string
  created_at?: string
}

export const produtosService = {
  // READ - Buscar todos os produtos
  async obterTodos(): Promise<Produto[]> {
    try {
      console.log("[v0] Buscando todos os produtos...")
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from("produtos")
        .select("id, nome_produto, preco, descricao, created_at")
        .order("id", { ascending: false })

      if (error) {
        console.error("[v0] Erro ao buscar produtos:", error)
        throw new Error(error.message)
      }

      const produtosMapeados = (data || []).map((item: any) => ({
        id: item.id,
        nomeProduto: item.nome_produto,
        preco: item.preco,
        descricao: item.descricao,
        created_at: item.created_at,
      }))

      console.log("[v0] Produtos carregados:", produtosMapeados.length)
      return produtosMapeados
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
      const { data, error } = await supabase
        .from("produtos")
        .select("id, nome_produto, preco, descricao, created_at")
        .eq("id", id)
        .single()

      if (error) {
        console.error("[v0] Erro ao buscar produto:", error)
        throw new Error(error.message)
      }

      if (data) {
        return {
          id: data.id,
          nomeProduto: data.nome_produto,
          preco: data.preco,
          descricao: data.descricao,
          created_at: data.created_at,
        }
      }

      return null
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

      const dadosParaInserir = {
        nome_produto: produto.nomeProduto,
        preco: produto.preco,
        descricao: produto.descricao || null,
      }

      const { data, error } = await supabase
        .from("produtos")
        .insert([dadosParaInserir])
        .select("id, nome_produto, preco, descricao, created_at")
        .single()

      if (error) {
        console.error("[v0] Erro ao criar produto:", error)
        throw new Error(error.message)
      }

      const produtoMapeado = {
        id: data.id,
        nomeProduto: data.nome_produto,
        preco: data.preco,
        descricao: data.descricao,
        created_at: data.created_at,
      }

      console.log("[v0] Produto criado com sucesso:", produtoMapeado)
      return produtoMapeado
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

      const dadosParaAtualizar: any = {}
      if (produto.nomeProduto) {
        dadosParaAtualizar.nome_produto = produto.nomeProduto
      }
      if (produto.preco !== undefined) {
        dadosParaAtualizar.preco = produto.preco
      }
      if (produto.descricao !== undefined) {
        dadosParaAtualizar.descricao = produto.descricao || null
      }

      const { data, error } = await supabase
        .from("produtos")
        .update(dadosParaAtualizar)
        .eq("id", id)
        .select("id, nome_produto, preco, descricao, created_at")
        .single()

      if (error) {
        console.error("[v0] Erro ao atualizar produto:", error)
        throw new Error(error.message)
      }

      const produtoMapeado = {
        id: data.id,
        nomeProduto: data.nome_produto,
        preco: data.preco,
        descricao: data.descricao,
        created_at: data.created_at,
      }

      console.log("[v0] Produto atualizado com sucesso:", produtoMapeado)
      return produtoMapeado
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
