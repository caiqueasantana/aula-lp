# 📦 Sistema de Cadastro de Produtos

**Aplicação full-stack** para gerenciar produtos com **Java Spring Boot** (backend), **Next.js** (frontend) e **PostgreSQL/Supabase** (banco de dados).

---

## 📋 Equipe

- Caique dos Anjos
- João Vitor Monteiro Correa  
- Henrique Sousa Melo
- Pablo Araújo

---

## 📂 Arquitetura

### 🔙 Backend - Java Spring Boot
```
src/main/java/com/FATEC/cadastro_produtos/
├── controller/              # Endpoints REST
├── service/                 # Lógica de negócio
├── presentation/dto/        # DTOs (requisição/resposta)
└── infrastructure/
    ├── entity/              # Modelos JPA
    ├── repository/          # Acesso a dados
    ├── exception/           # Exceções personalizadas
    └── handler/             # Tratamento global de erros
```

**Padrões:**
- Arquitetura em camadas
- Dependency Injection (Spring)
- DTOs para isolamento de dados
- Validações em camada de serviço
- Tratamento centralizado de erros

### 🎨 Frontend - Next.js + React
```
app/                        # Páginas e layout
components/                 # Componentes
├── produto-form.tsx       # Formulário CRUD
├── produto-modal.tsx      # Modal interativo
├── produto-table.tsx      # Tabela de listagem
└── ui/                    # Componentes base
lib/                        # Serviços e tipos
├── supabase.ts            # Cliente Supabase
├── produtos-service.ts    # API client
└── types/database.ts      # Types TypeScript
```

### 🗄️ Database - PostgreSQL/Supabase
```
Tabela: produtos
├── id (PK)
├── nome_produto (UNIQUE)
├── preco
├── descricao (nullable)
├── created_at
└── updated_at
```

---

## 🛠️ Stack

| Componente | Tecnologia |
|-----------|-----------|
| **Linguagem Backend** | Java 21 |
| **Framework Backend** | Spring Boot 3 |
| **ORM** | Spring Data JPA / Hibernate |
| **Gerenciador Build** | Maven |
| **Frontend Framework** | Next.js 16 |
| **React** | React 19 |
| **Linguagem Frontend** | TypeScript |
| **Estilo** | Tailwind CSS |
| **DB** | PostgreSQL (Supabase) |
| **Client Supabase** | @supabase/ssr |

---

## 🚀 Início Rápido

### 1. Backend (Java)
```bash
cd /workspaces/aula-lp
./mvnw clean install
./mvnw spring-boot:run
```
✅ Rodando em: `http://localhost:8080`

### 2. Frontend (Node.js)
```bash
npm install
npm run dev
```
✅ Disponível em: `http://localhost:3000`

---

## 📡 API REST

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/produtos` | Listar todos |
| `GET` | `/api/v1/produtos/{id}` | Buscar por ID |
| `POST` | `/api/v1/produtos` | Criar novo |
| `PUT` | `/api/v1/produtos/{id}` | Atualizar |
| `DELETE` | `/api/v1/produtos/{id}` | Deletar |

### Exemplo de Request (POST)
```json
{
  "nome_produto": "Notebook Dell",
  "preco": 2499.99,
  "descricao": "Notebook XPS 13 com processador Intel"
}
```

---

## 🔐 Validações

- **Nome**: 3-100 caracteres, obrigatório, único
- **Preço**: valor positivo, obrigatório
- **Descrição**: opcional

---

## ⚙️ Configuração

### Variáveis de Ambiente (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

### Backend (`application.properties`)
- Conexão PostgreSQL configurada
- Hibernate DDL: `update`
- Transações gerenciadas pelo Spring

---

## 📝 Schema SQL

```sql
CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome_produto VARCHAR(100) NOT NULL UNIQUE,
  preco DECIMAL(10, 2) NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔧 Scripts úteis

| Script | Descrição |
|--------|-----------|
| `/scripts/01-criar-tabela-produtos.sql` | Criação inicial da tabela |
| `/scripts/02-limpar-e-recriar-tabela.sql` | Reset completo + RLS + Triggers |

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| Erro de schema cache | Execute `/scripts/02-limpar-e-recriar-tabela.sql` no Supabase |
| Types desatualizados | `npm run generate-types` |
| Conexão recusada | Verifique `.env.local` e credenciais Supabase |

---

## 📚 Links Úteis

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [PostgreSQL](https://www.postgresql.org/docs)

---

**Desenvolvido para FATEC Carapicuíba - 2025**
