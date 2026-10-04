# Glint Studio — site vitrine

Site marketing du SaaS Glint Studio (nom interne : AI Studio Photo ; l'application elle-même vit dans un autre dépôt).
Nuxt 4 en SSR, 5 langues, chatbot de support, déployé en Docker derrière Caddy sur un VPS.

## Stack

- **Nuxt 4** (SSR) + Vue 3, **Tailwind CSS 4**, **Nuxt UI 4** (icônes, polices auto-hébergées)
- **@nuxtjs/i18n** : `fr` (défaut, à la racine), `en`, `de`, `it`, `es` (préfixes `/en`, `/de`…)
- **@nuxtjs/sitemap** : un sitemap par langue avec alternates hreflang (`/sitemap_index.xml`)
- **Chatbot** : route serveur Nuxt `/api/ask` → Claude Haiku (SDK Anthropic), documentation dans `frontend/server/assets/support-docs.md`
- **pnpm** uniquement (version fixée par `packageManager`), Node ≥ 20 (24 en CI/Docker)

## Démarrage

```bash
cd frontend
cp .env.example .env   # clé Anthropic optionnelle en dev (sans elle, le chatbot répond 503)
pnpm install
pnpm dev               # http://localhost:3000
```

Avant de pousser : `pnpm check` (lint + typecheck + build), aussi lancé par la CI GitHub Actions
(`.github/workflows/ci.yml`, qui construit aussi l'image Docker de prod).

## Structure (`frontend/`)

| Chemin | Rôle |
|--------|------|
| `pages/` | Accueil, `features/*`, galerie, aide (chatbot + contact), blog, pages légales |
| `components/marketing/` | Header, footer et sections de la page d'accueil |
| `components/common/` | `CTAButton`, `LanguageSelect`, `LegalPage`… |
| `config/` | Navigation/footer (`site.config`), URLs du SaaS (`saas.config`), médias (`hero`, `visual-proof`), limites (`app-limits`) |
| `i18n/locales/*.json` | Tous les textes, dans les 5 langues (même structure de clés) |
| `server/api/ask.post.ts` | Chatbot : validation, limites (15/min/IP + plafond journalier), appel Claude |
| `server/assets/support-docs.md` | Base de connaissances du chatbot (envoyée à Claude à chaque question) |
| `server/plugins/csp.ts` | Content-Security-Policy avec nonce par requête |
| `composables/usePageSeo.ts` | Titre, description, Open Graph/Twitter d'une page |
| `app.vue` | `lang`, hreflang, canonical, `og:*` globaux, JSON-LD |
| `error.vue` | Page 404 / erreur traduite |

## Textes et traductions

- Ajouter un texte : créer la clé dans **les 5 fichiers** `i18n/locales/*.json`, l'utiliser avec `$t('cle')` / `t('cle')`.
- Ne pas mettre `@`, `{`, `}` ou `|` dans un texte (syntaxe vue-i18n) ; pour un email, passer un paramètre (`{email}`).
- Pages légales : texte dans `legal.*` avec un mini-format (ligne vide = paragraphe, `- ` = liste, `**gras**`,
  `[champ]` = surligné en jaune « à compléter »).
- Nouvelle page : appeler `usePageSeo(() => ({ title, description }))` ; l'ajouter à la nav/footer dans `config/site.config.ts`
  pour qu'elle entre dans le sitemap.

## Chatbot

Variables serveur (voir `.env.example`) : `NUXT_ANTHROPIC_API_KEY`, optionnelles `NUXT_ANTHROPIC_MODEL`
(défaut `claude-haiku-4-5`) et `NUXT_CHAT_DAILY_LIMIT` (défaut 500).
Le chatbot répond uniquement à partir de `frontend/server/assets/support-docs.md` (Markdown, envoyé en entier comme
contexte, mis en cache par l'API au-delà d'environ 4 000 tokens) : modifier ce fichier puis redéployer.
Mettre une limite de dépense dans la console Anthropic.

## Déploiement

Voir **[docs/DEPLOY.md](docs/DEPLOY.md)** (VPS, Docker Compose, Caddy/HTTPS, mise à jour).

```bash
cp .env.example .env && nano .env
docker compose -f docker-compose.prod.yml up -d --build
```

## Docs

- [docs/DEPLOY.md](docs/DEPLOY.md) — mise en production
- [docs/STATUS.md](docs/STATUS.md) — état du projet, ce qui reste à faire
- [docs/design/](docs/design/) — règles de design (CTA, fonds de sections, réassurance pré-lancement)
