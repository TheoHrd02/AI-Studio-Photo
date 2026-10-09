/**
 * Visual proof configuration — single source of truth for before/after, feature screenshots, and gallery.
 *
 * PRE-LAUNCH: Current values use Unsplash demo images to illustrate the transformation.
 * All visuals are framed as "Illustrative preview" / "capability demonstration" in the UI.
 *
 * POST-LAUNCH: Replace URLs with real AI Studio outputs when available.
 *
 * INTERFACE SCREENSHOTS — pending, supplied by the owner (never fake ones). Drop these files, then change the lines:
 *   frontend/public/screenshots/studio-virtuel-interface.webp     app page /dashboard/studio-virtuel
 *   frontend/public/screenshots/mannequin-virtuel-interface.webp  app page /dashboard/mannequin-virtuel (model profile)
 *   frontend/public/screenshots/motion-studio-interface.webp      app page /dashboard/motion-studio (animation style)
 * Format: WebP, 1600×1200 (4:3: the feature page shows them in a 4:3 frame with object-cover, so another ratio is
 * cropped), under ~300 KB, no personal data (real email, org name) on screen, ideally the French interface.
 * Then, in featureVisuals below, for each studio:
 *   interface: '/screenshots/studio-virtuel-interface.webp',
 *   workflow: '/screenshots/studio-virtuel-interface.webp',
 * Only `workflow` is displayed (FeaturePageTemplate, "how it works" section; alt: featurePages.{studio}.workflowImageAlt).
 * Served by the site itself: allowed by the CSP (img-src 'self'), nothing else to configure.
 */

const UNSPLASH_BASE = 'https://images.unsplash.com'
const PEXELS_VIDEO = 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4'
const CLOUDINARY_BASE = 'https://res.cloudinary.com/dfk9cemb0/video/upload'

const img = (id: string, w = 800, h = 600) =>
  `${UNSPLASH_BASE}/photo-${id}?w=${w}&h=${h}&fit=crop`

/** Fallback when asset fails to load — neutral placeholder */
export const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"%3E%3Crect fill="%23f3f4f6" width="600" height="800"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E'

// ─── Before/After Section (Homepage) ───────────────────────────────────────

/** key -> label nav.{key}.label, alts beforeAfter.examples.{key}.before / .after */
export interface BeforeAfterItem {
  key: 'studioVirtuel' | 'mannequinVirtuel' | 'motionStudio'
  before: string
  after: string
}

export const beforeAfterExamples: BeforeAfterItem[] = [
  { key: 'studioVirtuel', before: img('1523275335684-37898b6baf30'), after: img('1542291026-7eec264c27ff') },
  { key: 'mannequinVirtuel', before: img('1560343090-f0409e92791a'), after: img('1549298916-b41d501d3772') },
  { key: 'motionStudio', before: img('1505740420928-5e560c06d30e'), after: img('1460353581641-37baddab0fa2') },
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

/** Alt text is localized in gallery.vue (gallery.imageAlt / gallery.videoAlt + index) */
export interface GalleryItem {
  type: 'image' | 'video'
  src: string
}

export const galleryItems: GalleryItem[] = [
  { type: 'image', src: img('1523275335684-37898b6baf30', 600, 800) },
  { type: 'video', src: PEXELS_VIDEO },
  { type: 'image', src: img('1505740420928-5e560c06d30e', 600, 800) },
  { type: 'video', src: `${CLOUDINARY_BASE}/v1760031099/hero-2_wx3qic.mp4` },
  { type: 'video', src: `${CLOUDINARY_BASE}/v1760031098/hero-3_cz26fe.mp4` },
  { type: 'image', src: img('1560343090-f0409e92791a', 600, 800) },
  { type: 'image', src: img('1542291026-7eec264c27ff', 600, 800) },
  { type: 'image', src: img('1549298916-b41d501d3772', 600, 800) },
  { type: 'video', src: `${CLOUDINARY_BASE}/v1760031099/hero-2_wx3qic.mp4` },
  { type: 'image', src: img('1595950653106-6c9ebd614d3a', 600, 800) },
  { type: 'image', src: img('1460353581641-37baddab0fa2', 600, 800) },
  { type: 'image', src: img('1511556532299-8f662fc26c06', 600, 800) },
  { type: 'video', src: `${CLOUDINARY_BASE}/v1760031098/hero-4_upmywa.mp4` },
  { type: 'video', src: `${CLOUDINARY_BASE}/v1760031099/hero-2_wx3qic.mp4` },
]
