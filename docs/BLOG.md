# Blog — guide de rédaction et de publication

But du blog : capter les recherches « comment faire… » des e-commerçants sur Google, et être cité par les
moteurs de réponse IA (ChatGPT search, Perplexity, AI Overviews, Claude, Copilot). Plan éditorial : `docs/BLOG-PLAN.md`.

Synthèse d'une recherche faite en octobre 2026 (sources en bas). Le marqueur indique la solidité :
**[Officiel]** doc Google / Bing / OpenAI / Anthropic, **[Étude]** donnée publiée, **[Consensus]** pratique sans preuve.

## Ce qui compte vraiment

- **Optimiser pour l'IA, c'est du SEO.** Google le dit dans son guide (mai 2026) : pas de balisage « IA », pas
  d'écriture spéciale, pas de découpage artificiel en blocs. [Officiel]
- **Être indexé d'abord.** Les assistants citent des pages qu'ils trouvent via leurs index (Google, Bing pour
  ChatGPT/Copilot). D'où : rendu serveur, sitemap, IndexNow. [Officiel]
- **Coller à la question.** La proximité entre le titre et la question posée est le meilleur prédicteur de
  citation par ChatGPT ; 44 % des citations viennent du premier tiers de la page. → Titre = question naturelle,
  réponse dans les premières lignes. [Étude]
- **Apporter ce que personne d'autre n'a.** Google demande du contenu « non-commodity » : tests réels, avant/après,
  chiffres maison, avis d'expert. Recycler ce qu'un modèle d'IA produirait seul ne sert à rien. [Officiel]
- **Citer des sources et des chiffres.** Le papier GEO (Princeton) mesure jusqu'à +40 % de visibilité avec
  sources, citations et statistiques ; effet réel mais fragile selon les études plus récentes. [Étude]
- **Fraîcheur.** Les pages citées par les assistants sont en moyenne plus récentes que les résultats Google
  classiques. → Mettre à jour les articles qui marchent (et le dire avec `updated`). [Étude]
- **Mentions de marque hors site** (Reddit, comparatifs, YouTube, annuaires) : plus corrélées à la visibilité IA
  que les backlinks. Le blog seul ne suffit pas. [Étude, corrélation]

Idées reçues à oublier (statut octobre 2026) : les FAQ rich results ne s'affichent plus du tout (le bloc FAQ
reste utile au lecteur et à Bing) ; HowTo a disparu ; Google n'utilise pas `llms.txt` et les autres bots le lisent
très peu ; ajouter du JSON-LD ne fait pas monter les citations IA ; ni la longueur ni la fréquence de publication
ne sont des facteurs de classement. [Officiel / Étude]

## Checklist pour chaque article

1. **Une requête cible par article**, vérifiée dans la langue visée (autocomplete Google, « Autres questions
   posées », Search Console). Mots-clés recherchés dans chaque langue, pas traduits.
