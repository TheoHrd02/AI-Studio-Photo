/**
 * Configuration des vidéos du hero carousel
 * 
 * Pour de meilleures performances, utilisez:
 * - Format: MP4 (H.264) ou WebM
 * - Résolution: 1920x1080 (Full HD) maximum
 * - Durée: 10-15 secondes recommandé
 * - Taille: < 5MB par vidéo
 * 
 * Sources recommandées:
 * - Vimeo (avec URL direct)
 * - Cloudflare Stream
 * - AWS S3 + CloudFront
 * - Fichiers locaux dans /public/videos/
 */

export interface HeroVideoConfig {
  url: string
  alt?: string
}

export const heroVideos: HeroVideoConfig[] = [
  {
    url: 'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031098/hero-1_ngveqt.mp4',
    alt: 'Démonstration IA génération photo 1',
  },
  {
    url: 'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031099/hero-2_wx3qic.mp4',
    alt: 'Démonstration IA génération photo 2',
  },
  {
    url: 'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031098/hero-3_cz26fe.mp4',
    alt: 'Démonstration IA génération photo 3',
  },
  {
    url: 'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031098/hero-4_upmywa.mp4',
    alt: 'Démonstration IA génération photo 4',
  },
  {
    url: 'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031099/hero-5_jbzkkb.mp4',
    alt: 'Démonstration IA génération photo 5',
  }
]

// Intervalle de rotation des vidéos (en millisecondes)
export const videoRotationInterval = 6000 // 6 secondes
