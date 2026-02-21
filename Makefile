# Makefile — AI Studio Photo
# Usage: make <target>

.PHONY: fmt-go lint-go lint-frontend typecheck-frontend

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
