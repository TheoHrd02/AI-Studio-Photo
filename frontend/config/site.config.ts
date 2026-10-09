import type { AppLegalDoc } from './saas.config'

/** Nav item: id maps to nav.{id} for label; children use nav.{childId}.label / nav.{childId}.description */
export interface NavItem {
  id: string
  href?: string
  children?: {
    id: string
    href: string
    icon: string
    /** Studio not open in the app yet: "coming soon" badge, no sign-up CTA for it */
    comingSoon?: boolean
  }[]
}

/**
 * Footer column: id maps to footer.{columnId} for title; link id maps to footer.{columnId}Links.{linkId}.
 * Real pages only, never a "#" placeholder; a column without links is not rendered.
 */
export interface FooterColumn {
  id: string
  links: { id: string, href: string }[]
}

export interface SiteConfig {
  /** Single source of truth for header nav. Labels from i18n nav.* */
  navigation: NavItem[]
  /** Footer structure. Labels from i18n footer.* */
  footer: {
    columns: FooterColumn[]
    /** Legal texts hosted by the app (single source). Label: footer.legalLinks.{doc}; URL: useAppLinks().legalUrl(doc) */
    legal: AppLegalDoc[]
  }
}

export const siteConfig: SiteConfig = {
  navigation: [
    {
      id: 'features',
      children: [
        { id: 'studioVirtuel', href: '/features/studio-virtuel', icon: 'heroicons:camera' },
        // Disabled in the app (AI-Studio-Photo-App backend/config/models.json: mannequin.disabled = true)
        { id: 'mannequinVirtuel', href: '/features/mannequin-virtuel', icon: 'heroicons:user-circle', comingSoon: true },
        { id: 'motionStudio', href: '/features/motion-studio', icon: 'heroicons:play-circle' },
      ],
    },
    { id: 'gallery', href: '/gallery' },
    { id: 'help', href: '/help' },
  ],

  footer: {
    columns: [
      {
        id: 'product',
        links: [
          { id: 'features', href: '/features' },
        ],
      },
      {
        id: 'resources',
        links: [
          { id: 'helpCenter', href: '/help' },
          { id: 'blog', href: '/blog' },
        ],
      },
      {
        id: 'company',
        links: [
          { id: 'contact', href: '/help#contact' },
        ],
      },
    ],
    legal: ['notice', 'terms', 'sales', 'privacy', 'cookies', 'acceptable-use'],
  },
}

/** Features list derived from nav (single source). Use with t('nav.{id}.label'), t('nav.{id}.description') */
export const navFeatures = siteConfig.navigation.find(n => n.id === 'features')?.children ?? []

/** True when the studio is not open in the app yet (see navigation.children[].comingSoon) */
export const isComingSoon = (id: string) => navFeatures.find(f => f.id === id)?.comingSoon ?? false
