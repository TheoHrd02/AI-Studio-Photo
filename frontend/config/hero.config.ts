/**
 * Configuration des vidéos du hero carousel.
 *
 * Performance notes:
 * - Format: MP4 (H.264) — maximum compatibility
 * - Résolution: 1920×1080 max (enforced via Cloudinary c_limit)
 * - Taille cible: < 3 MB / vidéo (q_auto:good réduit de ~40–60%)
 * - Durée recommandée: 10–15 secondes
 *
 * The `opt()` helper injects Cloudinary video transformation params.
 * On first request Cloudinary transcodes on-the-fly then caches on CDN.
 * Warm up all URLs in production before launch to avoid the first-hit penalty.
 */

export interface HeroVideoConfig {
  url: string
  alt?: string
}

/**
 * Appends Cloudinary video optimisation params between /upload/ and the version.
 *   q_auto:good  — adaptive quality (~40-60% smaller, visually lossless at viewport scale)
 *   w_1920       — cap width to 1920 px (avoids serving 4K sources)
 *   c_limit      — only downscale, never upscale
 */
const opt = (url: string): string =>
  url.replace('/upload/', '/upload/q_auto:good,w_1920,c_limit/')

const RAW_VIDEOS = [
  'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031099/hero-2_wx3qic.mp4',
  'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031098/hero-3_cz26fe.mp4',
  'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031098/hero-4_upmywa.mp4',
  'https://res.cloudinary.com/dfk9cemb0/video/upload/v1760031099/hero-5_jbzkkb.mp4',
]

export const heroVideos: HeroVideoConfig[] = [
  { url: opt(RAW_VIDEOS[0]), alt: 'Démonstration IA génération photo 1' },
  { url: opt(RAW_VIDEOS[1]), alt: 'Démonstration IA génération photo 2' },
  { url: opt(RAW_VIDEOS[2]), alt: 'Démonstration IA génération photo 3' },
  { url: opt(RAW_VIDEOS[3]), alt: 'Démonstration IA génération photo 4' },
]

/** URL of the first video — exported for SSR preload hint in HeroSection */
export const firstVideoUrl = heroVideos[0].url

/** Rotation interval in ms */
export const videoRotationInterval = 6000
