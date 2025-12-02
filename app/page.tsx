"use client"

import { useState, useEffect } from "react"
import { ProdutoTable } from "@/components/produto-table"
import { ProdutoModal } from "@/components/produto-modal"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, Package } from "lucide-react"

export default function Home() {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduto, setEditingProduto] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/v1"

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/produtos/listar/todos`)
        if (response.ok) {
          const data = await response.json()
          setProdutos(data || [])
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProdutos()
  }, [refreshTrigger])

  const handleOpenModal = (produto = null) => {
    setEditingProduto(produto)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduto(null)
  }

  const handleSucess = () => {
    setRefreshTrigger((prev) => prev + 1)
    handleCloseModal()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <Package size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Gestão de Produtos</h1>
              <p className="text-slate-400 mt-1">Gerenciamento inteligente do seu catálogo</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Total de Produtos</p>
            <p className="text-3xl font-bold text-white">{produtos.length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Valor Total</p>
            <p className="text-3xl font-bold text-blue-400">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(produtos.reduce((acc, p) => acc + (p.preco || 0), 0))}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Última Atualização</p>
            <p className="text-slate-300 text-sm mt-2">
              {new Date().toLocaleDateString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <Button
            onClick={() => handleOpenModal()}
            className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Plus size={20} />
            Novo Produto
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <Loader2 className="animate-spin text-blue-500" size={48} />
            <p className="text-slate-400">Carregando produtos...</p>
          </div>
        ) : (
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden">
            {produtos.length > 0 ? (
              <ProdutoTable
                produtos={produtos}
                onEdit={handleOpenModal}
                onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
              />
            ) : (
              <div className="p-16 text-center">
                <Package size={48} className="mx-auto mb-4 text-slate-600" />
                <p className="text-slate-400 text-lg mb-2">Nenhum produto cadastrado ainda</p>
                <p className="text-slate-500 mb-6">Clique em "Novo Produto" para começar</p>
                <Button
                  onClick={() => handleOpenModal()}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Plus size={18} />
                  Criar Primeiro Produto
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        <ProdutoModal isOpen={showModal} onClose={handleCloseModal} onSuccess={handleSucess} produto={editingProduto} />
      </div>
    </main>
  )
}
