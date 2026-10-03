# Production Docker

Une seule image : Nuxt (SSR) — pages + route serveur du chatbot (`/api/ask`).

## Configuration

```bash
cp .env.example .env
# Renseigner les variables
```

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `NUXT_OPENAI_API_KEY` | oui (chatbot) | Clé OpenAI, côté serveur uniquement. Fixer une limite de budget sur le projet OpenAI. |
| `NUXT_OPENAI_VECTOR_STORE_ID` | oui (chatbot) | Vector store de la doc support (`vs_...`). |
| `NUXT_PUBLIC_SITE_URL` | non | Défaut `https://aistudiophoto.com`. Lu au build (sitemap, canonicals). |
| `NUXT_OPENAI_MODEL` | non | Défaut `gpt-4.1-mini`. |
| `NUXT_CHAT_DAILY_LIMIT` | non | Plafond global de questions / jour. Défaut 500. |
| `NUXT_TRUST_PROXY` | non | `true` uniquement derrière un reverse proxy qui réécrit `X-Forwarded-For` (sinon la limite par IP est contournable). |

Sans les variables OpenAI, le site fonctionne ; le chatbot répond 503.

## Lancement

```bash
make prod-up
# ou
docker compose -f docker-compose.prod.yml up --build
```

## Notes

- Node 24 Alpine, runtime minimal (`.output` uniquement), utilisateur non-root.
- La CSP utilise un nonce par requête (`server/plugins/csp.ts`) : rendu SSR requis, pas de `nuxt generate`.
- Limites du chatbot en mémoire (15 questions/min/IP + plafond journalier) : valables pour une seule instance.
