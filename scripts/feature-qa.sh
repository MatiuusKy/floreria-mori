#!/bin/bash
# Uso: npm run feature:qa nombre-del-feature
set -e

NAME=$1

if [ -z "$NAME" ]; then
  # Intentar detectar la rama actual si es un feature
  CURRENT=$(git branch --show-current)
  if [[ "$CURRENT" == feature/* ]]; then
    NAME="${CURRENT#feature/}"
    echo "→ Detectado feature actual: $NAME"
  else
    echo "❌ Debes indicar el nombre del feature o estar en una rama feature/*."
    echo "   Uso: npm run feature:qa nombre-del-feature"
    exit 1
  fi
fi

echo "→ Mergeando feature/$NAME en qa..."
git checkout "feature/$NAME" 2>/dev/null || true
git checkout qa
git pull origin qa
git merge "feature/$NAME" --no-edit

echo "→ Pusheando qa..."
git push origin qa

echo "✓ Deploy en QA disparado. Revisa qa.floraboutique.cl"
echo "  Cuando QA apruebe: npm run feature:release"
