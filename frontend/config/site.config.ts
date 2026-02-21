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
  features: {
    title: string
    description: string
    href: string
    icon: string
  }[]
  /** Pre-launch: do NOT use on marketing pages. Post-launch: use real metrics only. */
  stats: {
    users: string
    generations: string
  }
  navigation: {
    label: string
    href?: string
    children?: {
      label: string
      description: string
      href: string
      icon: string
    }[]
  }[]
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
  
  features: [
    {
      title: 'Studio Virtuel',
      description: 'Transformez un simple visuel produit en une scène photo haut de gamme, en quelques secondes.',
      href: '/features/studio-virtuel',
      icon: 'heroicons:camera',
    },
    {
      title: 'Mannequin Virtuel',
      description: 'Ajoutez des mannequins virtuels à vos produits pour raconter une histoire, créer de l\'émotion et générer l\'engagement.',
      href: '/features/mannequin-virtuel',
      icon: 'heroicons:user-circle',
    },
    {
      title: 'Motion Studio',
      description: 'Transformez vos visuels statiques en vidéos dynamiques pour vos campagnes et réseaux sociaux.',
      href: '/features/motion-studio',
      icon: 'heroicons:play-circle',
    },
  ],
  
  stats: {
    users: '437,822',
    generations: '5,215,977',
  },
  
  navigation: [
    { 
      label: 'Fonctionnalités',
      children: [
        {
          label: 'Studio Virtuel',
          description: 'Placez vos produits dans des décors dignes des plus grands studios photo.',
          href: '/features/studio-virtuel',
          icon: 'heroicons:camera',
        },
        {
          label: 'Mannequin Virtuel',
          description: 'Humanisez vos visuels avec des mannequins réalistes et personnalisés.',
          href: '/features/mannequin-virtuel',
          icon: 'heroicons:user-circle',
        },
        {
          label: 'Motion Studio',
          description: 'Passez de l\'image au mouvement en un clic.',
          href: '/features/motion-studio',
          icon: 'heroicons:play-circle',
        },
      ],
    },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Help', href: '/help' },
  ],
}
