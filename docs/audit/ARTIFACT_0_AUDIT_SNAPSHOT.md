# Artifact 0 — Audit Snapshot (Phase 0)

**Projet:** AI-Studio-Photo  
**Date:** 2025-02-21  
**Phase:** Reconnaissance (sans modifications)  
**Contexte:** Marketing Website SaaS (site vitrine), stateless, Nuxt 4 + Go (Gin)

---

## 1. Cartographie du repo

### 1.1 Arborescence (max depth 4, hors .git/node_modules/.nuxt)

```
.
├── backend/
│   ├── cmd/main.go              # Entrypoint Go
│   ├── internal/
│   │   ├── handlers/chatbot_handler.go
│   │   ├── middleware/          # cors, maxbody, ratelimit, timeout
│   │   ├── services/openai_service.go
│   │   ├── config/              # (dossier vide — boilerplate)
│   │   ├── database/            # (dossier vide — boilerplate)
│   │   ├── models/              # (dossier vide — boilerplate)
│   │   └── repositories/        # (dossier vide — boilerplate)
│   ├── migrations/              # (présent dans README, non vérifié)
│   ├── tmp/                     # binaire compilé (gitignore)
│   ├── Dockerfile
│   ├── .air.toml
│   ├── .dockerignore
│   └── .env.example
├── frontend/
│   ├── app.vue
│   ├── nuxt.config.ts
│   ├── pages/                   # index, pricing, features/*, support, etc.
│   ├── components/             # marketing/, features/, common/
│   ├── composables/            # useChatbot, useTranslation, useI18n, useReveal
│   ├── config/                 # site, saas, theme, trust, demo, visual-proof
│   ├── layouts/marketing.vue
│   ├── locales/                # en.json, fr.json
│   ├── plugins/translation.ts
│   ├── assets/css/main.css
│   ├── Dockerfile
│   └── .env.example
├── docker/
│   └── postgres/init.sql
├── docker-compose.yml
├── .gitignore
├── .env.example                 # vide
└── README.md                    # boilerplate générique (nuxt-go-boilerplate)
```

### 1.2 Entrypoints

| Composant | Entrypoint | Port |
|-----------|------------|------|
| Backend Go | `backend/cmd/main.go` | 8080 |
| Frontend Nuxt | `frontend/` (Nuxt dev/build) | 3000 |
| Docker dev | `docker-compose up` | 3000, 8080 |

### 1.3 Dépendances clés

**Frontend (package.json):**
- `nuxt` ^4.1.3
- `vue` ^3.5.22
- `@nuxt/ui` 4.0.1
- `@nuxt/image` 1.11.0
- `@pinia/nuxt` ^0.11.2
- `typescript` ^5.6.3
- Pas de `eslint`, `vitest`, `prettier` dans package.json (présents via lockfile transitivement)

**Backend (go.mod):**
- `github.com/gin-gonic/gin` v1.11.0
- `github.com/joho/godotenv` v1.5.1
- `golang.org/x/time/rate` (ratelimit)
- Go 1.25

---

## 2. Inventaire de la toolchain

### 2.1 Scripts package.json (frontend)

| Script | Commande | Présent |
|--------|----------|---------|
| build | `nuxt build` | ✅ |
| dev | `nuxt dev` | ✅ |
| generate | `nuxt generate` | ✅ |
| preview | `nuxt preview` | ✅ |
| postinstall | `nuxt prepare` | ✅ |
| **lint** | — | ❌ |
| **test** | — | ❌ |
| **audit** | — | ❌ |
| **format** | — | ❌ |

### 2.2 Backend

- **Build:** `go build -o ./tmp/main ./cmd/main.go` (via Air)
- **Tests:** Aucun fichier `*_test.go` trouvé
- **Lint:** Aucun `golangci-lint` ou équivalent configuré
- **Hot-reload:** Air (`.air.toml`)

### 2.3 CI/CD

- **Aucun pipeline CI** (pas de `.github/workflows/`, pas de GitLab CI, etc.)
- Pas de checks bloquants sur PR/merge

### 2.4 Docker

- `docker-compose.yml` : backend + frontend (pas de db dans le compose actuel)
- Backend : `env_file: ./backend/.env`
- Frontend : variables d’environnement inline
- Dockerfiles : dev uniquement (pas de stage production multi-stage)

---

## 3. Risques immédiats

### 3.1 Secrets & variables d’environnement

