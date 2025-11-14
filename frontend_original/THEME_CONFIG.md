# 🎨 Configuration du Thème

Ce fichier explique comment personnaliser l'apparence du site marketing AI Studio Photo.

## 📁 Fichier de configuration

Le fichier principal de configuration se trouve dans `/config/site.config.ts`.

## ⚙️ Options disponibles

### 🎨 Couleurs du thème

```typescript
theme: {
  primaryColor: '#4F46E5',    // Couleur principale (boutons, liens)
  secondaryColor: '#E0E7FF',  // Couleur de fond secondaire
  backgroundColor: '#F8FAFC',  // Couleur de fond principale
  textColor: '#1E293B',        // Couleur du texte
  accentColor: '#334155',      // Couleur d'accent
}
```

### 🔤 Polices d'écriture

```typescript
fonts: {
  heading: 'Inter, sans-serif',  // Police pour les titres
  body: 'Inter, sans-serif',     // Police pour le corps de texte
}
```

Pour changer de police :
1. Ajoutez le lien Google Fonts dans `nuxt.config.ts` > `app.head.link`
2. Modifiez les valeurs dans `site.config.ts`

Exemple pour utiliser Poppins :
```typescript
// nuxt.config.ts
link: [
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap' }
]

// site.config.ts
fonts: {
  heading: 'Poppins, sans-serif',
  body: 'Poppins, sans-serif',
}
```

### 📝 Contenu du Hero

```typescript
hero: {
  title: 'Outils d\'IA Génératifs Ultra Réalistes',
  subtitle: 'Entrainez vos propres modèles d\'IA...',
  ctaPrimary: 'Commence à créer gratuitement',
  ctaSecondary: 'Rejoins avec Google',
}
```

### 📊 Statistiques

```typescript
stats: {
  users: '437,822',
  generations: '5,215,977',
}
```

### 🧭 Navigation

```typescript
navigation: [
  { label: 'Outils IA', href: '/features' },
  { label: 'Prix', href: '/pricing' },
  // ...
]
```

## 🚀 Utilisation

Le fichier de configuration est automatiquement importé dans tous les composants marketing :

```typescript
import { siteConfig } from '~/config/site.config'
```

## 📱 Responsive

Le design est entièrement responsive et s'adapte automatiquement :
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## 🎯 Composants disponibles

- **`AppHeader`** : En-tête avec navigation
- **`HeroSection`** : Section hero avec CTA
- **`StatsSection`** : Section statistiques

## 🔧 TailwindCSS

Les composants utilisent TailwindCSS 4.x avec les classes utilitaires. Vous pouvez personnaliser davantage via le fichier `tailwind.config.js`.

## 📦 NuxtUI

Les boutons et badges utilisent les composants NuxtUI :
- `UButton` : Boutons stylisés
- `UBadge` : Badges et pills
- Icônes : Heroicons via `icon="i-heroicons-*"`
