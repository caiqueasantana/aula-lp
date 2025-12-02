# Gerar Types do Supabase Sincronizados

## ⚠️ VOCÊ PRECISA FAZER ISSO:

### Passo 1: Encontre seu PROJECT_REF
1. Abra https://app.supabase.com
2. Vá para **Settings** (engrenagem no canto inferior esquerdo)
3. Vá para **General**
4. Copie o **Project Reference ID** (algo como: `xyzvwutsrqpzxyvu`)

### Passo 2: Execute o comando para gerar os types

```bash
# Substitua SEU_PROJECT_REF pelo ID copiado acima
npx supabase gen types typescript --project-id "SEU_PROJECT_REF" > lib/types/database.ts
```

**Exemplo completo:**
```bash
npx supabase gen types typescript --project-id "abcdef123456" > lib/types/database.ts
```

### Passo 3: Atualize o package.json

Adicione um script para gerar os tipos automaticamente antes do build:

```json
{
  "scripts": {
    "generate-types": "supabase gen types typescript --project-id 'SEU_PROJECT_REF' > lib/types/database.ts",
    "prebuild": "npm run generate-types",
    "build": "next build"
  }
}
```

### Passo 4: Crie/Atualize os types

A pasta `lib/types/` será criada automaticamente com o arquivo `database.ts` contendo todos os types sincronizados com seu banco.

### Passo 5: Commit e Deploy

```bash
git add lib/types/database.ts
git commit -m "feat: generate Supabase types synchronized with database schema"
git push origin main
```

A Vercel detectará a mudança e disparará novo deploy automaticamente.

---

## ❓ Não encontrou o PROJECT_REF?

1. Vá para Settings > API
2. Procure por "Project Reference ID"
3. Ou veja a URL do seu projeto: `https://app.supabase.com/projects/[AQUI_ESTA_O_ID]/...`

---

## ✅ Depois que fizer tudo isso:

Os types estarão sincronizados com seu banco Supabase e a aplicação terá type safety completo com as colunas corretas!