| Risque | Niveau | Détail |
|--------|--------|--------|
| `.env` dans .gitignore | ✅ OK | `.env` et `*.env` ignorés, `!.env.example` autorisé |
| `.env.example` root vide | ⚠️ | Fichier vide, pas de template central |
| `backend/.env` monté via env_file | ⚠️ | Si `.env` est créé localement, risque de commit accidentel. `.dockerignore` exclut `.env` → OK pour build image |
| Placeholders dans docs | ⚠️ | `OPENAI_API_KEY=sk-your-openai-api-key` dans `.env.example` — format explicite, pas de vraie clé |
| Pas de validation au démarrage | ⚠️ | Backend ne refuse pas de démarrer sans `OPENAI_API_KEY` (retourne erreur à la requête) |

### 3.2 Scripts dangereux

- Aucun script shell/powershell destructif identifié
- `backend/chatbot_test.sh` et `chatbot_test.ps1` : scripts de test manuels (curl), non destructifs

### 3.3 Dépendances

- **npm audit / pnpm audit / bun audit :** Non exécuté (à faire manuellement)
- **govulncheck :** Non vérifié pour Go
- **Lockfiles :** `bun.lock` et `package-lock.json` présents → incohérence de gestionnaire (bun vs npm)

### 3.4 CSP (Content-Security-Policy)

- Headers de sécurité activés **uniquement en production** (`NODE_ENV === 'production'`)
- `connect-src`: `'self' https://*.aistudiophoto.com https://api.iconify.design`
- En dev, pas de CSP → HMR/Vite fonctionne
- En prod, l’API backend doit être sous `https://*.aistudiophoto.com` pour respecter la CSP

---

## 4. Zones chaudes (complexité / churn)

### 4.1 Fichiers à forte complexité ou responsabilité

| Fichier | Raison |
|---------|--------|
| `backend/internal/services/openai_service.go` | ~300 lignes, logique métier OpenAI, gestion d’erreurs, polling |
| `frontend/components/FeaturePageTemplate.vue` | ~430+ lignes, template réutilisable avec beaucoup de props |
| `frontend/pages/index.vue` | Page d’accueil, nombreuses sections, i18n |
| `frontend/nuxt.config.ts` | Config Nuxt + headers sécurité + runtime |
| `frontend/locales/en.json`, `fr.json` | ~689 lignes chacun, risque de duplication |

### 4.2 Dossiers vides ou legacy

- `backend/internal/config/`, `database/`, `models/`, `repositories/` : structure issue du README boilerplate, probablement vide ou non utilisée
- README décrit PostgreSQL, JWT, migrations — **non aligné** avec le produit actuel (stateless, pas d’auth)

### 4.3 Incohérences produit vs docs

- README : boilerplate `nuxt-go-boilerplate` avec auth, DB, migrations
- Produit réel : site vitrine + chatbot, pas d’auth, pas de DB
- Risque de confusion pour les contributeurs

---

## 5. Commandes terminal proposées (à valider manuellement)

```bash
# Vérifications Git
git status && git rev-parse --show-toplevel

# Arborescence
find . -maxdepth 4 -type d -not -path './.git*' -not -path './.cursor*' -not -path './frontend/.nuxt*' -not -path './frontend/node_modules*' | sort

# Frontend
cd frontend && (pnpm -v || npm -v || bun -v)
cd frontend && npm run build    # ou pnpm build / bun run build
cd frontend && npm audit        # ou pnpm audit

# Backend
cd backend && go version && go list ./...
cd backend && go build -o ./tmp/main ./cmd/main.go
cd backend && go test ./...    # (aucun test actuellement)

# Vulnérabilités Go (si installé)
govulncheck ./...
```

---

## 6. Synthèse Phase 0

| Catégorie | État | Priorité |
|-----------|------|----------|
| Structure repo | ✅ Claire (backend/frontend) | — |
| Entrypoints | ✅ Identifiés | — |
| Lint | ❌ Absent (frontend + backend) | Haute |
| Tests | ❌ Absents | Haute |
| CI | ❌ Absente | Haute |
| Secrets | ⚠️ Gérés correctement (.gitignore, .dockerignore) | Moyenne |
| Lockfiles | ⚠️ bun + npm (incohérence) | Moyenne |
| Documentation | ⚠️ README obsolète vs produit | Moyenne |
| CSP / headers | ✅ Configurés en prod | — |

---

**Prochaine étape :** Phase 1 — Rapport d’audit priorisé (Code Quality Report) avec scores A/B/C/D, Top 10 problèmes, Quick wins, et recommandations.
