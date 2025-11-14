#!/bin/bash
# Script de nettoyage complet

echo "🧹 Nettoyage complet en cours..."

# Arrêter le serveur
pkill -f "bun.*dev" 2>/dev/null
echo "✅ Serveur arrêté"

# Supprimer tous les caches
rm -rf .nuxt
rm -rf i18n
rm -rf node_modules/.cache
rm -rf node_modules/@nuxtjs/i18n
rm -rf node_modules/vue-i18n
echo "✅ Caches supprimés"

# Réinstaller les dépendances
echo "📦 Réinstallation des dépendances..."
bun install

echo "✅ Nettoyage terminé !"
echo ""
echo "Pour démarrer le serveur :"
echo "  bun run dev"

