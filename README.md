# Glint Studio — site vitrine

Site marketing du SaaS Glint Studio (nom interne : AI Studio Photo ; l'application elle-même vit dans un autre dépôt).
Nuxt 4 en SSR, 5 langues, chatbot de support, déployé en Docker derrière le Caddy de l'app, sur sa VM.

## Stack

- **Nuxt 4** (SSR) + Vue 3, **Tailwind CSS 4**, **Nuxt UI 4** (icônes, polices auto-hébergées)
- **@nuxtjs/i18n** : `fr` (défaut, à la racine), `en`, `de`, `it`, `es` (préfixes `/en`, `/de`…)
- **@nuxtjs/sitemap** : un sitemap par langue avec alternates hreflang (`/sitemap_index.xml`)
- **@nuxt/content** : blog en Markdown (`frontend/content/blog/{langue}/`), guide de rédaction `docs/BLOG.md`
- **Chatbot** : route serveur Nuxt `/api/ask` → Claude Haiku (SDK Anthropic), documentation dans `frontend/server/assets/support-docs.md`
- **pnpm** uniquement (version fixée par `packageManager`), Node ≥ 22.5 (SQLite natif de Nuxt Content ; 24 en CI/Docker)

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
| `server/api/ask.post.ts` | Chatbot : validation, plafonds de coût (par IP, par jour, par mois), appel Claude |
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

Variables serveur (voir `frontend/.env.example`) : `NUXT_ANTHROPIC_API_KEY`, optionnelles `NUXT_ANTHROPIC_MODEL`
(Haiku uniquement, défaut `claude-haiku-4-5`), `NUXT_CHAT_DAILY_LIMIT` (défaut 200) et `NUXT_CHAT_MONTHLY_LIMIT`
(défaut 1000).
Le chatbot répond uniquement à partir de `frontend/server/assets/support-docs.md` (Markdown, envoyé en entier comme
contexte, mis en cache par l'API au-delà d'environ 4 000 tokens) : modifier ce fichier puis redéployer.

**Plafonds de coût** (`server/api/ask.post.ts`) : une question par appel, sans historique, modèle ni `max_tokens` venant
du navigateur ; corps ≤ 8 Ko, question ≤ 1 000 caractères, réponse ≤ 400 tokens ; 15 questions/min et 30/h par IP ;
plafonds globaux de 200 questions par jour et 1 000 par mois (UTC, échecs compris, 0 = chatbot coupé) ; sans clé, 503.
Au tarif de Haiku 4.5 et avec la doc actuelle (≈ 5 Ko, coût qui grandit avec elle), une question coûte au plus
≈ 0,5 centime : le plafond mensuel de 1 000 questions reste sous 5 $.
Ces compteurs sont **en mémoire** (une seule instance) : un redémarrage ou un redéploiement les remet à zéro. Le vrai
garde-fou est donc côté Anthropic : clé dédiée à la vitrine, créée dans un **workspace dédié** doté d'une **limite de
dépense mensuelle** (par exemple 5 $) ; au-delà, l'API refuse et le chatbot affiche « indisponible ».

## Déploiement

Production sur la VM de l'application, derrière son Caddy : image publiée par un tag `v*`
(`.github/workflows/release.yml`, `ghcr.io/theohrd02/glint/vitrine`), tirée par empreinte. Voir
**[docs/DEPLOY.md](docs/DEPLOY.md)**, qui renvoie à la procédure du runbook de l'app.

```bash
git tag v1.0.0 && git push origin v1.0.0
```

## Docs

- [docs/DEPLOY.md](docs/DEPLOY.md) — mise en production
- [docs/STATUS.md](docs/STATUS.md) — état du projet, ce qui reste à faire
- [docs/design/](docs/design/) — règles de design (CTA, fonds de sections, réassurance pré-lancement)
