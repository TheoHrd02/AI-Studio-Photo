/**
 * Visual proof configuration — single source of truth for before/after, feature screenshots, and gallery.
 *
 * PRE-LAUNCH: Current values use Unsplash demo images to illustrate the transformation.
 * All visuals are framed as "Illustrative preview" / "capability demonstration" in the UI.
 *
 * POST-LAUNCH: Replace URLs with real AI Studio outputs when available.
 */

const UNSPLASH_BASE = 'https://images.unsplash.com'
const PEXELS_VIDEO = 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4'
const CLOUDINARY_BASE = 'https://res.cloudinary.com/dfk9cemb0/video/upload'

const img = (id: string, w = 800, h = 600) =>
  `${UNSPLASH_BASE}/photo-${id}?w=${w}&h=${h}&fit=crop`

/** Fallback when asset fails to load — neutral placeholder */
export const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"%3E%3Crect fill="%23f3f4f6" width="600" height="800"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E'

// ─── Before/After Section (Homepage) ───────────────────────────────────────

export interface BeforeAfterItem {
  before: { src: string, alt: string }
  after: { src: string, alt: string }
  label?: string
}

export const beforeAfterExamples: BeforeAfterItem[] = [
  {
    before: {
      src: img('1523275335684-37898b6baf30'),
      alt: 'Photo produit brute — fond blanc, éclairage plat',
    },
    after: {
      src: img('1542291026-7eec264c27ff'),
      alt: 'Résultat AI Studio — décor studio, éclairage professionnel',
    },
    label: 'Studio Virtuel',
  },
  {
    before: {
      src: img('1560343090-f0409e92791a'),
      alt: 'Chaussure isolée sur fond neutre',
    },
    after: {
      src: img('1549298916-b41d501d3772'),
      alt: 'Chaussure en scène lifestyle avec mannequin',
    },
    label: 'Mannequin Virtuel',
  },
  {
    before: {
      src: img('1505740420928-5e560c06d30e'),
      alt: 'Produit statique — casque audio',
    },
    after: {
      src: img('1460353581641-37baddab0fa2'),
      alt: 'Produit en mouvement — animation vidéo IA',
    },
    label: 'Motion Studio',
  },
]

// ─── Feature Page Screenshots ───────────────────────────────────────────────
// Each feature demonstrates: interface | workflow | output
// Replace with real product screenshots when available.

export interface FeatureVisuals {
  /** Interface screenshot — main tool UI */
  interface: string
  /** Workflow screenshot — steps in action */
  workflow: string
  /** Output result — example of generated content */
  output: string
  /** Optional: before image for transformation clarity (before/after in Concept section) */
  before?: string
}

export const featureVisuals: Record<string, FeatureVisuals> = {
  studioVirtuel: {
    interface: img('1556742049-0cfed4f6a45d', 800, 500),
    workflow: img('1556742111-a30106d76975', 800, 500),
    output: img('1542291026-7eec264c27ff'),
    before: img('1523275335684-37898b6baf30'),
  },
  mannequinVirtuel: {
    interface: img('1557804506-669a67965ba0', 800, 500),
    workflow: img('1556761175-b413da4baf72', 800, 500),
    output: img('1549298916-b41d501d3772'),
    before: img('1560343090-f0409e92791a'),
  },
  motionStudio: {
    interface: img('1574717024653-430fd2e73122', 800, 500),
    workflow: img('1611162616475-46b635cb6868', 800, 500),
    output: img('1460353581641-37baddab0fa2'),
    before: img('1505740420928-5e560c06d30e'),
  },
}

// ─── Gallery (Proof page) ───────────────────────────────────────────────────
// Mix of images and videos — config-driven, no inline URLs in gallery.vue

export interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt: string
}

export const galleryItems: GalleryItem[] = [
  { type: 'image', src: img('1523275335684-37898b6baf30', 600, 800), alt: 'Produit 1' },
  { type: 'video', src: PEXELS_VIDEO, alt: 'Vidéo produit 1' },
  { type: 'image', src: img('1505740420928-5e560c06d30e', 600, 800), alt: 'Produit 2' },
  { type: 'video', src: `${CLOUDINARY_BASE}/v1760031099/hero-2_wx3qic.mp4`, alt: 'Produit 3' },
  { type: 'video', src: `${CLOUDINARY_BASE}/v1760031098/hero-3_cz26fe.mp4`, alt: 'Vidéo produit 2' },
  { type: 'image', src: img('1560343090-f0409e92791a', 600, 800), alt: 'Produit 4' },
  { type: 'image', src: img('1542291026-7eec264c27ff', 600, 800), alt: 'Produit 5' },
  { type: 'image', src: img('1549298916-b41d501d3772', 600, 800), alt: 'Produit 6' },
  { type: 'video', src: `${CLOUDINARY_BASE}/v1760031099/hero-2_wx3qic.mp4`, alt: 'Vidéo produit 3' },
  { type: 'image', src: img('1595950653106-6c9ebd614d3a', 600, 800), alt: 'Produit 7' },
  { type: 'image', src: img('1460353581641-37baddab0fa2', 600, 800), alt: 'Produit 8' },
  { type: 'image', src: img('1511556532299-8f662fc26c06', 600, 800), alt: 'Produit 9' },
  { type: 'video', src: `${CLOUDINARY_BASE}/v1760031098/hero-4_upmywa.mp4`, alt: 'Produit 10' },
  { type: 'video', src: `${CLOUDINARY_BASE}/v1760031099/hero-2_wx3qic.mp4`, alt: 'Produit 11' },
]
