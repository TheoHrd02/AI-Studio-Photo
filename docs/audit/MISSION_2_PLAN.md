# Mission 2 — Plan : Lint / Format / Typecheck Frontend

## Objectif
Ajouter des garde-fous qualité (ESLint, format, typecheck) sans casser le build.

## Choix d'outils

| Outil | Choix | Justification |
|-------|-------|---------------|
| Lint | @nuxt/eslint | Intégration officielle Nuxt 4, flat config, Vue/TS |
| Format | ESLint Stylistic | Intégré au module, pas de conflit Prettier/ESLint |
| Typecheck | vue-tsc | Standard Vue/Nuxt, utilise tsconfig Nuxt |

## Fichiers impactés

| Fichier | Action |
|---------|--------|
| `frontend/package.json` | + scripts lint, lint:fix, format, typecheck |
| `frontend/nuxt.config.ts` | + module @nuxt/eslint, stylistic |
| `frontend/eslint.config.mjs` | Créé (withNuxt) |
| `frontend/.prettierrc` | Non utilisé (ESLint Stylistic) |

## Règles minimales
- Config par défaut @nuxt/eslint (recommandé)
- stylistic: true pour le format
- Pas de règles custom strictes au démarrage

## Ordre d'exécution
1. Installer @nuxt/eslint, eslint
2. Ajouter module + stylistic dans nuxt.config
3. nuxt prepare → génère .nuxt/eslint.config.mjs
4. Créer eslint.config.mjs
5. Installer vue-tsc
6. Ajouter scripts package.json
7. Exécuter lint/typecheck, corriger uniquement erreurs auto-fixables bloquantes
