/**
 * Visual proof configuration — single source of truth for before/after and feature screenshots.
 *
 * PRE-LAUNCH: Current values use Unsplash demo images to illustrate the transformation.
 * All visuals are framed as "Illustrative preview" / "capability demonstration" in the UI.
 *
 * POST-LAUNCH: Replace URLs with real AI Studio outputs when available.
 */

const UNSPLASH_BASE = 'https://images.unsplash.com'

const img = (id: string, w = 800, h = 600) =>
  `${UNSPLASH_BASE}/photo-${id}?w=${w}&h=${h}&fit=crop`

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
