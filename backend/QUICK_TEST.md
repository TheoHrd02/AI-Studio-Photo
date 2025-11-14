# ⚡ Test Rapide du Chatbot

## 🎯 Test en 30 secondes

### 1. Vérifier que le serveur tourne

```bash
curl http://localhost:8080/health
```

**✅ Résultat attendu :**
```json
{"status":"ok","message":"Server is running"}
```

---

### 2. Tester le chatbot

**Windows (PowerShell) :**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/v1/ask" `
  -Method Post `
  -Body '{"q":"Test"}' `
  -ContentType "application/json"
```

**Linux/Mac/Git Bash :**
```bash
curl -X POST http://localhost:8080/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"q":"Test"}'
```

**✅ Résultat attendu :**
```json
{"answer":"..."}
```

---

### 3. Tester le frontend

Ouvrez dans votre navigateur :
```
http://localhost:3000/support
```

Tapez une question et cliquez "Envoyer".

---

## ❌ Si ça ne marche pas

### Erreur : "Connection refused"

**→ Le backend n'est pas démarré**

```bash
# Avec Docker
docker-compose up -d backend

# Sans Docker
cd backend
air -c .air.toml
```

---

### Erreur : "OPENAI_API_KEY is not set"

**→ Configurez votre .env**

```bash
cd backend
cp .env.example .env
# Éditez .env et ajoutez votre clé OpenAI
```

---

### Réponse : "Je ne sais pas."

**→ Vérifiez votre Vector Store**

1. Allez sur https://platform.openai.com/storage
2. Vérifiez que le Vector Store existe
3. Vérifiez qu'il contient des fichiers
4. Copiez le bon `VSTORE_ID` dans `.env`

---

## ✅ Tout fonctionne ?

**Bravo ! Vous êtes prêt à utiliser le chatbot.**

**Next steps :**
1. Uploadez votre vraie documentation dans le Vector Store
2. Testez avec des vraies questions
3. Personnalisez l'interface frontend
4. Déployez en production

---

**Besoin d'aide ?** Consultez [CHATBOT_README.md](./CHATBOT_README.md)
