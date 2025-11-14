# 🔐 Documentation d'Authentification

Documentation complète du système d'authentification de AI Studio Photo.

---

## 📋 Vue d'ensemble

Le système d'authentification utilise :
- **JWT Access Token** (15 minutes) stocké en mémoire
- **Refresh Token** (7 jours) stocké en cookie httpOnly
- **Rotation automatique** des tokens
- **Max 5 appareils** actifs par utilisateur
- **Google OAuth** comme provider unique

---

## 🧩 Architecture

### Composable `useAuth`

**Fichier** : `/composables/useAuth.ts`

Le composable central qui gère toute la logique d'authentification.

#### État global (useState)
```typescript
const user = useState<User | null>('auth:user', () => null)
const accessToken = useState<string | null>('auth:accessToken', () => null)
const isAuthenticated = computed(() => !!user.value && !!accessToken.value)
```

#### Méthodes disponibles

| Méthode | Description | Paramètres |
|---------|-------------|------------|
| `login()` | Connexion email/password | `email`, `password` |
| `loginWithGoogle()` | Connexion avec Google OAuth | `credential` |
| `register()` | Inscription | `email`, `password`, `name?` |
| `logout()` | Déconnexion | - |
| `refreshAccessToken()` | Rafraîchir le token | - |
| `fetchUser()` | Récupérer les infos utilisateur | - |
| `checkAuth()` | Vérifier et restaurer la session | - |
| `getAuthHeaders()` | Obtenir les headers Authorization | - |

#### Utilisation dans un composant

```vue
<script setup lang="ts">
const { user, isAuthenticated, login, logout } = useAuth()

const handleLogin = async () => {
  await login('user@example.com', 'password')
}
</script>

<template>
  <div v-if="isAuthenticated">
    Bienvenue {{ user?.name }}
    <button @click="logout">Se déconnecter</button>
  </div>
</template>
```

---

### Middleware `auth`

**Fichier** : `/middleware/auth.ts`

Protège les routes nécessitant une authentification.

#### Fonctionnement
1. Vérifie si l'utilisateur est authentifié
2. Si non, tente de restaurer la session via refresh token
3. Si échec, redirige vers `/login` avec query redirect

#### Utilisation

```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth', // ✅ Route protégée
})
</script>
```

---

## 📄 Pages d'authentification

### `/login` - Connexion

- Formulaire email/password
- Bouton Google OAuth (à implémenter)
- Lien vers inscription
- Redirection automatique après connexion

### `/signup` - Inscription

- Formulaire avec nom (optionnel), email, password
- Validation : mot de passe ≥ 8 caractères
- Confirmation du mot de passe
- Google OAuth disponible
- Liens vers CGU et politique de confidentialité

---

## 🔒 Routes protégées

### Routes nécessitant authentification
- `/app/*` - Dashboard et application SaaS
- Toute nouvelle route sous `/app/` sera automatiquement protégée

### Routes publiques (sans authentification)
- `/` - Page d'accueil
- `/pricing` - Tarifs
- `/features` - Fonctionnalités
- `/help` - Centre d'aide
- `/blog` - Blog
- `/affiliation` - Programme d'affiliation
- `/login` - Connexion
- `/signup` - Inscription

---

## 🔐 Sécurité

### Stockage des tokens

#### Access Token (15 min)
- ✅ Stocké en **mémoire** via `useState`
- ✅ Perdu à la fermeture du navigateur
- ✅ Jamais dans localStorage/sessionStorage
- ✅ Envoyé dans header `Authorization: Bearer <token>`

#### Refresh Token (7 jours)
- ✅ Stocké en **cookie httpOnly**
- ✅ Attributs : `Secure`, `SameSite=Strict`
- ✅ Inaccessible via JavaScript
- ✅ Rotation automatique lors du refresh

### Bonnes pratiques implémentées
- ✅ Credentials: 'include' pour toutes les requêtes auth
- ✅ Validation côté backend requise (à implémenter)
- ✅ Rate limiting côté backend recommandé
- ✅ CORS configuré dans nuxt.config.ts
- ✅ Max 5 appareils actifs (géré backend)

---

## 🚀 Endpoints API Backend attendus

Le frontend s'attend à ces endpoints côté Go :

### POST `/api/v1/auth/login`
```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response (200)
{
  "code": 200,
  "message": "Success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": "url",
      "role": "user",
      "createdAt": "2025-01-01T00:00:00Z"
    },
    "accessToken": "jwt_token"
  }
}
```

