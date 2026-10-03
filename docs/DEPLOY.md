# Déploiement (VPS)

Stack : **Caddy** (HTTPS Let's Encrypt automatique, ports 80/443) → **Nuxt SSR** (conteneur `frontend`, port 3000 non exposé).
Fichiers : `docker-compose.prod.yml`, `Caddyfile`, `frontend/Dockerfile.prod`, `.env`.

## Prérequis (une fois)

1. VPS Linux avec Docker + plugin Compose (`docker compose version`).
2. DNS : enregistrements A (et AAAA si IPv6) de `aistudiophoto.com` **et** `www.aistudiophoto.com` → IP du VPS.
3. Pare-feu : ports **80** et **443** (TCP, + 443/UDP pour HTTP/3) ouverts. Le port 3000 n'a pas à l'être.

## Installation

```bash
git clone git@github.com:TheoHrd02/AI-Studio-Photo.git aistudio && cd aistudio
cp .env.example .env
nano .env   # DOMAIN, NUXT_OPENAI_API_KEY, NUXT_OPENAI_VECTOR_STORE_ID
docker compose -f docker-compose.prod.yml up -d --build
```

Caddy obtient le certificat au premier démarrage (DNS déjà propagé requis). Logs : `docker compose -f docker-compose.prod.yml logs -f`.

## Variables (`.env`)

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `DOMAIN` | oui | Domaine sans `https://`. Sert à Caddy et à l'URL du site (sitemap, canonicals, hreflang, og:url). |
| `NUXT_OPENAI_API_KEY` | chatbot | Clé OpenAI, côté serveur uniquement. **Fixer une limite de budget** sur le projet OpenAI. |
| `NUXT_OPENAI_VECTOR_STORE_ID` | chatbot | Vector store de la doc support (`vs_...`). |
| `NUXT_OPENAI_MODEL` | non | Défaut `gpt-4.1-mini`. |
| `NUXT_CHAT_DAILY_LIMIT` | non | Plafond global de questions par jour. Défaut 500. |

Sans les variables OpenAI le site fonctionne ; le chatbot affiche « indisponible » (HTTP 503).
`NUXT_TRUST_PROXY=true` est fixé par le compose : Caddy réécrit `X-Forwarded-For` avec l'IP réelle, la limite par IP du chatbot est donc fiable.

## Mise à jour

```bash
git pull
docker compose -f docker-compose.prod.yml up -d --build
docker image prune -f
```

`DOMAIN` est intégré au build (sitemap, liens canoniques) : rebuild obligatoire s'il change.

## Vérifications après déploiement

```bash
curl -sI https://aistudiophoto.com | grep -iE "HTTP/|strict-transport|content-security"
curl -s https://aistudiophoto.com/sitemap_index.xml | head
docker compose -f docker-compose.prod.yml ps   # frontend doit être "healthy"
```

Puis dans un navigateur : sélecteur de langue, page Aide (une question au chatbot), console sans erreur CSP.

## Notes

- Limites du chatbot gardées en mémoire (15 questions/min/IP + plafond journalier) : valables pour **une seule instance**. Pour plusieurs instances, passer à un stockage partagé (Redis).
- La CSP utilise un nonce par requête (`frontend/server/plugins/csp.ts`) : rendu SSR requis, pas de `nuxt generate`.
- Testé en local avec `DOMAIN=localhost` (Caddy génère alors un certificat local).
