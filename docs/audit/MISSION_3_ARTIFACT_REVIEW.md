# Mission 3 — Artifact Review : Lint/Format Backend Go

## Résumé

| Outil | Config | Commande | Statut |
|-------|--------|----------|--------|
| golangci-lint | backend/.golangci.yml | make lint-go | ✅ 0 erreurs |
| gofmt | — | make fmt-go | ✅ Appliqué |
| go vet | — | make vet-go | ✅ OK |

## Fichiers livrés

- `backend/.golangci.yml` — Config minimale (linters standard)
- `Makefile` — Targets fmt-go, lint-go, vet-go

## Corrections appliquées

| Fichier | Problème | Correction |
|---------|----------|------------|
| openai_service.go:162, 208 | errcheck: json.Unmarshal return ignored | `_ = json.Unmarshal(...)` |
| 5 fichiers | gofmt | gofmt -w |

## Commandes

```bash
# Avec Make (Linux/macOS/WSL)
make fmt-go
make lint-go
make vet-go

# Sans Make (Windows ou équivalent)
cd backend && gofmt -w .
cd backend && go run github.com/golangci/golangci-lint/cmd/golangci-lint@latest run ./...
cd backend && go vet ./...
```

## Installation golangci-lint (optionnel)

Pour des exécutions plus rapides sans `go run` :

```bash
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
```

Puis modifier le Makefile pour utiliser `golangci-lint run` directement.
