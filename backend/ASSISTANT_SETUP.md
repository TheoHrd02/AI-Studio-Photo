# 🤖 Guide : Créer votre Assistant OpenAI

## 📋 Vue d'ensemble

Le chatbot utilise maintenant l'**Assistants API** d'OpenAI avec `file_search`. Vous devez créer un Assistant configuré avec votre Vector Store.

---

## 🚀 Étapes de création

### 1️⃣ Accéder au tableau de bord OpenAI

Rendez-vous sur : **https://platform.openai.com/assistants**

Ou naviguez :
```
OpenAI Dashboard → Assistants
```

---

### 2️⃣ Créer un nouvel Assistant

1. Cliquez sur **"Create"**
2. Remplissez les informations :

**Name** (Nom) :
```
AI Studio Photo Support
```

**Instructions** (Prompt système) :
```
Tu es un assistant support qui répond UNIQUEMENT à partir de la documentation fournie via file_search.

Si la réponse n'est pas dans la documentation, réponds "Je ne sais pas."

Ne jamais inventer d'informations. Reste concis et précis.

Réponds toujours en français.
```

**Model** (Modèle) :
```
gpt-4o-mini
```

**Temperature** :
```
0.2
```

---

### 3️⃣ Activer File Search

1. Dans la section **"Tools"**, activez **"File search"**
2. Cliquez sur **"Add"** pour ajouter un Vector Store
3. Deux options :

#### Option A : Créer un nouveau Vector Store
- Cliquez sur **"Create a new vector store"**
- Donnez un nom (ex: "AI Studio Photo Docs")
- Uploadez vos fichiers de documentation
- Cliquez sur **"Save"**

#### Option B : Utiliser un Vector Store existant
- Sélectionnez votre Vector Store dans la liste
- Cliquez sur **"Save"**

---

### 4️⃣ Sauvegarder et récupérer l'ID

1. Cliquez sur **"Create"** en haut à droite
2. Une fois créé, vous verrez l'**Assistant ID** :

```
asst_xxxxxxxxxxxxxxxxxxxxxxxx
```

**Copiez cet ID !**

---

### 5️⃣ Configurer le backend

Éditez `backend/.env` et ajoutez :

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
ASSISTANT_ID=asst_xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔄 Redémarrer le backend

```bash
docker compose restart backend
```

---

## 🧪 Tester

### Test via curl

```bash
curl -X POST http://localhost:8080/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"q":"Comment fonctionne votre service ?"}'
```

**✅ Résultat attendu :**
```json
{
  "answer": "Notre service permet de..."
}
```

### Test via le frontend

Ouvrez http://localhost:3000/support et posez une question.

---

## 📝 Exemple de documentation à uploader

Créez un fichier `docs.md` :

```markdown
# AI Studio Photo - Documentation

## Qu'est-ce qu'AI Studio Photo ?

AI Studio Photo est un service de transformation de photos par intelligence artificielle.

## Comment ça fonctionne ?

1. Uploadez votre photo
2. Choisissez un style de transformation
3. L'IA génère votre photo transformée en quelques secondes

## Tarifs

- **Gratuit** : 10 photos par mois
- **Pro** : 100 photos par mois - 9,99€/mois
- **Business** : Illimité - 29,99€/mois

## Comment créer un compte ?

1. Cliquez sur "S'inscrire"
2. Entrez votre email
3. Vérifiez votre email
4. Votre compte est créé !

## Support

Email : support@aistudiophoto.com
Chat : Disponible 7j/7
```

Uploadez ce fichier dans votre Vector Store via l'interface Assistant.

---

## 🔧 Modifier l'Assistant

Pour modifier les instructions ou ajouter des documents :

1. Allez sur https://platform.openai.com/assistants
2. Cliquez sur votre Assistant
3. Modifiez les paramètres
4. Cliquez sur **"Save"**
5. Pas besoin de redémarrer le backend !

---

## 💡 Bonnes pratiques

### Instructions claires

✅ **DO :**
```
Tu es un assistant support qui répond à partir de la documentation.
Si tu ne sais pas, dis "Je ne sais pas."
```

❌ **DON'T :**
```
Réponds aux questions.
```

### Temperature

- **0.0 - 0.3** : Réponses précises et déterministes (recommandé pour support)
- **0.4 - 0.7** : Réponses créatives
- **0.8 - 1.0** : Très créatif (non recommandé pour support)

### Modèle

- **gpt-4o-mini** : Rapide et économique (recommandé)
- **gpt-4o** : Plus puissant mais plus cher
- **gpt-4-turbo** : Équilibre performance/coût

---

## 📊 Monitoring

### Voir l'utilisation

Allez sur https://platform.openai.com/usage pour voir :
- Nombre de requêtes
- Tokens consommés
- Coût total

### Logs des conversations

Les conversations avec l'Assistant sont visibles sur :
https://platform.openai.com/assistants → Votre Assistant → Threads

---

## 🐛 Dépannage

### Erreur : "ASSISTANT_ID is not set"

**Solution :**
1. Vérifiez que `backend/.env` contient `ASSISTANT_ID=asst_...`
2. Redémarrez : `docker compose restart backend`

### Erreur : "Assistant not found"

**Solution :**
1. Vérifiez que l'ID est correct
2. Vérifiez que l'Assistant existe sur https://platform.openai.com/assistants

### Le chatbot répond "Je ne sais pas." à tout

**Solution :**
1. Vérifiez que le Vector Store contient des documents
2. Vérifiez que File Search est activé sur l'Assistant
3. Testez avec une question simple en rapport avec votre doc

---

## 💰 Coûts estimés

### Assistants API (gpt-4o-mini)

- **Input** : ~$0.15 / 1M tokens
- **Output** : ~$0.60 / 1M tokens
- **File search** : ~$0.10 / GB / jour (stockage)

### Exemple pour 1000 questions/mois

```
1000 questions × 500 tokens moyens = 500k tokens
Input : 250k tokens × $0.15 / 1M = $0.04
Output : 250k tokens × $0.60 / 1M = $0.15
Storage : 10 MB × $0.10 / GB / 30 jours = $0.03

Total : ~$0.22 / mois
```

---

## 🔗 Ressources

- **Assistants API** : https://platform.openai.com/docs/assistants/overview
- **File Search** : https://platform.openai.com/docs/assistants/tools/file-search
- **Pricing** : https://openai.com/api/pricing/

---

**Votre Assistant est maintenant prêt ! 🎉**
