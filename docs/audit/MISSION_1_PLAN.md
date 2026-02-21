# Mission 1 — Plan : Normaliser package manager (pnpm only)

## Objectif
Rendre l'installation reproductible avec **pnpm uniquement**, supprimer bun.lock et package-lock.json.

## Fichiers impactés

| Fichier | Action |
|---------|--------|
| `frontend/package.json` | Ajouter `packageManager`, `engines` |
| `frontend/.npmrc` | Créer (engine-strict) |
| `frontend/bun.lock` | **Supprimer** |
| `frontend/package-lock.json` | **Supprimer** |
| `frontend/pnpm-lock.yaml` | **Créer** (via `pnpm install`) |
| `frontend/Dockerfile` | Remplacer bun par Node + pnpm |
| `frontend/README.md` | Réécrire en pnpm only |
| `docs/audit/PNPM_ONLY.md` | Créer (doc standard) |
| `README.md` (root) | Mettre à jour section frontend (optionnel, boilerplate) |
| `.gitignore` | Aucun changement (lockfiles non ignorés) |

## Ordre d'exécution

1. Modifier package.json (packageManager + engines)
2. Créer .npmrc
3. Supprimer bun.lock, package-lock.json
4. Exécuter `pnpm install` → génère pnpm-lock.yaml
5. Modifier frontend/Dockerfile
6. Réécrire frontend/README.md
7. Créer docs/audit/PNPM_ONLY.md
8. Commits incrémentaux
