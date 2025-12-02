"use client"

import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Loader2 } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { produtosService } from "@/lib/produtos-service"

interface ProdutoTableProps {
  produtos: any[]
  onEdit: (produto: any) => void
  onRefresh: () => void
}

export function ProdutoTable({ produtos, onEdit, onRefresh }: ProdutoTableProps) {
  const [deleting, setDeleting] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [error, setError] = useState("")

  const handleDelete = async (id: number) => {
    try {
      setDeleting(id)
      setError("")
      console.log("[v0] Iniciando deleção de produto ID:", id)
      await produtosService.deletar(id)
      console.log("[v0] Produto deletado com sucesso")
      onRefresh()
    } catch (error: any) {
      console.error("[v0] Erro ao deletar:", error)
      setError(error.message || "Erro ao deletar produto")
    } finally {
      setDeleting(null)
      setDeleteId(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString))
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-900/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Nome</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Preço</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Descrição</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Criação</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {produtos.map((produto) => (
              <tr key={produto.id} className="hover:bg-slate-700/20 transition-colors border-slate-700/30">
                <td className="px-6 py-4 text-sm text-slate-300">#{produto.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-white">{produto.nomeProduto}</td>
                <td className="px-6 py-4 text-sm text-blue-400 font-semibold">{formatPrice(produto.preco)}</td>
                <td className="px-6 py-4 text-sm text-slate-400 max-w-xs truncate">{produto.descricao || "-"}</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {formatDate(produto.dataCriacao || produto.created_at)}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(produto)}
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    >
                      <Edit2 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(produto.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      disabled={deleting === produto.id}
                    >
                      {deleting === produto.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Deletar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
