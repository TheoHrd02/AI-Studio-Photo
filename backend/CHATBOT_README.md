# 🤖 Chatbot Support - Documentation

## Vue d'ensemble

Ce module fournit un **chatbot support minimaliste** qui :
- Reçoit des questions utilisateur via une API REST
- Interroge l'API OpenAI avec le modèle `gpt-4o-mini`
- Utilise **file_search** pour répondre UNIQUEMENT à partir de votre documentation vectorisée
- Retourne une réponse texte ou "Je ne sais pas." en cas d'erreur

---

## 📋 Prérequis

1. **Compte OpenAI** avec accès API
2. **Vector Store créé** sur OpenAI avec votre documentation
3. Variables d'environnement configurées

---

## ⚙️ Configuration

### 1. Variables d'environnement

Copiez `.env.example` vers `.env` et remplissez les valeurs :

```bash
# OpenAI Configuration (Chatbot Support)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
VSTORE_ID=vs_xxxxxxxxxxxxxxxxxxxxxxxx
```

**Comment obtenir ces valeurs :**

- **OPENAI_API_KEY** : Votre clé API OpenAI (depuis https://platform.openai.com/api-keys)
- **VSTORE_ID** : L'ID de votre Vector Store créé sur OpenAI (depuis https://platform.openai.com/storage)

### 2. CORS

Le backend accepte les requêtes depuis l'origine définie dans `CORS_ORIGINS` (par défaut `http://localhost:3000`).

---

## 🚀 Utilisation

### Démarrage avec Docker

```bash
# Depuis la racine du projet
docker-compose up -d backend
```

Le backend sera disponible sur `http://localhost:8080`

### Démarrage en local (dev)

```bash
cd backend
go mod download
air -c .air.toml
```

---

## 📡 API Reference

### POST /api/v1/ask

Envoie une question au chatbot et reçoit une réponse.

**Endpoint :**
```
POST http://localhost:8080/api/v1/ask
```

**Request Body :**
```json
{
  "q": "Comment installer votre produit ?"
}
```

**Response (succès) :**
```json
{
  "answer": "Pour installer le produit, suivez ces étapes : ..."
}
```

**Response (erreur ou réponse introuvable) :**
```json
{
  "answer": "Je ne sais pas."
}
```

**Status Codes :**
- `200 OK` : Requête traitée (même si la réponse est "Je ne sais pas.")
- `400 Bad Request` : Question manquante ou invalide

---

## 🧪 Tests

### Test avec curl

```bash
curl -X POST http://localhost:8080/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"q":"Comment fonctionne votre service ?"}'
```

**Réponse attendue :**
```json
{
  "answer": "Notre service fonctionne en ..."
}
```

### Test avec HTTPie

```bash
http POST http://localhost:8080/api/v1/ask q="Quels sont vos tarifs ?"
```

### Test avec Postman

1. Créez une requête `POST`
2. URL : `http://localhost:8080/api/v1/ask`
3. Headers : `Content-Type: application/json`
4. Body (raw JSON) :
   ```json
   {
     "q": "Votre question ici"
   }
   ```
5. Envoyez

---

## 🔒 Sécurité & Limitations

### Comportement du modèle

- **Temperature : 0.2** (réponses déterministes et factuelles)
- **Prompt système** : Force le modèle à répondre UNIQUEMENT depuis la documentation
- **Fallback** : "Je ne sais pas." si aucune réponse trouvée

### Validation des entrées

- Question **requise** (champ `q`)
- Longueur **max 1000 caractères**
- Question **non vide**

### CORS

- Autorisé uniquement pour `CORS_ORIGINS` (défini dans `.env`)
- Credentials supportés

### Logs

- Aucune donnée utilisateur sensible n'est loggée
- Seules les longueurs de question/réponse sont enregistrées

---

## 📂 Structure du code

```
backend/
├── cmd/
│   └── main.go                    # Point d'entrée, route /ask ajoutée
├── internal/
│   ├── handlers/
│   │   └── chatbot_handler.go     # Handler pour POST /ask
│   └── services/
│       └── openai_service.go      # Service OpenAI (appels API)
├── .env                           # Variables d'environnement (non versionné)
├── .env.example                   # Template des variables
└── CHATBOT_README.md              # Cette documentation
```

---

## 🐛 Dépannage

### Erreur : "OPENAI_API_KEY is not set"

**Solution :** Vérifiez que votre fichier `.env` contient bien `OPENAI_API_KEY=sk-...`

### Erreur : "VSTORE_ID is not set"

**Solution :** Vérifiez que votre fichier `.env` contient bien `VSTORE_ID=vs_...`

### Le chatbot répond toujours "Je ne sais pas."

**Causes possibles :**
1. Le Vector Store est vide ou mal configuré
2. La documentation n'est pas indexée
3. La question est hors sujet par rapport à la documentation

**Solution :** Vérifiez votre Vector Store sur https://platform.openai.com/storage

### CORS Error depuis le frontend

**Solution :** Vérifiez que `CORS_ORIGINS` dans `.env` correspond à l'URL de votre frontend (ex: `http://localhost:3000`)

---

## 🔄 Intégration Frontend (Nuxt 3)

### Exemple de composable

Créez `composables/useChatbot.ts` :

```typescript
export const useChatbot = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'http://localhost:8080/api/v1'

  const ask = async (question: string) => {
    const response = await $fetch<{ answer: string }>(`${apiBase}/ask`, {
      method: 'POST',
      body: { q: question },
    })
    return response.answer
  }

  return { ask }
}
```

### Exemple d'utilisation dans un composant

```vue
<script setup lang="ts">
const { ask } = useChatbot()
const question = ref('')
const answer = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  if (!question.value.trim()) return
  
  loading.value = true
  try {
    answer.value = await ask(question.value)
  } catch (error) {
    answer.value = 'Erreur : Impossible de contacter le chatbot.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <input v-model="question" placeholder="Posez votre question..." />
    <button @click="handleSubmit" :disabled="loading">
      {{ loading ? 'Chargement...' : 'Envoyer' }}
    </button>
    <p v-if="answer">{{ answer }}</p>
  </div>
</template>
```

---

## 📝 Notes importantes

- Ce service **ne stocke AUCUNE donnée** utilisateur
- Il agit comme un **proxy** entre votre frontend et l'API OpenAI
- **Aucune base de données** n'est requise
- Les réponses sont **entièrement basées** sur votre Vector Store

---

## 🎯 Prochaines étapes

- [ ] Ajouter un système de rate limiting (optionnel)
- [ ] Implémenter un cache Redis pour les réponses fréquentes (optionnel)
- [ ] Ajouter des analytics sur les questions posées (optionnel)
- [ ] Créer une page frontend dédiée au chatbot

---

## 📧 Support

Pour toute question sur ce module, consultez la documentation OpenAI :
- **API Reference** : https://platform.openai.com/docs/api-reference
- **File Search** : https://platform.openai.com/docs/assistants/tools/file-search
- **Vector Stores** : https://platform.openai.com/docs/assistants/tools/file-search/vector-stores