2. **Titre (H1) = la question telle qu'on la tape.** Si le H1 dépasse ~60 caractères, `seo.title` plus court.
3. **Réponse directe en 2 à 4 phrases** dans le premier paragraphe, avant toute mise en contexte.
4. **`takeaways`** : 3 à 5 puces autonomes (encadré « L'essentiel »).
5. **H2 = vraies sous-questions** ; chaque section se comprend seule (nommer le sujet, pas « comme vu plus haut »).
6. **Au moins un élément non générique** : avant/après Glint, test chiffré, capture, retour client.
7. **Chiffres sourcés** avec lien vers la source primaire (plateforme, étude). Jamais de statistique invérifiable.
8. **Un tableau ou une liste** dès que c'est pertinent (comparatif, specs, étapes).
9. **FAQ de 3 à 6 vraies questions** (`faq`), réponses courtes et complètes.
10. **Liens internes** : la page fonctionnalité (`feature`), le pilier du cluster, 2-3 articles proches, avec des
    ancres descriptives (pas de « cliquez ici »).
11. **Auteur réel, dates exactes** : `date` à la publication, `updated` seulement pour une vraie mise à jour.
12. **Images** : alt descriptif, nom de fichier descriptif, mention « générée avec Glint Studio » si c'est le cas.
13. **Relecture humaine de tout ce qui vient d'une IA**, y compris titre, description et alt. Google l'exige
    depuis octobre 2026. [Officiel]

À éviter : publier en masse, traduire automatiquement sans relecture (« scaled content abuse »), inventer un
auteur, changer la date sans changer le contenu, se classer soi-même premier dans un comparatif.

## Ajouter un article

Fichier : `frontend/content/blog/{langue}/{slug}.md` → URL `/blog/{slug}` (FR) ou `/{langue}/blog/{slug}`.
Slug court, en minuscules, avec tirets, dans la langue de l'article. **Ne jamais renommer un slug publié.**

```yaml
---
title: "Comment faire une photo produit sur fond blanc ?"   # H1 + titre de la page
description: "Chapô de 150-160 caractères, aussi utilisé en meta description."
seo:
  title: "Photo produit fond blanc : méthode (2026)"         # optionnel : <title> plus court que le H1
date: 2026-10-06            # publication
updated: 2026-12-01         # optionnel : dernière mise à jour éditoriale
author: theo                # clé de frontend/config/blog.config.ts
feature: studioVirtuel      # optionnel : studioVirtuel | mannequinVirtuel | motionStudio (encart produit + articles liés)
image: /blog/mon-slug/couverture.webp   # optionnel : 1200 × 630, dans frontend/public/blog/
imageAlt: "Description de l'image"
translationKey: mon-sujet   # même valeur sur toutes les traductions
draft: true                 # visible seulement avec pnpm dev
takeaways:
  - "Réponse courte et autonome."
faq:
  - question: "Question réelle ?"
    answer: "Réponse complète en 2-3 phrases."
---

Premier paragraphe : la réponse directe.

## Première sous-question
```

Le gabarit (`frontend/pages/blog/[slug].vue`) ajoute seul : fil d'Ariane, auteur et dates, « L'essentiel »,
sommaire (à partir de 3 H2), FAQ, encadré auteur, encart produit, articles liés, JSON-LD (`BlogPosting`,
`BreadcrumbList`, `FAQPage`), Open Graph, hreflang et sitemap. Ne pas mettre de H1 dans le corps.

**Traductions** : uniquement pour les sujets qui ont une demande dans la langue visée, relues par un natif, avec
des exemples localisés (Amazon.de, Zalando, €). Même `translationKey`, slug traduit. Les liens hreflang et le
sélecteur de langue ne relient que les traductions qui existent ; ailleurs, le sélecteur mène à l'index du blog.
L'index `/de/blog` (etc.) reste en `noindex` tant que la langue n'a aucun article.

**Auteurs** : `frontend/config/blog.config.ts` (nom, liens LinkedIn/site dans `sameAs`) + rôle et bio dans
`blog.authors.{id}` des 5 fichiers `i18n/locales/*.json`.

**Images** : WebP, 1200 px de large minimum pour la couverture, dans `frontend/public/blog/{slug}/`.
En Markdown : `![Texte alternatif descriptif](/blog/mon-slug/avant-apres.webp)`.

## Publier

1. Relire (checklist), passer `draft: false`, vérifier en local avec `pnpm dev`.
2. Commit, puis déploiement (`docs/DEPLOY.md`).
3. Après le déploiement : `pnpm indexnow` (signale à Bing/IndexNow les URL modifiées ces 7 derniers jours ;
   `--dry-run` pour voir la liste). Google ne lit pas IndexNow : il passe par le sitemap.
4. Dans Google Search Console : inspection de l'URL → demander l'indexation.
5. Ajouter l'article à la revue trimestrielle (mettre à jour les chiffres, `updated`, relancer IndexNow).

## Mise en place (une fois)

- **Google Search Console** et **Bing Webmaster Tools** : vérifier le domaine, soumettre
  `https://glintstudio.ai/sitemap_index.xml`. Bing donne aussi un rapport « AI Performance » (citations Copilot).
- **Pare-feu / CDN** : si un CDN est ajouté (Cloudflare…), vérifier qu'il ne bloque pas les bots IA de recherche
  (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot). `robots.txt` autorise déjà tout.
- **Mesure** : référents chatgpt.com, perplexity.ai, claude.ai dans les statistiques ; requêtes des bots dans les logs.
- **Hors site** : profils cohérents (LinkedIn, Product Hunt, annuaires SaaS) reliés via `sameAs` ; réponses utiles
  et déclarées sur Reddit ; présence dans les comparatifs tiers.

## Délais réalistes

Domaine récent : premiers clics sur la longue traîne en 3 à 6 mois, requêtes concurrentielles en 6 à 12 mois ou
plus. Rythme visé : 2 à 4 vrais articles par mois en FR, traductions sélectives, mises à jour régulières. [Consensus]

## Sources principales

- Google, guide d'optimisation pour l'IA : https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google, contenu utile et E-E-A-T : https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google, contenu généré par IA : https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Google, règles anti-spam (scaled content abuse) : https://developers.google.com/search/docs/essentials/spam-policies
- Google, données structurées Article : https://developers.google.com/search/docs/appearance/structured-data/article
- Google, sites multilingues : https://developers.google.com/search/docs/specialty/international/localized-versions
- Bing, IndexNow : https://www.indexnow.org/documentation
- OpenAI, bots : https://developers.openai.com/api/docs/bots · Anthropic : https://support.claude.com/en/articles/8896518
- GEO (Princeton, KDD 2024) : https://arxiv.org/abs/2311.09735 · revue critique 2026 : https://arxiv.org/abs/2607.14035
- Ahrefs, pourquoi ChatGPT cite une page : https://ahrefs.com/blog/why-chatgpt-cites-pages/
- Ahrefs, fraîcheur et citations IA : https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content
- Ahrefs, mentions de marque et visibilité IA : https://ahrefs.com/blog/llm-search/
- Search Engine Land, position des citations ChatGPT : https://searchengineland.com/chatgpt-citations-content-study-469483
