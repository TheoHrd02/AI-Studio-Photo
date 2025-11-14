# 🎨 Guide d'utilisation du thème AI Studio Photo

Ce guide explique comment utiliser et maintenir le système de couleurs centralisé du projet.

---

## 📋 Configuration centralisée

Toutes les couleurs et variables de design sont définies dans **`config/theme.config.ts`**.

---

## 🎨 Palette de couleurs

### Couleur principale : **Blue**
- Utilisée pour les CTA, boutons principaux, liens
- Classes : `bg-blue-500`, `text-blue-600`, `border-blue-500`

### Couleur neutre : **Slate**
- Utilisée pour les backgrounds, cartes, inputs
- Classes : `bg-slate-100`, `dark:bg-slate-800`, `border-slate-200`

### Couleur d'accent : **Purple**
- Utilisée pour les gradients, éléments spéciaux
- Classes : `from-blue-500 to-purple-600`

---

## 📦 Classes Tailwind recommandées

### Backgrounds

#### Light mode
```html
<!-- Background principal -->
<div class="bg-white">

<!-- Background secondaire (cartes, sections) -->
<div class="bg-slate-100">

<!-- Input background -->
<input class="bg-slate-100">
```

#### Dark mode
```html
<!-- Background principal -->
<div class="dark:bg-slate-900">

<!-- Background secondaire -->
<div class="dark:bg-slate-800/50">

<!-- Input background -->
<input class="dark:bg-slate-800/50">
```

---

### Borders

```html
<!-- Bordure normale -->
<div class="border border-slate-200 dark:border-slate-700/50">

<!-- Bordure au hover (CTA) -->
<div class="hover:border-blue-500 dark:hover:border-blue-400">
```

---

### Textes

```html
<!-- Texte principal -->
<p class="text-gray-900 dark:text-white">

<!-- Texte secondaire -->
<p class="text-gray-700 dark:text-gray-300">

<!-- Texte tertiaire -->
<p class="text-gray-600 dark:text-gray-400">

<!-- Placeholder -->
<input class="placeholder:text-gray-500 dark:placeholder:text-gray-400">
```

---

### Boutons

```html
<!-- Bouton principal -->
<button class="bg-blue-600 text-white hover:bg-blue-700">
  Primary
</button>

<!-- Bouton secondaire -->
<button class="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
  Secondary
</button>
```

---

### Cards

```html
<!-- Card standard -->
<div class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5">
  Contenu
</div>

<!-- Card au hover -->
<div class="hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md">
  Contenu
</div>
```

---

### Inputs

```html
<!-- Input standard -->
<input 
  class="
    bg-slate-100 dark:bg-slate-800/50 
    text-gray-900 dark:text-white 
    border border-slate-200 dark:border-slate-700/50 
    rounded-xl 
    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
    placeholder:text-gray-500 dark:placeholder:text-gray-400
  "
>
```

---

## 🔄 Utilisation dans les composants

### Importer la configuration

```typescript
import { themeConfig } from '~/config/theme.config'

// Utiliser les couleurs
const primaryColor = themeConfig.colors.primary[500]
const bgDark = themeConfig.backgrounds.dark.secondary
```

### Exemple pratique

```vue
<script setup lang="ts">
import { themeConfig } from '~/config/theme.config'

const cardBg = computed(() => 
  isDark.value 
    ? themeConfig.backgrounds.dark.card 
    : themeConfig.backgrounds.light.card
)
</script>

<template>
  <div :style="{ backgroundColor: cardBg }">
    Carte avec couleur dynamique
  </div>
</template>
```

---

## 🎯 Conventions de nommage

### Classes Tailwind
- Toujours préfixer dark mode : `dark:bg-slate-800`
- Utiliser l'opacité quand nécessaire : `/50`, `/80`
- Grouper les classes par type : backgrounds → borders → text

### Exemple de structure
```html
<div class="
  bg-slate-100 dark:bg-slate-800/50
  border border-slate-200 dark:border-slate-700/50
  text-gray-900 dark:text-white
  rounded-xl p-4
  hover:border-blue-500 dark:hover:border-blue-400
  transition-all
">
```

---

## 🔧 Modifier le thème

### 1. Modifier les couleurs globales

Éditez `config/theme.config.ts` :

```typescript
export const themeConfig = {
  colors: {
    primary: {
      500: '#3b82f6',  // Changez cette valeur
    },
  },
}
```

### 2. Ajouter une nouvelle couleur

```typescript
export const themeConfig = {
  colors: {
    // ... couleurs existantes
    success: {
      500: '#10b981',
      600: '#059669',
    },
  },
}
```

### 3. Utiliser la nouvelle couleur

```html
<button class="bg-green-500 hover:bg-green-600">
  Succès
</button>
```

---

## 📊 Mapping des couleurs

| Élément | Light Mode | Dark Mode |
|---------|------------|-----------|
| **Page background** | `bg-white` | `dark:bg-slate-900` |
| **Card background** | `bg-white` | `dark:bg-slate-800/80` |
| **Input background** | `bg-slate-100` | `dark:bg-slate-800/50` |
| **Question cards** | `bg-slate-100` | `dark:bg-slate-800/50` |
| **Borders** | `border-slate-200` | `dark:border-slate-700/50` |
| **Text primary** | `text-gray-900` | `dark:text-white` |
| **Text secondary** | `text-gray-700` | `dark:text-gray-300` |
| **Button primary** | `bg-blue-600` | `bg-blue-600` |
| **Button hover** | `hover:bg-blue-700` | `hover:bg-blue-700` |

---

## ✅ Checklist avant d'ajouter un nouveau composant

- [ ] Utiliser les couleurs slate pour les backgrounds
- [ ] Préfixer toutes les classes dark mode avec `dark:`
- [ ] Utiliser les opacités (`/50`, `/80`) pour les overlays
- [ ] Ajouter les transitions : `transition-all`
- [ ] Tester en light et dark mode
- [ ] Vérifier le contraste des textes (accessibilité)
- [ ] Utiliser les border-radius cohérents (`rounded-xl`)

---

## 🚀 Exemples complets

### Composant Card

```vue
<template>
  <div class="
    bg-white dark:bg-slate-800/80
    border border-slate-200 dark:border-slate-700/50
    rounded-xl p-5
    hover:border-blue-500 dark:hover:border-blue-400
    hover:shadow-md
    transition-all
  ">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      Titre
    </h3>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Description
    </p>
  </div>
</template>
```

### Composant Button

```vue
<template>
  <button class="
    px-6 py-3
    bg-blue-600 text-white
    rounded-xl
    hover:bg-blue-700
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all
  ">
    <slot />
  </button>
</template>
```

---

## 📝 Notes importantes

1. **Toujours préfixer dark mode** : Ne jamais oublier `dark:` pour les styles dark mode
2. **Utiliser slate pour les backgrounds** : Plus moderne que gray
3. **Opacité pour les overlays** : `/50` ou `/80` pour des effets de profondeur
4. **Transitions partout** : Pour une expérience fluide
5. **Tester l'accessibilité** : Vérifier les contrastes de couleurs

---

**Consultez `theme.config.ts` pour la source de vérité des couleurs ! 🎨**
