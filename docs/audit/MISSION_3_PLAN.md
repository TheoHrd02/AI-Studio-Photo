# Mission 3 — Plan : Lint/Format Backend Go

## Objectif
Standardiser la qualité Go avec golangci-lint + gofmt, sans refactor métier.

## Choix d'outils

| Outil | Usage |
|-------|-------|
| golangci-lint | Lint (config minimale, linters standard) |
| gofmt | Format du code |
| go vet | Analyse statique (inclus dans golangci-lint) |

## Config .golangci.yml (minimale)

- `version: "2"`
- `linters.default: standard` (linters activés par défaut)
- `run.timeout: 2m`
- Exclusions : `tmp/`, `vendor/`, fichiers générés

## Commandes (Makefile)

- `make fmt-go` : gofmt -w
- `make lint-go` : golangci-lint run (via go run si non installé)
- `make vet-go` : go vet ./...

## Fichiers impactés

- `backend/.golangci.yml` (créer)
- `Makefile` (créer à la racine) ou `backend/README` / docs
- Corrections gofmt si nécessaire
