# Mission 2 — Artifact Review : Lint / Format / Typecheck

## Résumé

| Outil | Config | Script | Statut |
|-------|--------|--------|---------|
| ESLint | eslint.config.mjs, nuxt.config (stylistic) | lint, lint:fix, format | ✅ 0 erreurs |
| Typecheck | vue-tsc (tsconfig Nuxt) | typecheck | ✅ OK |
| Prettier | Non utilisé | — | ESLint Stylistic à la place |

## Fichiers livrés

- `frontend/eslint.config.mjs` — Flat config avec withNuxt()
- `frontend/nuxt.config.ts` — Module @nuxt/eslint, stylistic: true
- `frontend/package.json` — Scripts lint, lint:fix, format, typecheck

## Warnings restants (non bloquants)

| Fichier | Règle | Message |
|---------|-------|---------|
| FeaturePageTemplate.vue:188 | vue/no-v-html | v-html peut mener à XSS |
| FeatureSection.vue:29 | vue/no-v-html | v-html peut mener à XSS |

**Note :** v-html est utilisé pour du contenu Markdown/HTML contrôlé (i18n). À auditer si le contenu provient d’une source utilisateur.

## Commandes

```bash
pnpm lint        # Vérifier
pnpm lint:fix    # Corriger auto
pnpm format      # Alias de lint:fix
pnpm typecheck   # Vérifier les types
```

## Dépendances ajoutées

- @nuxt/eslint ^1.15.1
- eslint ^10.0.1
- vue-tsc ^3.2.5
