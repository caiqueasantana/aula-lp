-- SCRIPT PARA LIMPAR COMPLETAMENTE E RECRIAR A TABELA PRODUTOS
-- Execute no Supabase SQL Editor

-- 1. Remover policies existentes
DROP POLICY IF EXISTS "Allow public read" ON public.produtos;
DROP POLICY IF EXISTS "Allow public insert" ON public.produtos;
DROP POLICY IF EXISTS "Allow public update" ON public.produtos;
DROP POLICY IF EXISTS "Allow public delete" ON public.produtos;

-- 2. Remover triggers existentes
DROP TRIGGER IF EXISTS update_produtos_data_atualizacao ON public.produtos;
DROP FUNCTION IF EXISTS update_data_atualizacao_column();

-- 3. Desabilitar RLS temporariamente
ALTER TABLE public.produtos DISABLE ROW LEVEL SECURITY;

-- 4. Remover índices existentes
DROP INDEX IF EXISTS idx_produtos_nome;

-- 5. DELETAR A TABELA COMPLETAMENTE
DROP TABLE IF EXISTS public.produtos CASCADE;

-- 6. RECRIAR A TABELA DO ZERO COM SCHEMA CORRETO
CREATE TABLE public.produtos (
  id BIGSERIAL PRIMARY KEY,
  nome_produto VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  descricao VARCHAR(500),
  data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  data_atualizacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_nome_produto UNIQUE (nome_produto)
);

-- 7. Criar índices
CREATE INDEX idx_produtos_nome ON public.produtos(nome_produto);
CREATE INDEX idx_produtos_id ON public.produtos(id);

-- 8. Habilitar RLS
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- 9. Criar políticas de segurança (permissivas para desenvolvimento)
CREATE POLICY "Enable read access for all users" ON public.produtos
  FOR SELECT
  USING (true);

CREATE POLICY "Enable insert access for all users" ON public.produtos
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON public.produtos
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" ON public.produtos
  FOR DELETE
  USING (true);

-- 10. Criar função para atualizar data_atualizacao
CREATE OR REPLACE FUNCTION update_data_atualizacao_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.data_atualizacao = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 11. Criar trigger
CREATE TRIGGER update_produtos_data_atualizacao
BEFORE UPDATE ON public.produtos
FOR EACH ROW
EXECUTE FUNCTION update_data_atualizacao_column();

-- 12. Verificar a tabela criada
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'produtos' AND table_schema = 'public'
ORDER BY ordinal_position;
