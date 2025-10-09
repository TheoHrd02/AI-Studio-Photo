# 🚀 Installation Boilerplate Révisé (Sécurisé)

## 📋 Prérequis
- Go 1.21+
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (via Docker)

## 1. Structure Initiale

```bash
mkdir nuxt-go-boilerplate
cd nuxt-go-boilerplate
mkdir -p backend frontend docker/postgres
```

## 2. Backend Go (Sécurisé)

```bash
cd backend

# Initialiser le module
go mod init github.com/votre-username/nuxt-go-boilerplate

# Dépendances core
go get -u github.com/gin-gonic/gin
go get -u github.com/gin-contrib/cors
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
go get -u github.com/joho/godotenv
go get -u github.com/golang-jwt/jwt/v5
go get -u golang.org/x/crypto/bcrypt

# Migrations
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Structure des dossiers
mkdir -p cmd internal/{config,database,models,repositories,services,handlers,middleware} migrations pkg

cd ..
```

## 3. Frontend Nuxt

```bash
cd frontend

# Initialiser Nuxt 3
npx nuxi@latest init . --packageManager npm

# Attendre l'installation...
npm install

# Dépendances additionnelles
npm install -D @nuxtjs/tailwindcss
npm install @pinia/nuxt pinia

# Structure
mkdir -p composables types middleware server/api

cd ..
```

## 4. Fichiers de Configuration

```bash
# Docker
touch docker-compose.yml
touch backend/Dockerfile
touch frontend/Dockerfile

# PostgreSQL init
touch docker/postgres/init.sql

# Environnement
touch backend/.env.example backend/.env
touch frontend/.env.example frontend/.env

# Git
touch .gitignore README.md

# Migrations initiales
cd backend
migrate create -ext sql -dir migrations -seq create_users
migrate create -ext sql -dir migrations -seq create_refresh_tokens
cd ..
```

## 5. Configuration Git

```bash
cat > .gitignore << 'EOF'
# Env files
.env
*.env
!.env.example

# Go
backend/tmp/
backend/*.exe
backend/*.test
backend/*.out

# Node
frontend/node_modules/
frontend/.nuxt/
frontend/.output/
frontend/dist/

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Docker
docker/postgres/data/
EOF
```

## 6. Créer les Migrations SQL

```bash
# backend/migrations/000001_create_users.up.sql
cat > backend/migrations/000001_create_users.up.sql << 'EOF'
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
EOF

# backend/migrations/000001_create_users.down.sql
cat > backend/migrations/000001_create_users.down.sql << 'EOF'
DROP TABLE IF EXISTS users;
EOF

# backend/migrations/000002_create_refresh_tokens.up.sql
cat > backend/migrations/000002_create_refresh_tokens.up.sql << 'EOF'
CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(512) UNIQUE NOT NULL,
    device_info TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_expires ON refresh_tokens(expires_at);
EOF

# backend/migrations/000002_create_refresh_tokens.down.sql
cat > backend/migrations/000002_create_refresh_tokens.down.sql << 'EOF'
DROP TABLE IF EXISTS refresh_tokens;
EOF
```

## 7. Configuration Docker Compose

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    container_name: nuxt_go_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: nuxt_go_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: nuxt_go_backend
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/nuxt_go_db?sslmode=disable
      JWT_SECRET: change-this-in-production
      JWT_REFRESH_SECRET: change-this-too-in-production
      PORT: 8080
      GIN_MODE: debug
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./backend:/app
    command: ["air", "-c", ".air.toml"]

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: nuxt_go_frontend
    ports:
      - "3000:3000"
    environment:
      NUXT_PUBLIC_API_BASE: http://localhost:8080/api/v1
      NUXT_GO_API_URL: http://backend:8080/api/v1
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: ["npm", "run", "dev"]

volumes:
  postgres_data:
EOF
```

## 8. Backend Dockerfile (avec hot-reload)

```bash
cat > backend/Dockerfile << 'EOF'
FROM golang:1.21-alpine AS development

WORKDIR /app

# Air pour hot-reload
RUN go install github.com/cosmtrek/air@latest

# Dépendances
COPY go.mod go.sum ./
RUN go mod download

# Code
COPY . .

# Exposer le port
EXPOSE 8080

# Air démarre automatiquement via docker-compose command
EOF

