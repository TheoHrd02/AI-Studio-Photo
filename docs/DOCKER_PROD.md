# Production Docker

Images multi-stage, optimisées pour la production.

## Prérequis

- Docker & Docker Compose
- Fichier `.env` à la racine (copier depuis `.env.example.prod`)

## Configuration

```bash
cp .env.example.prod .env
# Éditer .env et renseigner les variables
```

### Variables obligatoires

| Variable | Description |
|----------|-------------|
| `NUXT_PUBLIC_API_BASE` | URL utilisée par le navigateur pour appeler l'API (ex: `http://localhost:8080/api/v1` en local) |
| `NUXT_GO_API_URL` | URL utilisée par le serveur frontend pour appeler le backend (ex: `http://backend:8080/api/v1`) |

### Variables optionnelles

| Variable | Défaut |
|----------|--------|
| `NUXT_PUBLIC_SITE_URL` | `https://aistudiophoto.com` |

## Lancement

```bash
# Build + run
make prod-up

# Ou directement
docker compose -f docker-compose.prod.yml up --build
```

## Build seul

```bash
make prod
# ou
docker compose -f docker-compose.prod.yml build
```

## Architecture

- **Frontend** : Node 20 Alpine, build Nuxt → runtime minimal (`.output` uniquement) — ~350 MB
- **Backend** : Go build → image distroless (~2 MB binaire) — ~34 MB

Les images prod sont nettement plus petites que les images dev (sans node_modules, sans outils de build).
