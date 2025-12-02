#!/bin/bash

# Script para gerar types do Supabase sincronizados com o banco
# ANTES DE USAR: Substitua "SEU_PROJECT_REF" pelo seu PROJECT_REF do Supabase

# ⚠️ PASSO 1: Copie seu PROJECT_REF do Supabase
# 1. Vá para https://app.supabase.com
# 2. Settings > General
# 3. Copie o "Project Reference ID"

# ⚠️ PASSO 2: Execute o comando abaixo (substitua SEU_PROJECT_REF)
# npx supabase gen types typescript --project-id "SEU_PROJECT_REF" > lib/types/database.ts

# ⚠️ PASSO 3: Depois execute estes comandos no terminal:

# Instalar Supabase CLI se ainda não tiver
# npm install -g supabase

# Gerar os types (SUBSTITUA SEU_PROJECT_REF)
# npx supabase gen types typescript --project-id "SEU_PROJECT_REF" > lib/types/database.ts

# Commit e push
# git add lib/types/database.ts
# git commit -m "feat: generate Supabase types synchronized with database schema"
# git push origin main
