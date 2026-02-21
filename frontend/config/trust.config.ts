/**
 * Pre-launch trust configuration.
 *
 * Use this config to control transparency anchoring and builder credibility
 * without fabricating social proof.
 *
 * When the product launches with real traction:
 * - Set preLaunch to false
 * - Update socialProof in locales to show real metrics
 * - Optionally add founder/philosophy content
 */

export interface TrustConfig {
  /** When true: hide inflated metrics, show "Early access" framing */
  preLaunch: boolean

  /** Tier B — Builder credibility (optional, for future use) */
  founder?: {
    name: string
    role?: string
    /** Short "why we built this" — keep honest, no hype */
    philosophy?: string
  }

  /** Tier C — Product legitimacy (optional) */
  roadmapUrl?: string
  showEarlyAccessBadge?: boolean
}

export const trustConfig: TrustConfig = {
  preLaunch: true,
  showEarlyAccessBadge: true,
  // roadmapUrl: '/roadmap', // Uncomment when roadmap page exists
  // founder: { name: '...', role: '...', philosophy: '...' },
}
