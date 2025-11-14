# 🚀 Chatbot Support - Quick Start Guide

Guide de démarrage ultra-rapide pour mettre en place le chatbot support.

---

## ⚡ Installation en 3 étapes

### 1️⃣ Configuration des variables d'environnement

```bash
cd backend
cp .env.example .env
```

Éditez le fichier `.env` et ajoutez vos clés OpenAI :

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
VSTORE_ID=vs_xxxxxxxxxxxxxxxxxxxxxxxx
```

> **Où trouver ces valeurs ?**
> - OPENAI_API_KEY : https://platform.openai.com/api-keys
> - VSTORE_ID : https://platform.openai.com/storage (créez un Vector Store)

---

### 2️⃣ Démarrage du serveur

**Avec Docker (recommandé) :**
```bash
# Depuis la racine du projet
docker-compose up -d backend
```

**Sans Docker :**
```bash
cd backend
go mod download
air -c .air.toml
# ou
go run cmd/main.go
```

---

### 3️⃣ Test de l'API

**Windows (PowerShell) :**
```powershell
.\chatbot_test.ps1
```

**Linux/Mac :**
```bash
chmod +x chatbot_test.sh
./chatbot_test.sh
```

**Ou avec curl :**
```bash
curl -X POST http://localhost:8080/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"q":"Comment utiliser votre service ?"}'
```

**Réponse attendue :**
```json
{
  "answer": "Notre service permet de ..."
}
```

---

## ✅ Vérifications

### 1. Le serveur démarre-t-il ?

```bash
curl http://localhost:8080/health
```

**Réponse OK :**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### 2. Les variables sont-elles configurées ?

Vérifiez dans les logs au démarrage :
- ✅ Pas d'erreur "OPENAI_API_KEY is not set"
- ✅ Pas d'erreur "VSTORE_ID is not set"

### 3. Le chatbot répond-il ?

```bash
curl -X POST http://localhost:8080/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"q":"Test"}'
```

Si vous obtenez `{"answer": "..."}`, c'est bon ! 🎉

---

## 🐛 Problèmes courants

| Problème | Solution |
|----------|----------|
| `OPENAI_API_KEY is not set` | Vérifiez votre fichier `.env` |
| `VSTORE_ID is not set` | Ajoutez `VSTORE_ID=vs_...` dans `.env` |
| Port 8080 déjà utilisé | Changez `PORT=8081` dans `.env` |
| CORS error | Vérifiez `CORS_ORIGINS=http://localhost:3000` |
| Réponse "Je ne sais pas." | Vérifiez votre Vector Store sur OpenAI |

---

## 📖 Documentation complète

Pour plus de détails, consultez [CHATBOT_README.md](./CHATBOT_README.md)

---

## 🎯 Next Steps

1. **Frontend** : Créez un composable `useChatbot` dans Nuxt
2. **UI** : Ajoutez une page `/support` avec un formulaire de chat
3. **Vector Store** : Uploadez votre documentation sur OpenAI
4. **Production** : Sécurisez vos clés API (secrets Docker/K8s)

---

## 📝 Exemple d'intégration frontend

**Créez `composables/useChatbot.ts` :**

```typescript
export const useChatbot = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const ask = async (question: string) => {
    const { data, error } = await useFetch<{ answer: string }>(`${apiBase}/ask`, {
      method: 'POST',
      body: { q: question },
    })

    if (error.value) throw error.value
    return data.value?.answer || 'Erreur'
  }

  return { ask }
}
```

**Utilisez dans un composant :**

```vue
<script setup lang="ts">
const { ask } = useChatbot()
const question = ref('')
const answer = ref('')

const handleAsk = async () => {
  answer.value = await ask(question.value)
}
</script>

<template>
  <div>
    <input v-model="question" />
    <button @click="handleAsk">Envoyer</button>
    <p>{{ answer }}</p>
  </div>
</template>
```

---

Vous êtes prêt ! 🚀
