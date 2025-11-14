# 🌍 Guide i18n - AI Studio Photo

## 🚀 Installation

```bash
cd frontend
npm install
```

Le module `@nuxtjs/i18n` est déjà configuré dans `package.json`.

---

## 📁 Structure des fichiers

```
frontend/
├── i18n.config.ts          # Configuration Vue I18n
├── nuxt.config.ts           # Configuration Nuxt i18n
├── locales/
│   ├── fr.json             # Traductions françaises
│   └── en.json             # Traductions anglaises
└── docs/
    ├── i18n-inventory.md   # Inventaire complet
    └── i18n-guide.md       # Ce guide
```

---

## ⚙️ Configuration

### nuxt.config.ts
```ts
i18n: {
  locales: [
    { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json' },
    { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
  ],
  defaultLocale: 'fr',
  strategy: 'prefix_except_default',  // FR: /, EN: /en
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
  },
  langDir: 'locales/',
  lazy: true,
}
```

---

## 🎯 Utilisation dans les composants

### Template
```vue
<template>
  <div>
    <!-- Traduction simple -->
    <h1>{{ $t('hero.title') }}</h1>
    
    <!-- Traduction avec interpolation -->
    <p>{{ $t('common.welcome', { name: userName }) }}</p>
    
    <!-- Pluralisation -->
    <span>{{ $t('items', itemCount) }}</span>
    
    <!-- HTML dans les traductions -->
    <p v-html="$t('terms.text')"></p>
  </div>
</template>
```

### Script Setup
```vue
<script setup lang="ts">
const { t, locale, setLocale } = useI18n()

// Utiliser une traduction
const title = t('hero.title')

// Changer de langue
const switchLanguage = (lang: string) => {
  setLocale(lang)
}

// Obtenir la langue actuelle
console.log(locale.value) // 'fr' ou 'en'
</script>
```

---

## 🔄 Changement de langue

### Créer un sélecteur de langue

```vue
<template>
  <div class="language-selector">
    <button 
      v-for="loc in availableLocales" 
      :key="loc.code"
      @click="setLocale(loc.code)"
      :class="{ active: locale === loc.code }"
    >
      {{ loc.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>
```

---

## 📝 Structure des fichiers JSON

### Bonne pratique
```json
{
  "section": {
    "subsection": {
      "key": "Valeur traduite"
    }
  }
}
```

### Exemple
```json
{
  "hero": {
    "title": "Titre du hero",
    "cta": {
      "primary": "Bouton principal",
      "secondary": "Bouton secondaire"
    }
  }
}
```

---

## 🔗 Navigation multilingue

### NuxtLink avec i18n
```vue
<template>
  <!-- Lien vers la page d'accueil -->
  <NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink>
  
  <!-- Lien vers une route nommée -->
  <NuxtLink :to="localePath('features')">{{ $t('nav.features') }}</NuxtLink>
  
  <!-- Lien avec paramètres -->
  <NuxtLink :to="localePath({ name: 'blog-slug', params: { slug: 'article' } })">
    Article
  </NuxtLink>
</template>
```

### Changer de langue sur la même page
```vue
<template>
  <NuxtLink :to="switchLocalePath('en')">English</NuxtLink>
  <NuxtLink :to="switchLocalePath('fr')">Français</NuxtLink>
</template>
```

---

## 🎨 Exemple complet : Hero Section

### Avant (texte en dur)
```vue
<template>
  <section>
    <h1>Outils d'IA Génératifs Ultra Réalistes</h1>
    <p>Entrainez vos propres modèles d'IA LoRa...</p>
    <button>Commencez à créer gratuitement</button>
  </section>
</template>
```

### Après (avec i18n)
```vue
<template>
  <section>
    <h1>{{ $t('hero.title') }}</h1>
    <p>{{ $t('hero.subtitle') }}</p>
    <button>{{ $t('hero.ctaPrimary') }}</button>
  </section>
</template>
```

### Fichiers de traduction
```json
// fr.json
{
  "hero": {
    "title": "Outils d'IA Génératifs Ultra Réalistes",
    "subtitle": "Entrainez vos propres modèles d'IA LoRa...",
    "ctaPrimary": "Commencez à créer gratuitement"
  }
}

// en.json
{
  "hero": {
    "title": "Ultra-Realistic Generative AI Tools",
    "subtitle": "Train your own LoRa AI models...",
    "ctaPrimary": "Start creating for free"
  }
}
```

---

## 🔍 SEO multilingue

### Dans nuxt.config.ts
```ts
app: {
  head: {
    htmlAttrs: {
      lang: 'fr' // Sera automatiquement changé par i18n
    }
  }
}
```

### Balises hreflang (automatique avec i18n)
```html
<link rel="alternate" hreflang="fr" href="https://aistudiophoto.com/" />
<link rel="alternate" hreflang="en" href="https://aistudiophoto.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://aistudiophoto.com/" />
```

---

## 🧪 Tests

### Vérifier qu'une clé existe
```ts
const { te } = useI18n()

if (te('hero.title')) {
  console.log('La clé existe')
}
```

### Obtenir toutes les traductions
```ts
const { messages } = useI18n()
console.log(messages.value.fr) // Toutes les traductions FR
```

---

## 📊 Checklist de migration

### Pour chaque page/composant :

- [ ] Identifier tous les textes statiques
- [ ] Créer les clés dans fr.json et en.json
- [ ] Remplacer les textes par `$t('key')`
- [ ] Remplacer les NuxtLink par localePath()
- [ ] Tester en FR et EN
- [ ] Vérifier les URLs (/en/...)
- [ ] Vérifier le SEO (title, meta)

---

## 🐛 Problèmes courants

### La traduction ne s'affiche pas
```vue
<!-- ❌ Mauvais -->
<p>{{ $t('hero.titre') }}</p>

<!-- ✅ Bon -->
<p>{{ $t('hero.title') }}</p>
```
→ Vérifier l'orthographe de la clé

### Les liens ne fonctionnent pas
```vue
<!-- ❌ Mauvais -->
<NuxtLink to="/features">Features</NuxtLink>

<!-- ✅ Bon -->
<NuxtLink :to="localePath('/features')">{{ $t('nav.features') }}</NuxtLink>
```

### La langue ne change pas
```ts
// Vérifier que le cookie est bien défini
const { setLocale } = useI18n()
await setLocale('en') // Utiliser await
```

---

## 🎯 Prochaines étapes

1. **Installer les dépendances** : `npm install`
2. **Redémarrer le serveur** : `docker restart nuxt_go_frontend`
3. **Tester** : Accéder à `/` (FR) et `/en` (EN)
4. **Migrer progressivement** : Commencer par les pages principales
5. **Ajouter le sélecteur de langue** dans le header

---

## 📚 Ressources

- [Documentation @nuxtjs/i18n](https://i18n.nuxtjs.org/)
- [Vue I18n](https://vue-i18n.intlify.dev/)
- [Inventaire complet](./i18n-inventory.md)
