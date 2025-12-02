# SOLUÇÃO FINAL: Como Corrigir o Erro "nomeProduto" no Supabase

## O Problema
O erro `Could not find the 'nomeProduto' column of 'produtos' in the schema cache` ocorre porque:

1. O Supabase tem uma tabela com coluna `nome_produto` (snake_case)
2. Mas o schema cache do Supabase "lembra" de uma coluna antiga chamada `nomeProduto` (camelCase)
3. Quando você tenta fazer operações, o Supabase valida contra esse cache antigo e falha

## A Solução - Passo a Passo

### 1️⃣ Abra o Supabase Dashboard
- Vá para https://app.supabase.com
- Entre no seu projeto
- Abra o **SQL Editor** (aba inferior esquerda)

### 2️⃣ Copie TODO o conteúdo do script
- Abra o arquivo: `/scripts/02-limpar-e-recriar-tabela.sql`
- Copie TODO o conteúdo

### 3️⃣ Cole no Supabase SQL Editor
- Cole o conteúdo no SQL Editor do Supabase
- Clique em **Run** (ou pressione `Ctrl + Enter`)
- Aguarde a execução completar

### 4️⃣ Verifique o resultado
- Você deve ver uma query `SELECT` no final que lista as colunas
- Confirme que as colunas são:
  - `id` (bigint)
  - `nome_produto` (character varying)
  - `preco` (numeric)
  - `descricao` (character varying)
  - `data_criacao` (timestamp with time zone)
  - `data_atualizacao` (timestamp with time zone)

### 5️⃣ Teste a Aplicação
- Volte para o frontend
- Tente adicionar/editar um produto
- O erro **NÃO deve aparecer mais** ✅

## Por que isso funciona?

O script faz o seguinte:
1. **Remove todas as políticas RLS** antigas
2. **Remove triggers e funções** antigas
3. **DELETA a tabela completamente** (com CASCADE para limpar dependências)
4. **Recriam do zero** com o schema correto
5. **Recria RLS, índices, triggers** e funções

Isso garante que:
- Não há "lixo" ou cache antigo no Supabase
- O schema está 100% limpo e correto
- As colunas têm exatamente os nomes esperados

## Se ainda der erro...

Se depois disso ainda aparecer o erro, faça:

1. **Limpe o cache do navegador**
   - Pressione `F12` (DevTools)
   - Vá para Application > Cache Storage
   - Delete todos os caches

2. **Reinicie o servidor Next.js**
   - Terminal: `Ctrl + C`
   - Digite: `npm run dev` (ou `pnpm dev`)

3. **Verifique os logs do Supabase**
   - Vá para Logs > Edge Functions
   - Procure por erros relacionados a "nomeProduto"

## Arquivos atualizados no backend

✅ `src/main/java/com/FATEC/cadastro_produtos/infrastructure/entity/Produto.java`
- Campo agora é `nome_produto` (não `nomeProduto`)
- Tabela é `produtos` (não `produto`)

✅ `src/main/java/com/FATEC/cadastro_produtos/presentation/dto/ProdutoRequestDTO.java`
- Campo agora é `nome_produto`

✅ `src/main/java/com/FATEC/cadastro_produtos/presentation/dto/ProdutoResponseDTO.java`
- Campo agora é `nome_produto`

✅ `src/main/java/com/FATEC/cadastro_produtos/Service/ProdutosService.java`
- Todos os getters/setters usando `nome_produto`

✅ `src/main/resources/application.properties`
- Configuração corrigida do Hibernate

## Frontend já está correto

O TypeScript/React já está mapeando corretamente:
- `item.nome_produto` (coluna do banco) → `nomeProduto` (variável JS)
- Esse mapeamento está em `/lib/produtos-service.ts`
