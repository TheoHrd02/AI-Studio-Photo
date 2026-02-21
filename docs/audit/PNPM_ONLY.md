# Politique — pnpm uniquement

Ce projet utilise **pnpm** comme gestionnaire de paquets pour le frontend.

## Pourquoi pnpm ?

- Installation reproductible via `pnpm-lock.yaml`
- Stockage dédupliqué des dépendances (économie disque)
- Vérification d’intégrité stricte des paquets

## Installation

```bash
# Option 1 : Corepack (Node 16.13+)
corepack enable
pnpm install

# Option 2 : Installation globale
npm install -g pnpm
pnpm install
```

## Commandes

| Action | Commande |
|--------|----------|
| Installer | `pnpm install` |
| Dev | `pnpm dev` |
| Build | `pnpm build` |
| Preview | `pnpm preview` |
| Audit | `pnpm audit` |

## Fichiers de configuration

- `frontend/package.json` : champ `packageManager: "pnpm@9.15.0"` (Corepack)
- `frontend/.npmrc` : `engine-strict=true` (respect des engines)
- `frontend/pnpm-lock.yaml` : lockfile unique (commité)

## Lockfiles interdits

Les fichiers suivants sont ignorés par Git (`.gitignore`) et ne doivent **pas** être committés :

- `bun.lock`
- `package-lock.json`
- `yarn.lock`

En cas de présence, les supprimer et exécuter `pnpm install` pour régénérer `pnpm-lock.yaml`.
