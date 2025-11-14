# 🎬 Hero Video Carousel - Documentation

## 📋 Vue d'ensemble

Système de carousel vidéo en background pour la page d'accueil avec rotation automatique, optimisé pour les performances et la lisibilité.

## 🏗️ Architecture

### Composants créés

1. **`components/features/VideoCarousel.vue`**
   - Gère la rotation automatique des vidéos
   - Transitions fluides avec fade in/out
   - Preload intelligent de la prochaine vidéo
   - Overlay sombre pour améliorer la lisibilité du texte

2. **`config/hero.config.ts`**
   - Configuration centralisée des vidéos
   - Interface TypeScript typée
   - Paramètres de rotation configurables

3. **`components/marketing/HeroSection.vue`** (modifié)
   - Hero section plein écran (100vh - navbar)
   - Contenu positionné au-dessus de la vidéo
   - Texte blanc avec ombres pour lisibilité
   - Boutons avec effets glassmorphism

## 🎨 Caractéristiques

### ✨ Fonctionnalités
- ✅ Auto-rotation des vidéos (configurable)
- ✅ Transitions fluides (1s fade)
- ✅ Overlay sombre (40% opacité)
- ✅ Responsive (mobile + desktop)
- ✅ Preload optimisé
- ✅ Videos en boucle et muted
- ✅ Z-index gestion optimale

### 🎯 Performance
- Preload uniquement de la vidéo courante + suivante
- Attribute `playsinline` pour iOS
- Attribute `muted` pour autoplay sur tous navigateurs
- Compression recommandée < 5MB par vidéo

## 📦 Utilisation

### 1. Ajouter vos vidéos

Placez vos vidéos dans `frontend/public/videos/`:
```
frontend/public/videos/
├── hero-1.mp4
├── hero-2.mp4
└── hero-3.mp4
```

### 2. Configurer les URLs

Éditez `frontend/config/hero.config.ts`:

```typescript
export const heroVideos: HeroVideoConfig[] = [
  {
    url: '/videos/hero-1.mp4',
    alt: 'Génération IA de portraits',
  },
  {
    url: '/videos/hero-2.mp4',
    alt: 'Upscaling IA 4K',
  },
  {
    url: '/videos/hero-3.mp4',
    alt: 'Text to Image',
  },
]

// Intervalle de rotation (millisecondes)
export const videoRotationInterval = 6000 // 6 secondes
```

### 3. Utilisation avec CDN (Production)

```typescript
export const heroVideos: HeroVideoConfig[] = [
  {
    url: 'https://cdn.votresite.com/videos/hero-1.mp4',
    alt: 'Description',
  },
]
```

## 🎬 Optimisation des vidéos

### Compression avec FFmpeg

```bash
# Compression MP4 optimisée
ffmpeg -i input.mp4 \
  -vcodec h264 \
  -crf 23 \
  -preset slow \
  -an \
  -vf scale=1920:1080 \
  output.mp4

# Compression WebM (meilleure compression)
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -an \
  -vf scale=1920:1080 \
  output.webm
```

### Spécifications recommandées
- **Format**: MP4 (H.264) ou WebM (VP9)
- **Résolution**: 1920x1080 max
- **Durée**: 10-15 secondes
- **Taille**: < 5MB par vidéo
- **FPS**: 24-30
- **Pas d'audio** (économise de la bande passante)

## 🌐 Hébergement

### Options recommandées

1. **Cloudflare Stream** (recommandé)
   - Streaming adaptatif
   - CDN global
   - Analytics inclus
   
2. **AWS S3 + CloudFront**
   - Contrôle total
   - Prix compétitifs
   - Cache global

3. **Vimeo**
   - Simple à utiliser
   - Bonne compression
   - Player intégré

## 🎨 Personnalisation

### Modifier l'overlay
Dans `VideoCarousel.vue` ligne 48:
```vue
<div class="absolute inset-0 bg-black/40 z-10" />
```
Changez `/40` pour ajuster l'opacité (0-100).

### Modifier la durée de transition
Dans `VideoCarousel.vue` ligne 54:
```vue
class="... transition-opacity duration-1000"
```
Changez `duration-1000` (1s) à votre convenance.

### Modifier l'intervalle de rotation
Dans `hero.config.ts`:
```typescript
export const videoRotationInterval = 6000 // millisecondes
```

### Modifier la hauteur du hero
Dans `HeroSection.vue` ligne 10:
```vue
class="relative h-screen min-h-[600px] ..."
```
- `h-screen` = pleine hauteur de l'écran (100vh)
- `min-h-[600px]` = hauteur minimale
- La vidéo passe **derrière la navbar** pour un effet immersif

## 🔧 Démarrage

### 1. Installer les dépendances (si nécessaire)
```bash
cd frontend
npm install
```

### 2. Ajouter vos vidéos
Placez vos fichiers `.mp4` dans `frontend/public/videos/`

### 3. Lancer le serveur de dev
```bash
npm run dev
```

### 4. Tester
Visitez `http://localhost:3000`

## 📱 Responsive

Le carousel s'adapte automatiquement :
- **Desktop**: Pleine hauteur avec overlay
- **Tablet**: Hauteur ajustée, texte responsive
- **Mobile**: Hauteur minimale 600px, vidéo centrée

## 🐛 Troubleshooting

### Les vidéos ne se chargent pas
1. Vérifiez que les fichiers existent dans `/public/videos/`
2. Vérifiez les URLs dans `hero.config.ts`
3. Ouvrez la console navigateur pour les erreurs

### Les vidéos ne s'auto-play pas
- Assurez-vous que `muted` est présent
- Sur iOS, vérifiez que `playsinline` est présent
- Certains navigateurs bloquent l'autoplay

### Performance lente
1. Compressez vos vidéos (cible < 5MB)
2. Utilisez un CDN en production
3. Réduisez la résolution à 1080p max

### Le texte n'est pas lisible
Augmentez l'opacité de l'overlay dans `VideoCarousel.vue`:
```vue
<div class="absolute inset-0 bg-black/60 z-10" />
```

## 📚 Ressources

- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [Cloudflare Stream](https://www.cloudflare.com/products/cloudflare-stream/)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [TailwindCSS](https://tailwindcss.com/docs)

## 🎉 C'est prêt !

Votre carousel vidéo est maintenant opérationnel. Ajoutez vos vidéos et profitez d'un hero section moderne et engageant ! 🚀
