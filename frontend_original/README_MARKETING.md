# 🎨 Frontend Marketing - AI Studio Photo

Site vitrine inspiré de Pykaso.ai avec **Nuxt 3** et **NuxtUI**.

## 🚀 Démarrage

```bash
npm install
npm run dev
```

Ouvrir **http://localhost:3000**

---

## 📁 Structure

```
frontend/
├── app.vue                  # Point d'entrée
├── app.config.ts            # Config NuxtUI
├── nuxt.config.ts           # Config Nuxt
├── config/
│   └── site.config.ts       # ⚙️ Thème (couleurs, textes)
├── components/marketing/    # Composants
│   ├── AppHeader.vue        
│   ├── HeroSection.vue      
│   └── StatsSection.vue     
├── layouts/
│   └── marketing.vue        # Layout principal
└── pages/                   # Pages du site
    ├── index.vue            # Accueil
    ├── pricing.vue          # Tarifs
    ├── features.vue         # Fonctionnalités
    ├── help.vue             # Aide
    ├── blog.vue             
    ├── affiliation.vue      
    └── app/                 # App SaaS (à développer)
```

---

## 🎨 Configuration du thème

### Modifier les couleurs

Éditez `/config/site.config.ts` :

```typescript
theme: {
  primaryColor: '#4F46E5',     // Couleur principale
  secondaryColor: '#E0E7FF',   // Fond secondaire
  backgroundColor: '#F8FAFC',  // Fond principal
  textColor: '#1E293B',        // Texte
  accentColor: '#334155',      // Accent
}
```

### Changer les polices

1. Ajoutez le lien Google Fonts dans `nuxt.config.ts`
2. Modifiez `site.config.ts` :

```typescript
fonts: {
  heading: 'Poppins, sans-serif',
  body: 'Poppins, sans-serif',
}
```

### Modifier les textes

Dans `/config/site.config.ts`, modifiez :

```typescript
hero: {
  title: 'Votre titre',
  subtitle: 'Votre sous-titre',
  ctaPrimary: 'Texte du bouton',
  ctaSecondary: 'Texte du bouton secondaire',
}
```

---

## 📱 Pages disponibles

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil avec hero et stats |
| `/pricing` | Tarifs et offres |
| `/features` | Liste des fonctionnalités |
| `/help` | Centre d'aide |
| `/blog` | Blog (à compléter) |
| `/affiliation` | Programme d'affiliation |
| `/app/*` | Application SaaS (à développer) |

---

## 🧩 Composants NuxtUI utilisés

- **`UButton`** : Boutons stylisés
- **`UBadge`** : Badges et pills
- **Icônes** : Heroicons via `icon="i-heroicons-*"`

[Documentation NuxtUI](https://ui.nuxt.com)

---

## 🎯 Design Responsive

Le design est responsive par défaut :

- **Mobile** : < 768px (menu hamburger)
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

---

## 🔧 Technologies

- **Nuxt 3.x** - Framework Vue.js
- **NuxtUI 4.x** - Composants UI
- **TailwindCSS 4.x** - Styling
- **TypeScript** - Type safety
- **Pinia** - State management
- **@nuxt/image** - Optimisation d'images

---

## 📦 Prochaines étapes

1. **Intégration Stripe** pour les paiements
2. **Application SaaS** dans `/app/*`
3. **Authentification** avec JWT
4. **Backend API** en Go
5. **Contenu dynamique** pour le blog

---

## 📝 Notes

- Les couleurs sont configurables dans `site.config.ts`
- Les polices Google Fonts sont dans `nuxt.config.ts`
- Le design suit les principes de Pykaso.ai
- Tous les composants sont responsive

---

## 🐛 Debug

Si vous rencontrez des erreurs TypeScript, exécutez :

```bash
npm run postinstall
```

Pour reconstruire les types Nuxt.

---

## 📚 Documentation

- [Nuxt 3](https://nuxt.com)
- [NuxtUI](https://ui.nuxt.com)
- [TailwindCSS](https://tailwindcss.com)
- [Configuration thème](./THEME_CONFIG.md)
