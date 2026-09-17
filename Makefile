# Makefile — AI Studio Photo
# Usage: make <target>

.PHONY: fmt-go lint-go lint-frontend typecheck-frontend check prod prod-up

# ─── Backend Go ─────────────────────────────────────────────────────────────

## Format Go code (gofmt)
fmt-go:
	cd backend && gofmt -w .

## Lint Go code (golangci-lint). Requires: go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
lint-go:
	cd backend && go run github.com/golangci/golangci-lint/cmd/golangci-lint@latest run ./...

## Run go vet
vet-go:
	cd backend && go vet ./...

# ─── Frontend ────────────────────────────────────────────────────────────────

lint-frontend:
	cd frontend && pnpm lint

typecheck-frontend:
	cd frontend && pnpm typecheck

## Run all checks (lint + typecheck + build). Use before merge.
check:
	cd backend && go build ./...
	cd frontend && pnpm check

# ─── Production Docker ──────────────────────────────────────────────────────

## Build production images (multi-stage, smaller than dev)
prod:
	docker compose -f docker-compose.prod.yml build

## Build and run production stack. Requires .env (copy from .env.example.prod)
prod-up:
	docker compose -f docker-compose.prod.yml up --build
