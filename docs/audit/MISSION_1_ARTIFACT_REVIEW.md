# Mission 1 — Artifact Review : pnpm only

## Résumé des modifications

| Fichier | Action |
|---------|--------|
| `frontend/package.json` | + packageManager, engines |
| `frontend/.npmrc` | Créé (engine-strict) |
| `frontend/.dockerignore` | + exclusion lockfiles parasites |
| `frontend/Dockerfile` | bun → Node + pnpm |
| `frontend/README.md` | Réécrit (pnpm only) |
| `frontend/bun.lock` | Supprimé |
| `frontend/package-lock.json` | Supprimé |
| `frontend/pnpm-lock.yaml` | Créé (via pnpm install) |
| `.gitignore` | + exclusion lockfiles parasites |
| `docs/audit/PNPM_ONLY.md` | Créé |
| `docs/audit/MISSION_1_PLAN.md` | Créé |

## Commandes à rejouer (après clone)

```bash
# 1. Activer Corepack (Node 16.13+)
corepack enable

# 2. Installer les dépendances
cd frontend && pnpm install

# 3. Vérifier le build
pnpm build

# 4. Lancer le dev
pnpm dev
```

## Commandes Git proposées (commits incrémentaux)

```bash
# Commit 1 : package.json + .npmrc + lockfiles
git add frontend/package.json frontend/.npmrc frontend/pnpm-lock.yaml
git add frontend/bun.lock frontend/package-lock.json  # deletions
git commit -m "chore(frontend): standardiser sur pnpm (packageManager, engines, lockfile)"

# Commit 2 : Docker
git add frontend/Dockerfile frontend/.dockerignore
git commit -m "chore(docker): frontend Dockerfile pnpm (Node + Corepack)"

# Commit 3 : docs + gitignore
git add frontend/README.md .gitignore docs/audit/PNPM_ONLY.md docs/audit/MISSION_1_PLAN.md docs/audit/MISSION_1_ARTIFACT_REVIEW.md
git commit -m "docs: pnpm only policy, README install, gitignore lockfiles parasites"
```

## Vérifications post-migration

- [x] `pnpm install` réussit
- [ ] `pnpm build` — erreur `route-rules.mjs` (possible bug Nuxt 4 / Vite 7, à investiguer)
- [ ] `pnpm dev` démarre
- [ ] `docker-compose build frontend` réussit
- [x] Aucun `bun.lock` ni `package-lock.json` dans le repo
