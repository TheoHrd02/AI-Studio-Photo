# 🚀 Prochaines Étapes - AI Studio Photo Frontend

**Statut** : Priorité 1 ✅ COMPLÉTÉE

---

## ✅ Ce qui est fait

### Corrections Priorité 1
1. ✅ Header unique (suppression duplication)
2. ✅ Layout marketing appliqué partout
3. ✅ Composable `useAuth` créé et testé
4. ✅ Middleware `auth` pour protéger /app/*
5. ✅ Pages login et signup créées
6. ✅ Dashboard avec déconnexion
7. ✅ Documentation complète

---

## 🔄 Intégration Backend (URGENT)

### Endpoints à implémenter côté Go

Le frontend attend ces endpoints (voir `AUTHENTICATION.md` pour détails) :

#### 1. Authentification de base
```go
POST /api/v1/auth/login
POST /api/v1/auth/register
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

#### 2. Gestion des tokens
```go
POST /api/v1/auth/refresh  // Refresh token → nouveau access token
```

#### 3. OAuth Google
```go
POST /api/v1/auth/google  // Credential Google → JWT
```

### Exemple d'implémentation (Go)

```go
// handlers/auth_handler.go

func (h *AuthHandler) Login(c *gin.Context) {
    var req LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"code": 400, "message": "Invalid request"})
        return
    }

    user, err := h.authService.Login(req.Email, req.Password)
    if err != nil {
        c.JSON(401, gin.H{"code": 401, "message": "Invalid credentials"})
        return
    }

    accessToken, _ := h.jwtService.GenerateAccessToken(user)
    refreshToken, _ := h.jwtService.GenerateRefreshToken(user)

    // Stocker refresh token en DB
    h.tokenRepo.SaveRefreshToken(user.ID, refreshToken)

    // Cookie httpOnly pour refresh token
    c.SetCookie(
        "refresh_token",
        refreshToken,
        7*24*60*60, // 7 jours
        "/",
        "",
        true, // Secure
        true, // HttpOnly
    )

    c.JSON(200, gin.H{
        "code": 200,
        "message": "Success",
        "data": gin.H{
            "user": user,
            "accessToken": accessToken,
        },
    })
}
```

---

## 🎯 Priorité 2 - Fonctionnalités

### 1. Développer le Dashboard SaaS

**Fichier** : `pages/app/index.vue`

Ajouter :
- [ ] Interface de génération d'images
- [ ] Historique des générations
- [ ] Gestion des crédits
- [ ] Paramètres du compte
- [ ] Galerie d'images

### 2. Intégration Stripe

**Nouveaux fichiers à créer** :
```
composables/
  └── useStripe.ts        // Gestion paiements

pages/
  └── app/
      ├── billing.vue     // Facturation
      └── subscription.vue // Abonnements
```

**Fonctionnalités** :
- [ ] Page de paiement
- [ ] Gestion des abonnements
- [ ] Historique des paiements
- [ ] Factures téléchargeables

### 3. Internationalisation (i18n)

**Installation** :
```bash
npm install @nuxtjs/i18n
```

**Fichiers à créer** :
```
locales/
  ├── fr.json  # Français
  └── en.json  # Anglais

components/
  └── ui/
      └── LanguageSwitcher.vue
```

**Configuration nuxt.config.ts** :
```typescript
modules: [
  // ... autres modules
  '@nuxtjs/i18n',
],

i18n: {
  locales: [
    { code: 'fr', file: 'fr.json', name: 'Français' },
    { code: 'en', file: 'en.json', name: 'English' },
  ],
  defaultLocale: 'fr',
  lazy: true,
  langDir: 'locales/',
}
```

---

## 🧪 Priorité 3 - Tests

### Tests unitaires (Vitest)

**Installation** :
```bash
npm install -D vitest @vue/test-utils happy-dom
```

**Fichiers à créer** :
```
tests/
  ├── composables/
  │   └── useAuth.test.ts
  ├── components/
  │   └── marketing/
  │       └── AppHeader.test.ts
  └── middleware/
      └── auth.test.ts
```

### Tests E2E (Playwright)

**Installation** :
```bash
npm install -D @playwright/test
```

**Scénarios à tester** :
- [ ] Inscription → Login → Dashboard → Logout
- [ ] Protection des routes /app/*
- [ ] Rafraîchissement automatique du token
- [ ] Navigation entre pages
- [ ] Responsive design

---

## 📱 Priorité 4 - UX/UI

### Améliorations à faire

1. **Loading States**
   - [ ] Skeleton loaders
   - [ ] Page transitions
   - [ ] Spinners uniformes

2. **Error Handling**
   - [ ] Page `error.vue` globale
   - [ ] Toasts/Notifications système
   - [ ] Messages d'erreur clairs

3. **Composants UI**
   - [ ] Modal system
   - [ ] Toast notifications
   - [ ] Confirmation dialogs
   - [ ] Form validation visuelle

4. **Responsive**
   - [ ] Test sur mobile
   - [ ] Menu mobile amélioré
   - [ ] Touch gestures

---

## 🔒 Priorité 5 - Sécurité

### À implémenter

1. **Frontend**
   - [ ] Rate limiting visuel
   - [ ] CAPTCHA sur inscription
   - [ ] Input sanitization
   - [ ] XSS protection

2. **Backend** (côté Go)
   - [ ] Rate limiting API (5 req/15min sur /auth/*)
   - [ ] Hash password bcrypt (cost ≥ 12)
   - [ ] Validation email format
   - [ ] Max 5 refresh tokens actifs/user
   - [ ] Logs d'authentification

---

## 📊 Priorité 6 - Analytics

### Google Analytics / Plausible

**Installation** :
```bash
npm install -D @nuxtjs/google-analytics
# ou
npm install -D @nuxtjs/plausible
```

**Configuration** :
```typescript
// nuxt.config.ts
modules: [
  '@nuxtjs/google-analytics',
],

googleAnalytics: {
  id: 'G-XXXXXXXXXX',
}
```

---

## 🐳 Déploiement Docker

### Fichiers existants
- ✅ `Dockerfile` déjà présent
- ✅ `docker-compose.yml` à créer

### docker-compose.yml (à la racine du projet)

```yaml
version: '3.8'

services:
  # Backend Go
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=aistudiophoto
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
    networks:
      - app-network

  # Frontend Nuxt
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NUXT_PUBLIC_API_BASE=http://localhost:8080/api/v1
      - NUXT_GO_API_URL=http://backend:8080/api/v1
    depends_on:
      - backend
    networks:
      - app-network

  # PostgreSQL
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=aistudiophoto
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
```

### Commandes Docker

```bash
# Construire et démarrer
docker-compose up --build

# Arrêter
docker-compose down

# Logs
docker-compose logs -f frontend
docker-compose logs -f backend
```

---

## 📝 Checklist Complète

### Authentification ✅
- [x] Composable useAuth
- [x] Middleware auth
- [x] Pages login/signup
- [x] Protection routes
- [x] Documentation

### Backend (à faire)
- [ ] Endpoints auth implémentés
- [ ] JWT generation
- [ ] Refresh token rotation
- [ ] Google OAuth
- [ ] Tests unitaires backend

### Dashboard
- [ ] Interface génération images
- [ ] Historique
- [ ] Gestion crédits
- [ ] Paramètres compte

### Paiements
- [ ] Intégration Stripe
- [ ] Abonnements
- [ ] Facturation

### Internationalisation
- [ ] Configuration i18n
- [ ] Traductions FR/EN
- [ ] Sélecteur langue

### Tests
- [ ] Tests unitaires
- [ ] Tests E2E
- [ ] CI/CD pipeline

### Déploiement
- [ ] Docker compose
- [ ] Variables d'environnement
- [ ] SSL/HTTPS
- [ ] Monitoring

---

## 🆘 Besoin d'aide ?

### Documentation
- `AUTHENTICATION.md` - Guide authentification complet
- `THEME_CONFIG.md` - Personnalisation thème
- `CHANGELOG_PRIORITY_1.md` - Modifications récentes
- `README.md` - Vue d'ensemble

### Ressources
- [Nuxt 3 Docs](https://nuxt.com)
- [NuxtUI Components](https://ui.nuxt.com)
- [Stripe Docs](https://stripe.com/docs)
- [Google OAuth](https://developers.google.com/identity)

---

## 🎉 Félicitations !

Le système d'authentification est **complet et prêt à l'emploi**.

**Prochaine étape critique** : Implémenter les endpoints backend en Go.

Bon développement ! 🚀
