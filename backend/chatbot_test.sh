#!/bin/bash

# 🧪 Script de test pour le chatbot support
# Usage: ./chatbot_test.sh

API_URL="http://localhost:8080/api/v1/ask"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🤖 Tests du Chatbot Support"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test 1: Question valide
echo "📋 Test 1: Question valide"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"q":"Comment fonctionne votre service ?"}'
echo ""
echo ""

# Test 2: Question vide (devrait échouer)
echo "📋 Test 2: Question vide (400 attendu)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"q":""}'
echo ""
echo ""

# Test 3: Champ manquant (devrait échouer)
echo "📋 Test 3: Champ 'q' manquant (400 attendu)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{}'
echo ""
echo ""

# Test 4: Question longue
echo "📋 Test 4: Question détaillée"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"q":"Pouvez-vous m'\''expliquer en détail comment utiliser votre API et quelles sont les limitations ?"}'
echo ""
echo ""

# Test 5: Question avec caractères spéciaux
echo "📋 Test 5: Question avec accents et ponctuation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"q":"Où puis-je trouver la documentation ? Est-ce gratuit ?"}'
echo ""
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Tests terminés"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
