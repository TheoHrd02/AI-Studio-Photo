# Frontend Marketing - AI Studio Photo

Site vitrine inspiré de Pykaso.ai avec **Nuxt 3** et **NuxtUI**.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir **http://localhost:3000**

---

## Structure Propre

```
frontend/
├── app.vue                    # Point d'entrée Nuxt
├── app.config.ts              # Configuration NuxtUI
├── nuxt.config.ts             # Configuration Nuxt
│
├── config/
│   ├── site.config.ts         # Configuration du thème
│   └── hero.config.ts         # Configuration vidéos hero
│
├── composables/
│   ├── useAuth.ts             # 🔐 Authentification JWT
│   └── useCloudinary.ts       # Upload Cloudinary
│
├── middleware/
│   └── auth.ts                # 🛡️ Protection des routes
│
├── components/
│   ├── marketing/             # Composants site vitrine
│   │   ├── AppHeader.vue      # Header avec navigation
│   │   ├── HeroSection.vue    # Section hero
│   │   └── StatsSection.vue   # Statistiques
│   └── features/              # Composants fonctionnels
│       ├── VideoCarousel.vue  # Carousel vidéos
│       └── CloudinaryUpload.vue
│
├── layouts/
│   └── marketing.vue          # Layout principal
│
└── pages/                     # Pages du site
    ├── index.vue              # Accueil
    ├── pricing.vue            # Tarifs
    ├── features.vue           # Fonctionnalités
    ├── help.vue               # Centre d'aide
    ├── blog.vue               # Blog
    ├── affiliation.vue        # Affiliation
    ├── login.vue              # 🔐 Connexion
    ├── signup.vue             # 🔐 Inscription
    └── app/
        └── index.vue          # 🔒 App SaaS (protégé)
```

---

## Personnalisation

Modifier **`config/site.config.ts`** :

```typescript
export const siteConfig = {
  name: 'AI Studio Photo',
  theme: {
    primaryColor: '#4F46E5',    // Indigo
    secondaryColor: '#E0E7FF',
    // ...
  },
  hero: {
    title: 'Outils d\'IA Génératifs Ultra Réalistes',
    subtitle: 'Entrainez vos propres modèles...',
    // ...
  }
}
```

---

## 🔐 Authentification

Le système d'authentification est **complet et opérationnel**.

### Fonctionnalités
- ✅ Login email/password
- ✅ Inscription avec validation
- ✅ Google OAuth (préparé)
- ✅ JWT Access Token (15 min)
- ✅ Refresh Token (7 jours, httpOnly cookie)
- ✅ Protection des routes avec middleware
- ✅ Déconnexion sécurisée

### Composable `useAuth`
```typescript
const { user, isAuthenticated, login, logout } = useAuth()

// Connexion
await login('email@example.com', 'password')

// Déconnexion
await logout()
```

### Protection des routes
```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth', // 🛡️ Route protégée
})
</script>
```

📖 **Documentation complète** : Voir [AUTHENTICATION.md](./AUTHENTICATION.md)

---

## Pages Disponibles

### Pages publiques (sans authentification)
- `/` - Page d'accueil
- `/pricing` - Tarifs  
- `/features` - Fonctionnalités
- `/help` - Centre d'aide
- `/blog` - Blog
- `/affiliation` - Programme d'affiliation
- `/login` - Connexion 🔐
- `/signup` - Inscription 🔐

### Pages protégées (authentification requise)
- `/app` - Dashboard SaaS 🔒

---

## Stack Technique

- **Nuxt 3** - Framework Vue.js
- **NuxtUI** - Composants UI
- **TailwindCSS** - Styles
- **TypeScript** - Types
- **Pinia** - State management

---

## Corrections Appliquées

- Structure Nuxt 3 standard  
- `app.vue` à la racine  
- Composants avec préfixe `Marketing`  
- Erreur d'hydratation corrigée (`ClientOnly` + `v-show`)  
- Couleurs UButton corrigées (`neutral` au lieu de `gray`)  

---

## 🌍 Variables d'environnement

Créer un fichier `.env` à la racine du frontend :

```env
# API publique (client-side)
NUXT_PUBLIC_API_BASE=http://localhost:8080/api/v1

# API pour BFF (server-side only)
NUXT_GO_API_URL=http://backend:8080/api/v1

# URL du site
NUXT_PUBLIC_SITE_URL=https://aistudiophoto.com
```

Voir `.env.example` pour le template.

---

## Documentation

- [🔐 Authentification](./AUTHENTICATION.md) - Guide complet d'authentification
- [🎨 Configuration Thème](./THEME_CONFIG.md) - Personnalisation du thème
- [📋 Changelog Priorité 1](./CHANGELOG_PRIORITY_1.md) - Modifications récentes
- [Nuxt 3](https://nuxt.com)
- [NuxtUI](https://ui.nuxt.com)
- [TailwindCSS](https://tailwindcss.com)
