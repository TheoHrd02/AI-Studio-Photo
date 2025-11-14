FROM node:20-alpine AS development

WORKDIR /app

# Dépendances
COPY package*.json ./
RUN npm ci

# Copier le script d'entrée
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Code
COPY . .

# Exposer le port
EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
