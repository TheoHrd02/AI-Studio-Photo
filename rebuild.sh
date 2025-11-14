#!/bin/bash

echo "🧹 Nettoyage du frontend..."
cd frontend
rm -rf node_modules bun.lock .nuxt
echo "✅ Frontend nettoyé"

echo ""
echo "📦 Installation des dépendances..."
bun install
echo "✅ Dépendances installées"

echo ""
echo "🐳 Arrêt des containers Docker..."
cd ..
docker-compose down
echo "✅ Containers arrêtés"

echo ""
echo "🚀 Rebuild et démarrage des containers..."
docker-compose up -d --build
echo "✅ Containers démarrés"

echo ""
echo "🎉 Terminé ! Votre application devrait être prête sur http://localhost:3000"
