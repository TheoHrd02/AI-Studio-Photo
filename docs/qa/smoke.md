# Smoke Test Checklist

**Objectif :** Valider les régressions avant merge sur `refactor/code-quality-phase-1`.

**Prérequis :** Backend et frontend démarrés (`docker-compose up` ou `make dev`).

---

## 1. Build & Lint

| # | Action | Commande | Attendu |
|---|--------|----------|---------|
| 1.1 | Build frontend | `cd frontend && pnpm run build` | Build OK, pas d'erreur |
| 1.2 | Lint frontend | `cd frontend && pnpm lint` | 0 erreurs |
| 1.3 | Typecheck frontend | `cd frontend && pnpm typecheck` | 0 erreurs |
| 1.4 | Check unifié | `make check` | Tous les checks passent |

---

## 2. Pages principales

| # | Page | URL | Vérifications |
|---|------|-----|---------------|
| 2.1 | Landing | `http://localhost:3000/` | Hero visible, vidéo carousel, sections (Features, How it works, CTA) |
| 2.2 | Studio Virtuel | `http://localhost:3000/features/studio-virtuel` | Hero, before/after, benefits, steps, quotes |
| 2.3 | Mannequin Virtuel | `http://localhost:3000/features/mannequin-virtuel` | Même structure que Studio Virtuel |
| 2.4 | Motion Studio | `http://localhost:3000/features/motion-studio` | Même structure |

| # | Page | URL | Vérifications |
|---|------|-----|---------------|
| 2.5 | Pricing | `http://localhost:3000/pricing` | Plans, toggle annuel/mensuel, CTA |
| 2.6 | Gallery | `http://localhost:3000/gallery` | Grille images/vidéos |
| 2.7 | Blog | `http://localhost:3000/blog` | Page affichée |
| 2.8 | Help | `http://localhost:3000/help` | Chatbot visible, questions suggérées |

---

## 3. Chatbot

| # | Action | Attendu |
|---|--------|---------|
| 3.1 | Ouvrir `/help` | Interface chatbot visible |
| 3.2 | Poser une question suggérée | Réponse du bot |
| 3.3 | Poser une question libre | Réponse ou message d'erreur gracieux |
| 3.4 | Backend health | `curl http://localhost:8080/health` → `{"status":"ok"}` |

---

## 4. Navigation & Layout

| # | Vérification | Attendu |
|---|--------------|---------|
| 4.1 | Header (desktop) | Logo, menu Fonctionnalités (dropdown), Gallery, Pricing, Help, CTA |
| 4.2 | Header (mobile) | Menu hamburger, navigation dépliable |
| 4.3 | Footer | Liens, copyright |

---

## 5. Critères de sortie

- [ ] Build OK
- [ ] Lint OK
- [ ] Typecheck OK
- [ ] Pages principales chargent sans erreur
- [ ] Chatbot répond ou erreur gracieuse
- [ ] Navigation fonctionnelle

---

## Exécution rapide

```bash
# 1. Check unifié (lint + typecheck + build)
# Windows :
check.bat
# Linux/macOS :
make check
# Ou manuellement :
# cd backend && go build ./...
# cd frontend && pnpm check

# 2. Démarrer les services
docker-compose up -d

# 3. Tests manuels des pages (ouvrir dans le navigateur)
# http://localhost:3000
# http://localhost:3000/features/studio-virtuel
# http://localhost:3000/pricing
# http://localhost:3000/help

# 4. Test chatbot API (optionnel)
./backend/chatbot_test.sh
```

---

## Dépannage

| Problème | Solution |
|----------|----------|
| Build Nuxt échoue (route-rules.mjs) | Workaround appliqué dans nuxt.config (plugin Vite). Si réapparaît : `npx nuxi cleanup` puis `pnpm run build` |
| `make` introuvable (Windows) | Utiliser `check.bat` ou exécuter manuellement : `cd backend && go build ./...` puis `cd frontend && pnpm check` |
