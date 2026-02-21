FROM node:20-alpine

# Enable Corepack and activate pnpm from packageManager field
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies (frozen lockfile for reproducibility)
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

EXPOSE 3000

# Start dev server (docker-compose may override with volumes)
CMD ["pnpm", "run", "dev"]
