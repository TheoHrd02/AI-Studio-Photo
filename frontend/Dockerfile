FROM node:20-alpine AS development

WORKDIR /app

# Dépendances
COPY package*.json ./
RUN npm ci

# Code
COPY . .

# Exposer le port
EXPOSE 3000

# Nuxt dev démarre via docker-compose command