# Configuration Air
cat > backend/.air.toml << 'EOF'
root = "."
testdata_dir = "testdata"
tmp_dir = "tmp"

[build]
  args_bin = []
  bin = "./tmp/main"
  cmd = "go build -o ./tmp/main ./cmd/main.go"
  delay = 1000
  exclude_dir = ["assets", "tmp", "vendor", "testdata"]
  exclude_file = []
  exclude_regex = ["_test.go"]
  exclude_unchanged = false
  follow_symlink = false
  full_bin = ""
  include_dir = []
  include_ext = ["go", "tpl", "tmpl", "html"]
  include_file = []
  kill_delay = "0s"
  log = "build-errors.log"
  poll = false
  poll_interval = 0
  rerun = false
  rerun_delay = 500
  send_interrupt = false
  stop_on_error = false

[color]
  app = ""
  build = "yellow"
  main = "magenta"
  runner = "green"
  watcher = "cyan"

[log]
  main_only = false
  time = false

[misc]
  clean_on_exit = false

[screen]
  clear_on_rebuild = false
  keep_scroll = true
EOF
```

## 9. Frontend Dockerfile

```bash
cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine AS development

WORKDIR /app

# Dépendances
COPY package*.json ./
RUN npm ci

# Code
COPY . .

# Exposer le port
EXPOSE 3000

# Nuxt dev démarre via docker-compose command
EOF
```

## 10. Configuration Environnement

```bash
# Backend .env.example
cat > backend/.env.example << 'EOF'
DATABASE_URL=postgres://postgres:postgres@localhost:5432/nuxt_go_db?sslmode=disable
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=168h
PORT=8080
GIN_MODE=debug
DOMAIN=localhost
CORS_ORIGINS=http://localhost:3000
EOF

# Frontend .env.example
cat > frontend/.env.example << 'EOF'
NUXT_PUBLIC_API_BASE=http://localhost:8080/api/v1
NUXT_GO_API_URL=http://backend:8080/api/v1
EOF

# Copier les .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## 11. Configuration Nuxt

```bash
cat > frontend/nuxt.config.ts << 'EOF'
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    // Private keys (server-only)
    goApiUrl: process.env.NUXT_GO_API_URL,
    
    // Public keys (exposed to client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },

  nitro: {
    // Server routes for BFF pattern
    routeRules: {
      '/api/**': { 
        cors: true,
        headers: {
          'Access-Control-Allow-Credentials': 'true'
        }
      }
    }
  }
})
EOF
```

## 12. Initialiser Git

```bash
git init
git add .
git commit -m "feat: initial boilerplate with security best practices

- JWT with httpOnly refresh tokens
- golang-migrate for DB migrations
- BFF architecture support
- Docker Compose setup
- Nuxt 3 + Go + PostgreSQL"
```

## 13. Lancer le Projet

```bash
# Première fois (build images)
docker-compose up --build

# Accès:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8080
# - PostgreSQL: localhost:5432

# Arrêter
docker-compose down

# Arrêter + supprimer volumes
docker-compose down -v
```

## 14. Appliquer les Migrations

```bash
# Depuis l'hôte (si migrate installé localement)
export DATABASE_URL="postgres://postgres:postgres@localhost:5432/nuxt_go_db?sslmode=disable"
migrate -path backend/migrations -database $DATABASE_URL up

# Ou depuis le container backend
docker-compose exec backend sh
migrate -path /app/migrations -database $DATABASE_URL up
exit
```

## 15. Vérification Santé

```bash
# Vérifier PostgreSQL
docker-compose exec db psql -U postgres -d nuxt_go_db -c "\dt"

# Devrait afficher: users, refresh_tokens, schema_migrations

# Tester backend
curl http://localhost:8080/health

# Tester frontend
curl http://localhost:3000
```

## 🎯 Prochaines Étapes

1. ✅ Implémenter les handlers d'authentification
2. ✅ Créer les composables Nuxt (useAuth, useApi)
3. ✅ Ajouter les server routes BFF
4. ✅ Implémenter la rotation des refresh tokens
5. ✅ Ajouter rate limiting
6. ✅ Tests unitaires

## 📚 Structure Finale

```
nuxt-go-boilerplate/
├── backend/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── database/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── handlers/
│   │   └── middleware/
│   ├── migrations/
│   │   ├── 000001_create_users.up.sql
│   │   ├── 000001_create_users.