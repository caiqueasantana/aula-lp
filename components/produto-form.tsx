"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Loader2 } from "lucide-react"
import { produtosService } from "@/lib/produtos-service"

interface ProdutoFormProps {
  produto?: any
  onSubmit: (data: any) => Promise<void>
}

export function ProdutoForm({ produto, onSubmit }: ProdutoFormProps) {
  const [formData, setFormData] = useState({
    nomeProduto: "",
    preco: "",
    descricao: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (produto) {
      setFormData({
        nomeProduto: produto.nomeProduto || "",
        preco: produto.preco?.toString() || "",
        descricao: produto.descricao || "",
      })
    }
  }, [produto])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nomeProduto.trim()) {
      newErrors.nomeProduto = "Nome é obrigatório"
    } else if (formData.nomeProduto.length < 3 || formData.nomeProduto.length > 100) {
      newErrors.nomeProduto = "Nome deve ter entre 3 e 100 caracteres"
    }

    if (!formData.preco) {
      newErrors.preco = "Preço é obrigatório"
    } else if (isNaN(Number.parseFloat(formData.preco)) || Number.parseFloat(formData.preco) <= 0) {
      newErrors.preco = "Preço deve ser maior que zero"
    }

    if (formData.descricao && formData.descricao.length > 500) {
      newErrors.descricao = "Descrição não pode exceder 500 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setLoading(true)
      const dados = {
        nomeProduto: formData.nomeProduto,
        preco: Number.parseFloat(formData.preco),
        descricao: formData.descricao,
      }

      if (produto) {
        console.log("[v0] Atualizando produto ID:", produto.id)
        await produtosService.atualizar(produto.id, dados)
      } else {
        console.log("[v0] Criando novo produto")
        await produtosService.criar(dados)
      }

      await onSubmit(dados)
    } catch (error: any) {
      console.error("[v0] Erro no handleSubmit:", error)
      setErrors({ submit: error.message || "Erro ao salvar produto" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nomeProduto" className="font-semibold text-slate-300">
          Nome do Produto
        </Label>
        <Input
          id="nomeProduto"
          placeholder="Ex: Notebook Dell XPS 13"
          value={formData.nomeProduto}
          onChange={(e) => setFormData({ ...formData, nomeProduto: e.target.value })}
          className={`bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 ${
            errors.nomeProduto ? "border-red-500" : ""
          }`}
        />
        {errors.nomeProduto && (
          <div className="flex items-center gap-2 mt-1 text-red-400 text-sm">
            <AlertCircle size={16} />
            {errors.nomeProduto}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="preco" className="font-semibold text-slate-300">
          Preço (R$)
        </Label>
        <Input
          id="preco"
          type="number"
          placeholder="Ex: 2499.99"
          step="0.01"
          min="0"
          value={formData.preco}
          onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
          className={`bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 ${
            errors.preco ? "border-red-500" : ""
          }`}
        />
        {errors.preco && (
          <div className="flex items-center gap-2 mt-1 text-red-400 text-sm">
            <AlertCircle size={16} />
            {errors.preco}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="descricao" className="font-semibold text-slate-300">
          Descrição
        </Label>
        <Textarea
          id="descricao"
          placeholder="Descrição do produto (opcional)"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          rows={3}
          className={`bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 ${
            errors.descricao ? "border-red-500" : ""
          }`}
        />
        {errors.descricao && (
          <div className="flex items-center gap-2 mt-1 text-red-400 text-sm">
            <AlertCircle size={16} />
            {errors.descricao}
          </div>
        )}
      </div>

      {errors.submit && (
        <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle className="text-red-400 mt-0.5 flex-shrink-0" size={20} />
          <p className="text-red-400 text-sm">{errors.submit}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
        disabled={loading}
      >
        {loading && <Loader2 className="animate-spin mr-2" size={18} />}
        {loading ? "Salvando..." : produto ? "Atualizar" : "Criar"} Produto
      </Button>
    </form>
  )
}
