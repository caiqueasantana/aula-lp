"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProdutoForm } from "./produto-form"
import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"

interface ProdutoModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  produto?: any
}

export function ProdutoModal({ isOpen, onClose, onSuccess, produto }: ProdutoModalProps) {
  const [error, setError] = useState("")

  const handleSubmit = async (formData: any) => {
    try {
      setError("")
      const supabase = getSupabaseClient()

      const { data, error: supabaseError } = produto
        ? await supabase.from("produtos").update(formData).eq("id", produto.id).select()
        : await supabase.from("produtos").insert([formData]).select()

      if (supabaseError) {
        throw new Error(supabaseError.message || `Erro ao ${produto ? "atualizar" : "criar"} produto`)
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message || "Erro ao salvar produto")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {produto ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle className="text-red-400 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <ProdutoForm produto={produto} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
