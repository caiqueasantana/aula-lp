-- Criar tabela produtos com campos apropriados
CREATE TABLE IF NOT EXISTS public.produtos (
  id BIGSERIAL PRIMARY KEY,
  nome_produto VARCHAR(100) NOT NULL UNIQUE,
  descricao VARCHAR(500),
  preco DECIMAL(10, 2) NOT NULL,
  data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para melhor performance nas buscas
CREATE INDEX IF NOT EXISTS idx_produtos_nome ON public.produtos(nome_produto);

-- Habilitar RLS (Row Level Security) para segurança
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública
CREATE POLICY "Allow public read" ON public.produtos
  FOR SELECT
  USING (true);

-- Criar política para permitir insert público
CREATE POLICY "Allow public insert" ON public.produtos
  FOR INSERT
  WITH CHECK (true);

-- Criar política para permitir update público
CREATE POLICY "Allow public update" ON public.produtos
  FOR UPDATE
  USING (true);

-- Criar política para permitir delete público
CREATE POLICY "Allow public delete" ON public.produtos
  FOR DELETE
  USING (true);

-- Criar função para atualizar data_atualizacao automaticamente
CREATE OR REPLACE FUNCTION update_data_atualizacao_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.data_atualizacao = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar data_atualizacao
DROP TRIGGER IF EXISTS update_produtos_data_atualizacao ON public.produtos;
CREATE TRIGGER update_produtos_data_atualizacao
  BEFORE UPDATE ON public.produtos
  FOR EACH ROW
  EXECUTE FUNCTION update_data_atualizacao_column();
