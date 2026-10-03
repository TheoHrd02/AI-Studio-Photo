# Makefile — AI Studio Photo
# Usage: make <target>

.PHONY: dev lint typecheck check prod prod-up

dev:
	cd frontend && pnpm dev

lint:
	cd frontend && pnpm lint

typecheck:
	cd frontend && pnpm typecheck

## Run all checks (lint + typecheck + build). Use before merge.
check:
	cd frontend && pnpm check

## Build production image
prod:
	docker compose -f docker-compose.prod.yml build

## Build and run production stack. Requires .env (copy from .env.example)
prod-up:
	docker compose -f docker-compose.prod.yml up --build
