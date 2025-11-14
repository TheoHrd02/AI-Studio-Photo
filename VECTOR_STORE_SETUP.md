# 📚 Guide : Créer et configurer votre Vector Store OpenAI

## Vue d'ensemble

Le **Vector Store** est l'endroit où OpenAI stocke et indexe votre documentation pour le `file_search`. 
Ce guide vous explique comment le créer et l'utiliser avec le chatbot.

---

## 📋 Prérequis

1. **Compte OpenAI** avec accès API
2. **Crédit API** disponible (le Vector Store consomme des tokens lors de l'indexation)
3. **Documentation** à uploader (PDF, TXT, MD, DOCX, etc.)

---

## 🚀 Étapes de création

### 1️⃣ Accéder au tableau de bord OpenAI

Rendez-vous sur : **https://platform.openai.com/storage**

Ou naviguez :
```
OpenAI Dashboard → Storage → Vector Stores
```

---

### 2️⃣ Créer un nouveau Vector Store

1. Cliquez sur **"Create vector store"**
2. Donnez-lui un nom descriptif :
   - ✅ Exemple : `AI Studio Photo Documentation`
   - ✅ Exemple : `Support KB v1.0`

3. Cliquez sur **"Create"**

---

### 3️⃣ Uploader vos fichiers de documentation

#### Formats supportés

- `.pdf` - Documents PDF
- `.txt` - Fichiers texte
- `.md` - Markdown
- `.docx` - Documents Word
- `.html` - Pages HTML
- `.json` - Données structurées

#### Taille maximale

- **1 fichier** : Max 512 MB
- **Total** : Jusqu'à 10,000 fichiers par Vector Store

#### Recommandations

✅ **Bonne structure :**
```
docs/
├── getting-started.md
├── pricing.md
├── features.md
├── faq.md
└── troubleshooting.md
```

✅ **Contenu clair et structuré :**
- Utilisez des titres et sous-titres
- Organisez par thématiques
- Évitez les doublons

❌ **À éviter :**
- Fichiers trop volumineux (découper en sections)
- Contenu non pertinent
- Texte peu structuré

---

### 4️⃣ Attendre l'indexation

Une fois les fichiers uploadés :

1. OpenAI les analyse et les indexe automatiquement
2. Statut : **"Processing"** → **"Completed"**
3. Durée : Quelques secondes à quelques minutes selon le volume

⚠️ **Important** : N'utilisez pas le Vector Store tant qu'il est en "Processing"

---

### 5️⃣ Récupérer l'ID du Vector Store

Une fois créé, vous verrez :

```
Vector Store ID: vs_xxxxxxxxxxxxxxxxxxxxxxxx
```

**Copiez cet ID** et ajoutez-le dans votre fichier `backend/.env` :

```env
VSTORE_ID=vs_xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔧 Configuration avancée

### Mettre à jour la documentation

Pour ajouter/modifier des documents :

1. Accédez à votre Vector Store
2. Cliquez sur **"Upload files"**
3. Uploadez vos nouveaux fichiers
4. Attendez la réindexation

⚠️ **Les anciens fichiers restent** - supprimez manuellement si nécessaire

---

### Supprimer des fichiers

1. Accédez au Vector Store
2. Allez dans l'onglet **"Files"**
3. Sélectionnez les fichiers à supprimer
4. Cliquez sur **"Delete"**

---

### Plusieurs Vector Stores

Vous pouvez créer plusieurs Vector Stores pour :

- **Documentation publique** → `vs_public_xxx`
- **Documentation interne** → `vs_internal_xxx`
- **FAQ clients** → `vs_faq_xxx`

Changez simplement la variable `VSTORE_ID` dans `.env` pour basculer.

---

## 💡 Bonnes pratiques

### 📝 Structurez votre documentation

**Exemple de structure recommandée :**

```markdown
# Titre de la section

## Sous-titre

Contenu clair et concis.

### FAQ

**Q: Question 1 ?**
R: Réponse claire.

**Q: Question 2 ?**
R: Réponse claire.
```

---

### 🎯 Optimisez pour le file_search

✅ **DO :**
- Utilisez des phrases complètes
- Structurez avec des titres
- Incluez des mots-clés pertinents
- Répétez les informations importantes différemment

❌ **DON'T :**
- Mettre uniquement des listes à puces
- Utiliser trop d'abréviations
- Écrire de longues phrases sans ponctuation
- Dupliquer le même contenu

---

### 🔄 Versionnez votre documentation

Créez des Vector Stores versionnés :

```
AI Studio Photo Docs v1.0 → vs_xxxxx1
AI Studio Photo Docs v2.0 → vs_xxxxx2
AI Studio Photo Docs v3.0 → vs_xxxxx3
```

Basculez en changeant `VSTORE_ID` dans `.env`.

---

## 📊 Monitoring

### Utilisation des tokens

Le Vector Store consomme des tokens lors de :

1. **Indexation initiale** : Coût unique à la création
2. **Requêtes file_search** : Coût à chaque question posée

Consultez votre usage : https://platform.openai.com/usage

---

### Métriques

OpenAI affiche :

- **Nombre de fichiers** indexés
- **Taille totale** du Vector Store
- **Statut** (Active, Processing, etc.)

---

## 🧪 Tester votre Vector Store

### Test manuel (via Playground)

1. Allez sur https://platform.openai.com/playground
2. Sélectionnez le modèle `gpt-4o-mini`
3. Activez l'outil **"File search"**
4. Sélectionnez votre Vector Store
5. Posez une question basée sur votre doc

**Exemple :**
```
User: Comment créer un compte ?
Assistant: [Réponse basée sur votre documentation]
```

---

### Test via API (curl)

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "user",
        "content": "Comment fonctionne le service ?"
      }
    ],
    "tools": [
      {
        "type": "file_search",
        "file_search": {
          "vector_store_ids": ["vs_xxxxxxxxxxxxxxxxxxxxxxxx"]
        }
      }
    ],
    "temperature": 0.2
  }'
```

---

### Test via votre chatbot

Une fois `VSTORE_ID` configuré :

```bash
curl -X POST http://localhost:8080/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"q":"Comment créer un compte ?"}'
```

**Réponse attendue :**
```json
{
  "answer": "Pour créer un compte, suivez ces étapes : ..."
}
```

Si vous obtenez `"Je ne sais pas."`, vérifiez que :
- Le Vector Store est bien indexé
- La réponse existe dans votre documentation
- Le `VSTORE_ID` est correct

---

## 💰 Coûts

### Prix OpenAI (exemple 2024)

- **Indexation** : ~$0.10 par GB de texte
- **Storage** : ~$0.10 par GB par jour
- **Requêtes** : Coût standard du modèle + tokens file_search

### Estimation pour un petit projet

```
Documentation : 50 fichiers, ~10 MB
Indexation : ~$0.01 (une fois)
Storage : ~$0.003 par jour
Requêtes : ~$0.001 par question (gpt-4o-mini)
```

**Total mensuel** : ~$0.10 + coût des requêtes

---

## 🔄 Migration et backup

### Exporter votre Vector Store

⚠️ **OpenAI ne permet pas l'export direct**

**Solution :** Conservez une copie locale de vos fichiers :

```
docs/
├── backup/
│   ├── 2024-01-15/
│   │   ├── file1.md
│   │   └── file2.md
│   └── 2024-02-20/
│       ├── file1.md
│       └── file3.md
└── current/
    ├── file1.md
    ├── file2.md
    └── file3.md
```

---

### Recréer un Vector Store

En cas de problème :

1. Créez un nouveau Vector Store
2. Ré-uploadez vos fichiers depuis votre backup
3. Mettez à jour `VSTORE_ID` dans `.env`
4. Redémarrez le backend

---

## 📚 Exemple de documentation

### Structure type pour un SaaS

```
docs/
├── 01-welcome.md              # Introduction
├── 02-getting-started.md      # Guide de démarrage
├── 03-features.md             # Liste des fonctionnalités
├── 04-pricing.md              # Tarifs
├── 05-account-management.md   # Gestion de compte
├── 06-api-documentation.md    # API (si applicable)
├── 07-faq.md                  # Questions fréquentes
├── 08-troubleshooting.md      # Dépannage
└── 09-contact.md              # Contact support
```

---

### Exemple de contenu (FAQ)

**faq.md :**

```markdown
# Questions Fréquentes

## Compte et Authentification

### Comment créer un compte ?

Pour créer un compte sur AI Studio Photo :
1. Cliquez sur "S'inscrire" en haut à droite
2. Remplissez le formulaire avec votre email
3. Vérifiez votre email et cliquez sur le lien de confirmation
4. Votre compte est créé !

### J'ai oublié mon mot de passe

Pour réinitialiser votre mot de passe :
1. Allez sur la page de connexion
2. Cliquez sur "Mot de passe oublié ?"
3. Entrez votre email
4. Suivez les instructions reçues par email

## Tarification

### Quels sont vos tarifs ?

Nous proposons 3 plans :
- **Gratuit** : 10 photos par mois
- **Pro** : 100 photos par mois - 9,99€/mois
- **Business** : Illimité - 29,99€/mois

### Puis-je changer de plan ?

Oui, vous pouvez upgrader ou downgrader à tout moment depuis votre espace compte.

## Support

### Comment vous contacter ?

Vous pouvez nous contacter via :
- Email : support@aistudiophoto.com
- Chat : Disponible 7j/7
- Téléphone : +33 1 23 45 67 89 (lun-ven, 9h-18h)
```

---

## 🎯 Checklist finale

Avant de mettre en production :

- [ ] Vector Store créé sur OpenAI
- [ ] Documentation uploadée et indexée (statut "Completed")
- [ ] `VSTORE_ID` copié dans `backend/.env`
- [ ] Tests effectués (Playground + API + Chatbot)
- [ ] Backup local de la documentation créé
- [ ] Coûts estimés et validés
- [ ] Documentation structurée et optimisée

---

## 📞 Ressources

- **OpenAI Storage** : https://platform.openai.com/storage
- **API Reference** : https://platform.openai.com/docs/api-reference/vector-stores
- **File Search Guide** : https://platform.openai.com/docs/assistants/tools/file-search
- **Pricing** : https://openai.com/api/pricing/

---

**Votre Vector Store est maintenant prêt ! 🎉**
