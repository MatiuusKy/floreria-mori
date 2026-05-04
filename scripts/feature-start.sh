#!/bin/bash
# Uso: npm run feature:start nombre-del-feature
set -e

NAME=$1

if [ -z "$NAME" ]; then
  echo "❌ Debes indicar el nombre del feature."
  echo "   Uso: npm run feature:start nombre-del-feature"
  exit 1
fi

echo "→ Actualizando develop..."
git checkout develop
git pull origin develop

echo "→ Creando rama feature/$NAME..."
git checkout -b "feature/$NAME"

echo "✓ Listo. Estás en feature/$NAME"
echo "  Cuando termines: npm run feature:qa $NAME"
