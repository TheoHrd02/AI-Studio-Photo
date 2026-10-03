# État du projet — octobre 2026

Audit puis remise au propre du site vitrine (branche `claude/saas-site-audit-732222`, basée sur
`refactor/code-quality-phase-1`). Le code est prêt ; il reste surtout du **contenu** et quelques **actions manuelles**.

## Ce qui a été fait

| Domaine | Résumé |
|---------|--------|
| **Bloquants corrigés** | Le site ne s'hydratait pas en prod (CSP bloquait les scripts inline de Nuxt) → nonce par requête. Clés i18n affichées en brut (`/features`, footer). Lint en échec. Le script `typecheck` ne vérifiait aucun fichier (~20 erreurs cachées). |
| **Chatbot** | L'Assistants API d'OpenAI est arrêtée depuis le 26/08/2026 : le chatbot ne fonctionnait plus (et le masquait). Réécrit en route Nuxt (`/api/ask`, Responses API + file_search sur le même vector store), vrais codes d'erreur, `store: false`, limite 15/min/IP non contournable, plafond journalier. **Backend Go supprimé.** |
| **Légal** | Mentions légales, confidentialité, CGU, cookies (squelettes, champs à compléter surlignés). Contact → `/help#contact`. |
| **i18n** | `@nuxtjs/i18n`, 5 langues (fr, en, de, it, es), URLs préfixées, sélecteur de langue, hreflang, tout le texte en dur extrait. de/it/es traduits automatiquement. |
| **SEO** | Open Graph/Twitter par page (`usePageSeo`), og:locale, canonical, JSON-LD (Organization + logo, SoftwareApplication, tarifs sans « InStock »), sitemap par langue, robots, 404 traduite, `<h1>` partout, favicon/apple-touch/manifest, blog vide en noindex. |
| **RGPD / perf** | Police Inter auto-hébergée (avant : chargée depuis Google… et jamais appliquée). Icônes embarquées (plus d'appel à Iconify). CSP limitée au domaine. |
| **Déploiement** | Docker Compose prod = Caddy (HTTPS auto, www→domaine, cache assets) + Nuxt non exposé, conteneur non-root, healthcheck. Testé en local. Voir `docs/DEPLOY.md`. |
| **CI** | `.github/workflows/ci.yml` : lint, contrôle i18n, typecheck, build + build de l'image Docker. |
| **Dépendances** | pnpm 10, Node 24, Nuxt 4.5, Nuxt UI 4.11… Audit : 115 → 3 vulnérabilités (outils de build/dev uniquement, pas de correctif publié). Retirés : `@vueuse/*` (cassait le rendu), `@nuxt/image`, `nuxt-site-config` (inutilisés). |
| **Ménage** | ~150 clés i18n, 7 composants, 3 configs, 61 Mo de vidéos et ~20 docs obsolètes supprimés. README réécrit. |

## À faire avant la mise en ligne

### Actions manuelles (toi)

1. **Relire puis fusionner** la branche dans `main` et pousser (rien n'a été poussé).
2. **OpenAI** : dans `.env`, `NUXT_OPENAI_API_KEY` + `NUXT_OPENAI_VECTOR_STORE_ID` (l'ancien `VSTORE_ID` de
   `backend/.env`, qui reste sur ton disque hors git). **Mettre une limite de budget** sur le projet OpenAI.
   Tester une vraie question sur `/help` (non testé : nécessite la clé).
3. **VPS** : DNS de `aistudiophoto.com` et `www` → VPS, ports 80/443, puis `docs/DEPLOY.md`.
4. Activer la **protection de branche** `main` sur GitHub (CI obligatoire) si souhaité.

### Contenu

- **Pages légales** : compléter les champs `[…]` (raison sociale, adresse, immatriculation, hébergeur, dates…)
  dans `legal.*` des 5 fichiers `i18n/locales/*.json`, et faire relire (traductions automatiques).
- **Traductions de/it/es** : relecture par un natif, surtout le marketing.
- Avantage tarifs « Interface 100 % en français » (`pricing.perks.frenchInterface`) : n'a pas de sens hors FR.
- FAQ « langue du support » (`help.faq.language`) : à ajuster selon le support réel.
- Images/vidéos provisoires (Unsplash, Pexels) dans `config/visual-proof.config.ts` ; leurs textes `alt`
  sont en français en dur → les passer en clés i18n quand le contenu final arrive.
- `public/og-image.png` (image de partage) : visuel provisoire à remplacer (1200×630).
- Liens du footer encore en `#` : API, Changelog, Documentation, Tutoriels, À propos, Affiliation,
  Carrières, réseaux sociaux (`config/site.config.ts`, `AppFooter.vue`).
- URLs du SaaS (`config/saas.config.ts`) et lien Calendly entreprise à confirmer.
- Blog : quand il y aura des articles, retirer `noindex` (`pages/blog.vue`) et l'exclusion dans `config/sitemap-urls.ts`.
- Engagements de la page Aide (« réponse sous 24h », « 7j/7 ») à valider.

## Limites connues (choix assumés)

- Limites du chatbot en mémoire : valables pour **une instance**. Plusieurs instances → Redis.
- CSP à nonce : SSR obligatoire (`nuxt generate` impossible sans adaptation).
- Les adresses des pages restent en français dans toutes les langues (`/de/mentions-legales`) ; traduisibles
  via `customRoutes` de `@nuxtjs/i18n` si besoin.
- Pas de redirection automatique selon la langue du navigateur (pour ne poser aucun cookie).
- La CSS de Nuxt UI n'est pas importée : seul `UIcon` est utilisé. Importer `@import "@nuxt/ui";` dans
  `assets/css/main.css` avant d'utiliser d'autres composants Nuxt UI (sinon ils s'affichent mal).
- `plugins/payload-context.server.ts` : contournement d'un ancien bug Nuxt conservé faute de pouvoir le reproduire.
- Sur des écrans très bas (< 600 px de haut), le titre du hero passe sous le header (design existant).

## Ménage Git (non fait, à ta main)

Rien n'a été supprimé côté Git. Commandes suggérées, à vérifier avant exécution :

```bash
# Branche i18n déjà fusionnée dans main
git branch -d i18n && git push origin --delete i18n
# 3 worktrees Cursor cassés (pointent vers l'ancien chemin du projet)
git worktree prune
git branch -D 2025-10-29-04ov-bOTqO 2025-10-29-p80g-mWFF8 2025-10-29-ygfi-K21HV
# 3 stashes périmés (suppression de docs / go.mod / frontend_original) — irréversible
git stash list
git stash clear
```

Dans le dossier principal du projet : supprimer `frontend/node_modules` (liens vers l'ancien chemin) puis `pnpm install`,
et `backend/` (dossier local non suivi, après avoir récupéré la clé OpenAI).
