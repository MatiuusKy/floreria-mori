#!/bin/bash
# Uso: npm run feature:release
# Crea un PR de qa → main en GitHub
set -e

# Verificar que gh CLI está instalado
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) no está instalado."
  echo "   Instálalo con: brew install gh"
  exit 1
fi

echo "→ Pusheando qa actualizado..."
git checkout qa
git push origin qa

echo "→ Creando PR de qa → main..."
PR_URL=$(gh pr create \
  --base main \
  --head qa \
  --title "release: qa → main $(date +'%Y-%m-%d')" \
  --body "Deploy a producción desde QA. Revisado y aprobado." \
  2>&1)

echo "✓ PR creado: $PR_URL"
echo "  Revisa el PR en GitHub y haz merge para deployar a producción."
