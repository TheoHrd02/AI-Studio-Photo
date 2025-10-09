FROM golang:1.23-alpine AS development

WORKDIR /app

# Installer les outils nécessaires
RUN apk add --no-cache git

# Permettre à Go de télécharger la version requise
ENV GOTOOLCHAIN=auto

# Installer Air pour hot-reload
RUN go install github.com/air-verse/air@latest

# Dépendances
COPY go.mod go.sum ./
RUN go mod download

# Code
COPY . .

# Exposer le port
EXPOSE 8080

# Air démarre automatiquement via docker-compose command
