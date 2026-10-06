# État du projet — octobre 2026

Audit puis remise au propre du site vitrine (branche `claude/saas-site-audit-732222`, basée sur
`refactor/code-quality-phase-1`). Le code est prêt ; il reste surtout du **contenu** et quelques **actions manuelles**.

## Ce qui a été fait

| Domaine | Résumé |
|---------|--------|
| **Bloquants corrigés** | Le site ne s'hydratait pas en prod (CSP bloquait les scripts inline de Nuxt) → nonce par requête. Clés i18n affichées en brut (`/features`, footer). Lint en échec. Le script `typecheck` ne vérifiait aucun fichier (~20 erreurs cachées). |
| **Chatbot** | L'Assistants API d'OpenAI est arrêtée depuis le 26/08/2026 : le chatbot ne fonctionnait plus (et le masquait). Réécrit en route Nuxt (`/api/ask`) sur **Claude Haiku 4.5** (SDK Anthropic), documentation dans `server/assets/support-docs.md` (contexte mis en cache), vrais codes d'erreur, limite 15/min/IP non contournable, plafond journalier. **Backend Go et dépendance OpenAI supprimés.** |
| **Légal** | Mentions légales, confidentialité, CGU, cookies (squelettes, champs à compléter surlignés). Contact → `/help#contact`. |
| **i18n** | `@nuxtjs/i18n`, 5 langues (fr, en, de, it, es), URLs préfixées, détection de la langue du navigateur (sur `/`, mémorisée par cookie), sélecteur de langue, hreflang, tout le texte en dur extrait. de/it/es traduits automatiquement. |
| **SEO** | Open Graph/Twitter par page (`usePageSeo`), og:locale, canonical, JSON-LD (Organization + logo, SoftwareApplication), sitemap par langue, robots, 404 traduite, `<h1>` partout, favicon/apple-touch/manifest, blog vide en noindex. |
| **Blog (SEO / GEO)** | Nuxt Content (Markdown dans `frontend/content/blog/{langue}/`), requêtes côté serveur uniquement (CSP intacte). Gabarit article : réponse directe, « L'essentiel », sommaire, FAQ, auteur, dates, encart produit, articles liés, JSON-LD `BlogPosting`/`BreadcrumbList`/`FAQPage`. hreflang et sitemap limités aux traductions existantes, `lastmod` réels (supprimés sur les pages statiques, où ils étaient faux). Script IndexNow. Guide : `docs/BLOG.md`, plan éditorial : `docs/BLOG-PLAN.md`. |
| **RGPD / perf** | Police Inter auto-hébergée (avant : chargée depuis Google… et jamais appliquée). Icônes embarquées (plus d'appel à Iconify). CSP limitée au domaine. |
| **Déploiement** | Docker Compose prod = Caddy (HTTPS auto, www→domaine, cache assets) + Nuxt non exposé, conteneur non-root, healthcheck. Testé en local. Voir `docs/DEPLOY.md`. |
| **CI** | `.github/workflows/ci.yml` : lint, contrôle i18n, typecheck, build + build de l'image Docker. |
| **Dépendances** | pnpm 10, Node 24, Nuxt 4.5, Nuxt UI 4.11… Audit : 115 → 3 vulnérabilités (outils de build/dev uniquement, pas de correctif publié). Retirés : `@vueuse/*` (cassait le rendu), `@nuxt/image`, `nuxt-site-config` (inutilisés). |
| **Ménage** | ~150 clés i18n, 7 composants, 3 configs, 61 Mo de vidéos et ~20 docs obsolètes supprimés. README réécrit. |

## À faire avant la mise en ligne

### Actions manuelles (toi)

1. **Relire puis fusionner** la branche dans `main` et pousser (rien n'a été poussé).
2. **Anthropic** : créer une clé sur console.anthropic.com, la mettre dans `.env` (`NUXT_ANTHROPIC_API_KEY`),
   **fixer une limite de dépense**. Tester une vraie question sur `/help` (non testé : nécessite la clé).
3. **Doc du chatbot** : `frontend/server/assets/support-docs.md` est une base de départ générée depuis le contenu
   du site. Y mettre la vraie documentation (l'ancienne était dans le vector store OpenAI : récupérer les fichiers
   sur platform.openai.com si besoin).
4. **VPS** : DNS de `glintstudio.ai` et `www` → VPS, ports 80/443, puis `docs/DEPLOY.md`.
5. Activer la **protection de branche** `main` sur GitHub (CI obligatoire) si souhaité.

### Contenu

- **Pages légales** : compléter les champs `[…]` (raison sociale, adresse, immatriculation, hébergeur, dates…)
  dans `legal.*` des 5 fichiers `i18n/locales/*.json`, et faire relire (traductions automatiques).
- **Traductions de/it/es** : relecture par un natif, surtout le marketing.
- FAQ « langue du support » (`help.faq.language`) : à ajuster selon le support réel.
- Images/vidéos provisoires (Unsplash, Pexels) dans `config/visual-proof.config.ts` ; leurs textes `alt`
  sont en français en dur → les passer en clés i18n quand le contenu final arrive.
- `public/og-image.png` (image de partage) : visuel provisoire « Glint Studio » à remplacer (1200×630).
- Liens du footer encore en `#` : API, Changelog, Documentation, Tutoriels, À propos, Affiliation,
  Carrières (`config/site.config.ts`). Liens réseaux sociaux retirés du footer.
- Lien Calendly entreprise à confirmer (`config/saas.config.ts`) ; l'app est sur `app.glintstudio.ai`.
- Page tarifs supprimée ; la doc du chatbot (`server/assets/support-docs.md`) contient encore une section « Tarifs ».
- Blog : relire le brouillon `frontend/content/blog/fr/photo-produit-fond-blanc.md` (TODO en tête : avant/après
  Glint, image de couverture, vérifications), puis `draft: false`. L'index du blog sort du `noindex` tout seul dès
  qu'un article est publié dans la langue. Compléter l'auteur (`config/blog.config.ts` : liens LinkedIn/site ;
  bio dans `blog.authors.theo` des 5 langues).
- Search Console + Bing Webmaster Tools : vérifier le domaine, soumettre le sitemap (`docs/BLOG.md`).
- Engagements de la page Aide (« réponse sous 24h », « 7j/7 ») à valider.

## Limites connues (choix assumés)

- Limites du chatbot en mémoire : valables pour **une instance**. Plusieurs instances → Redis.
- CSP à nonce : SSR obligatoire (`nuxt generate` impossible sans adaptation).
- Les adresses des pages restent en français dans toutes les langues (`/de/mentions-legales`) ; traduisibles
  via `customRoutes` de `@nuxtjs/i18n` si besoin.
- Détection de langue uniquement sur `/` (pas de `fallbackLocale`) : les robots sans `Accept-Language` restent sur FR. Pose le cookie fonctionnel `i18n_redirected` (documenté dans la politique cookies).
- La CSS de Nuxt UI n'est pas importée : seul `UIcon` est utilisé. Importer `@import "@nuxt/ui";` dans
  `assets/css/main.css` avant d'utiliser d'autres composants Nuxt UI (sinon ils s'affichent mal).
- `plugins/payload-context.server.ts` : contournement d'un ancien bug Nuxt conservé faute de pouvoir le reproduire.
- Sur des écrans très bas (< 600 px de haut), le titre du hero passe sous le header (design existant).

## Ménage Git (fait le 2026-10-03)

- Branches `i18n` et `refactor/code-quality-phase-1` (déjà fusionnées dans `main`) supprimées en local et sur GitHub.
- 3 worktrees Cursor cassés et leurs branches `2025-10-29-*` supprimés (vérifié avant : aucun travail unique,
  seulement un ancien essai de config i18n fr/en).
- 3 stashes périmés supprimés (suppressions de docs / `go.mod` / `frontend_original`, tout déjà dans l'historique).
- Le dossier principal du projet est sur `main`. Restent : `main` et la branche de cette PR (à supprimer après fusion).

Dans le dossier principal du projet, à faire toi-même : supprimer `frontend/node_modules` (liens vers l'ancien chemin) puis `pnpm install`,
et `backend/` (dossier local non suivi : contient encore une clé OpenAI, à révoquer si elle ne sert plus).
