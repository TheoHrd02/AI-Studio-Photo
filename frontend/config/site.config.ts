/** Nav item: id maps to nav.{id} for label; children use nav.{childId}.label / nav.{childId}.description */
export interface NavItem {
  id: string
  href?: string
  children?: {
    id: string
    href: string
    icon: string
  }[]
}

/** Footer column: id maps to footer.{columnId} for title; link id maps to footer.{columnId}Links.{linkId} */
export interface FooterColumn {
  id: string
  links: { id: string, href: string }[]
}

export interface SiteConfig {
  name: string
  description: string
  logo: string
  fonts: {
    heading: string
    body: string
  }
  hero: {
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
  /** Pre-launch: do NOT use on marketing pages. Post-launch: use real metrics only. */
  stats: {
    users: string
    generations: string
  }
  /** Single source of truth for header nav. Labels from i18n nav.* */
  navigation: NavItem[]
  /** Footer structure. Labels from i18n footer.* */
  footer: {
    columns: FooterColumn[]
    legal: { id: string, href: string }[]
  }
}

export const siteConfig: SiteConfig = {
  name: 'AI Studio Photo',
  description: 'Transformez vos photos produits en visuels studio professionnels grâce à l\'IA — en 30 secondes.',
  logo: '/logo.svg',

  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },

  hero: {
    title: 'Des photos produits professionnelles, générées par l\'IA en 30 secondes',
    subtitle: 'Transformez une simple photo produit en rendu studio haut de gamme. Sans photographe, sans studio, sans délai.',
    ctaPrimary: 'Commencer gratuitement — c\'est gratuit',
    ctaSecondary: 'Déjà un compte ? Se connecter',
  },

  stats: {
    users: '437,822',
    generations: '5,215,977',
  },

  navigation: [
    {
      id: 'features',
      children: [
        { id: 'studioVirtuel', href: '/features/studio-virtuel', icon: 'heroicons:camera' },
        { id: 'mannequinVirtuel', href: '/features/mannequin-virtuel', icon: 'heroicons:user-circle' },
        { id: 'motionStudio', href: '/features/motion-studio', icon: 'heroicons:play-circle' },
      ],
    },
    { id: 'gallery', href: '/gallery' },
    { id: 'pricing', href: '/pricing' },
    { id: 'help', href: '/help' },
  ],

  footer: {
    columns: [
      {
        id: 'product',
        links: [
          { id: 'features', href: '/features' },
          { id: 'pricing', href: '/pricing' },
          { id: 'api', href: '#' },
          { id: 'changelog', href: '#' },
        ],
      },
      {
        id: 'resources',
        links: [
          { id: 'helpCenter', href: '/help' },
          { id: 'blog', href: '/blog' },
          { id: 'documentation', href: '#' },
          { id: 'tutorials', href: '#' },
        ],
      },
      {
        id: 'company',
        links: [
          { id: 'about', href: '#' },
          { id: 'affiliation', href: '#' },
          { id: 'careers', href: '#' },
          { id: 'contact', href: '#' },
        ],
      },
    ],
    legal: [
      { id: 'terms', href: '#' },
      { id: 'privacy', href: '#' },
      { id: 'tos', href: '#' },
      { id: 'cookies', href: '#' },
    ],
  },
}

/** Features list derived from nav (single source). Use with t('nav.{id}.label'), t('nav.{id}.description') */
export const navFeatures = siteConfig.navigation.find(n => n.id === 'features')?.children ?? []
