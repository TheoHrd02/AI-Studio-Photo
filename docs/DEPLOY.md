# Déploiement

La vitrine tourne en production sur la VM de l'application Glint Studio (Hetzner, `/opt/glint`), derrière le Caddy
de l'app, sur `glintstudio.ai` (`www` redirigé vers l'apex). Rien n'est cloné ni construit sur le serveur : l'image
est construite une fois par la CI de ce dépôt et tirée par son empreinte sha256.

**Procédure de référence** : dépôt de l'app (`TheoHrd02/AI-Studio-Photo-App`), `docs/runbook.md`, section Production,
« Mise en ligne de la vitrine » (DNS, `.env` et `vitrine.env`, démarrage, contrôles, retour arrière, mise à jour).
Côté app : service `vitrine` de `deploy/production/docker-compose.yml`, blocs `VITRINE_DOMAIN` de
`deploy/production/proxy/Caddyfile`, réglages dans `deploy/production/vitrine.env.example`.

## Publier une version

```bash
git tag v1.0.0 && git push origin v1.0.0
```

Le workflow `.github/workflows/release.yml` construit `frontend/Dockerfile.prod` pour `https://glintstudio.ai` (URL
intégrée au build : sitemap, canonicals, hreflang), publie `ghcr.io/theohrd02/glint/vitrine:<tag>` et joint à la
release un `artefacts.txt` à reporter dans `/opt/glint/.env` :

```
VITRINE_IMAGE=ghcr.io/theohrd02/glint/vitrine
VITRINE_IMAGE_DIGEST=sha256:…
```

Un tag avec tiret (`v1.0.0-rc1`) crée une pré-version. Mise à jour sur le serveur, depuis `/opt/glint` : nouvelle
empreinte dans `.env`, puis `docker compose pull vitrine && docker compose up -d vitrine` (l'app ne redémarre pas).

## Variables (`vitrine.env` sur le serveur)

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `NUXT_ANTHROPIC_API_KEY` | chatbot | Clé dédiée à la vitrine, dans un workspace Anthropic à limite de dépense mensuelle (README, « Chatbot »). |
| `NUXT_CHAT_DAILY_LIMIT` | non | Plafond global de questions par jour UTC. Défaut 200 ; 0 coupe le chatbot. |
| `NUXT_CHAT_MONTHLY_LIMIT` | non | Plafond global de questions par mois UTC. Défaut 1000 ; 0 coupe le chatbot. |
| `NUXT_ANTHROPIC_MODEL` | non | Modèle Haiku uniquement. Défaut `claude-haiku-4-5`. |

`NUXT_PUBLIC_SITE_URL` (`https://VITRINE_DOMAIN`) et `NUXT_TRUST_PROXY=true` sont fixés par le Compose de l'app : Caddy
réécrit `X-Forwarded-For` avec l'IP réelle, les limites par IP du chatbot sont donc fiables.
Sans clé Anthropic le site fonctionne ; le chatbot affiche « indisponible » (HTTP 503).
La doc du chatbot (`frontend/server/assets/support-docs.md`) est intégrée à l'image : la modifier demande une release.

## Vérifications après déploiement

```bash
curl -sI https://glintstudio.ai | grep -iE "^HTTP/|strict-transport|content-security"
curl -sI https://www.glintstudio.ai/en | grep -iE "^HTTP/|^location"   # 301 vers https://glintstudio.ai/en
curl -s https://glintstudio.ai/sitemap_index.xml | head
docker compose ps vitrine   # sur le serveur, dans /opt/glint : "healthy"
```

Puis dans un navigateur : sélecteur de langue, page Aide (une question au chatbot), console sans erreur CSP.

Si des articles du blog ont été publiés ou modifiés, signaler les URL à Bing / IndexNow (depuis `frontend/`) :

```bash
pnpm indexnow
```

## Notes

- Le blog (Nuxt Content) restaure sa base SQLite dans `/app/.data` au premier appel : dossier créé dans l'image,
  rien à monter. Node ≥ 22.5 requis (SQLite natif). Image non-root (`node`), healthcheck par le `wget` de busybox.
- La CSP utilise un nonce par requête (`frontend/server/plugins/csp.ts`) : rendu SSR requis, pas de `nuxt generate`.
- `docker-compose.prod.yml`, `Caddyfile` et `.env.example` à la racine : stack autonome (Caddy + Nuxt, build local),
  pour un VPS séparé ou un essai local de l'image (`DOMAIN=localhost`) ; elle n'est pas utilisée en production.
