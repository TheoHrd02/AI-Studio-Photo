FROM oven/bun:1-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json ./
COPY bun.lock* ./

# Installer les dépendances
RUN bun install

# Copier le reste du code
COPY . .

# Exposer le port
EXPOSE 3000

# Lancer le serveur de dev
CMD ["bun", "run", "dev"]
