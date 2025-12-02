/**
 * Tipos gerados do Supabase PostgreSQL
 * Tabela: public.produtos
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { readonly [key: string]: Json | undefined }
  | readonly Json[]

export interface Produto {
  id: number
  nome_produto: string
  preco: number
  descricao: string | null
  created_at: string
  updated_at: string
}

export type ProdutoInsert = Omit<Produto, "id" | "created_at" | "updated_at">
export type ProdutoUpdate = Partial<ProdutoInsert>

export type Database = {
  public: {
    Tables: {
      produtos: {
        Row: Produto
        Insert: ProdutoInsert
        Update: ProdutoUpdate
        Relationships: []
      }
    }
  }
}