### POST `/api/v1/auth/register`
```json
// Request
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"  // optionnel
}

// Response (201)
{
  "code": 201,
  "message": "User created",
  "data": {
    "user": { /* ... */ },
    "accessToken": "jwt_token"
  }
}
```

### POST `/api/v1/auth/google`
```json
// Request
{
  "credential": "google_oauth_credential"
}

// Response (200)
{
  "code": 200,
  "message": "Success",
  "data": {
    "user": { /* ... */ },
    "accessToken": "jwt_token"
  }
}
```

### POST `/api/v1/auth/refresh`
```json
// Request
// Cookie: refresh_token=xxx (httpOnly)

// Response (200)
{
  "code": 200,
  "message": "Token refreshed",
  "data": {
    "accessToken": "new_jwt_token"
  }
}
```

### POST `/api/v1/auth/logout`
```json
// Request
// Header: Authorization: Bearer <access_token>
// Cookie: refresh_token=xxx

// Response (200)
{
  "code": 200,
  "message": "Logged out"
}
```

### GET `/api/v1/auth/me`
```json
// Request
// Header: Authorization: Bearer <access_token>

// Response (200)
{
  "code": 200,
  "message": "Success",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "url",
    "role": "user",
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

---

## 🔄 Flux d'authentification

### 1. Connexion
```
User → /login
  ↓ email + password
Frontend → POST /api/v1/auth/login
  ↓ accessToken + user + cookie(refresh_token)
Frontend → Store in memory + Navigate to /app
```

### 2. Accès à une page protégée
```
User → /app
  ↓
Middleware auth → checkAuth()
  ↓ isAuthenticated?
  YES → Allow access
  NO → Try refreshAccessToken()
    ↓ refresh successful?
    YES → Fetch user + Allow access
    NO → Navigate to /login?redirect=/app
```

### 3. Rafraîchissement automatique
```
Access Token expires (15 min)
  ↓
Frontend → POST /api/v1/auth/refresh (with httpOnly cookie)
  ↓ new access token
Frontend → Store in memory
```

### 4. Déconnexion
```
User → Click logout
  ↓
Frontend → POST /api/v1/auth/logout
  ↓
Backend → Invalidate refresh token
  ↓
Frontend → Clear memory + Navigate to /
```

---

## 🧪 À tester côté Backend

### Scénarios à implémenter
- [ ] Connexion email/password valide
- [ ] Connexion avec email invalide
- [ ] Connexion avec mauvais mot de passe
- [ ] Inscription avec email déjà existant
- [ ] Inscription réussie
- [ ] Refresh token valide
- [ ] Refresh token expiré
- [ ] Refresh token invalide
- [ ] Déconnexion
- [ ] Max 5 appareils actifs
- [ ] Google OAuth flow complet

---

## 🌍 Variables d'environnement

### Frontend (.env)
```env
# API publique (client-side)
NUXT_PUBLIC_API_BASE=http://localhost:8080/api/v1

# API pour BFF (server-side only)
NUXT_GO_API_URL=http://backend:8080/api/v1
```

### Backend Go (.env)
```env
JWT_SECRET=your-secret-key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=168h  # 7 jours
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## ✅ Checklist d'intégration Backend

### Authentification
- [ ] Endpoint POST /auth/login
- [ ] Endpoint POST /auth/register
- [ ] Endpoint POST /auth/google
- [ ] Endpoint POST /auth/refresh
- [ ] Endpoint POST /auth/logout
- [ ] Endpoint GET /auth/me

### Tokens
- [ ] Génération JWT avec expiry 15 min
- [ ] Génération refresh token avec expiry 7 jours
- [ ] Stockage refresh tokens en DB (table `refresh_tokens`)
- [ ] Rotation refresh token lors du refresh
- [ ] Cookie httpOnly + Secure + SameSite=Strict

### Sécurité
- [ ] Validation email format
- [ ] Hash password avec bcrypt (cost ≥ 12)
- [ ] Rate limiting sur /auth/* (5 requêtes / 15 min)
- [ ] CORS configuré avec origins explicites
- [ ] Max 5 refresh tokens actifs par utilisateur

### Google OAuth
- [ ] Configuration Google OAuth
- [ ] Vérification du credential Google
- [ ] Création utilisateur si nouveau
- [ ] Liaison compte existant si email match

---

## 📚 Ressources

- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Nuxt Auth Patterns](https://nuxt.com/docs/guide/directory-structure/middleware)
