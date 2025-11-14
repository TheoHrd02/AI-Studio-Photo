# 🎬 Vidéos Hero Carousel

Ce dossier contient les vidéos utilisées dans le carousel de la page d'accueil.

## 📋 Spécifications recommandées

### Format
- **Codec vidéo**: H.264 (MP4) ou VP9 (WebM)
- **Codec audio**: Aucun (les vidéos sont en mute)
- **Résolution**: 1920x1080 (Full HD) maximum
- **Ratio**: 16:9 recommandé
- **Durée**: 10-15 secondes par vidéo
- **Taille**: < 5MB par vidéo pour de meilleures performances

### Optimisation
```bash
# Exemple de compression avec ffmpeg
ffmpeg -i input.mp4 -vcodec h264 -crf 23 -preset slow -an -vf scale=1920:1080 output.mp4

# Pour créer une version WebM (meilleure compression)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an -vf scale=1920:1080 output.webm
```

## 📂 Structure

Placez vos vidéos ici avec des noms descriptifs :
- `hero-1.mp4` - Première vidéo du carousel
- `hero-2.mp4` - Deuxième vidéo
- `hero-3.mp4` - Troisième vidéo

## ⚙️ Configuration

Pour modifier les vidéos affichées, éditez le fichier :
`frontend/config/hero.config.ts`

```typescript
export const heroVideos: HeroVideoConfig[] = [
  {
    url: '/videos/hero-1.mp4',
    alt: 'Description de votre vidéo',
  },
  // Ajoutez d'autres vidéos...
]
```

## 🌐 Hébergement externe

Pour de meilleures performances en production, utilisez un CDN :

### Cloudflare Stream
```typescript
url: 'https://customer-XXXXX.cloudflarestream.com/VIDEO_ID/manifest/video.m3u8'
```

### Vimeo
```typescript
url: 'https://player.vimeo.com/progressive_redirect/playback/VIDEO_ID/rendition/720p/file.mp4'
```

### AWS S3 + CloudFront
```typescript
url: 'https://YOUR_CLOUDFRONT_DOMAIN.cloudfront.net/videos/hero-1.mp4'
```

## 🎯 Bonnes pratiques

1. ✅ Utilisez des vidéos courtes (10-15s) en loop
2. ✅ Compressez vos vidéos avant upload
3. ✅ Testez sur mobile (limite de bande passante)
4. ✅ Préférez un CDN pour la production
5. ✅ Utilisez un overlay sombre pour la lisibilité du texte
6. ❌ Évitez les vidéos > 10MB
7. ❌ Évitez les mouvements trop rapides
