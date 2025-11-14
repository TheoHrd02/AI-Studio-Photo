export interface SiteConfig {
  name: string
  description: string
  logo: string
  theme: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
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
  description: 'Entrainez vos propres modèles d\'IA LoRa et générez du contenu ultra-réaliste en quelques secondes.',
  logo: '/logo.svg',
  
  theme: {
    primaryColor: '#4F46E5', // Indigo/Blue similar to Pykaso
    secondaryColor: '#E0E7FF', // Light indigo background
    backgroundColor: '#F8FAFC',
    textColor: '#1E293B',
    accentColor: '#334155',
  },
  
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  
  hero: {
    title: 'Outils d\'IA Génératifs Ultra Réalistes',
    subtitle: 'Entrainez vos propres modèles d\'IA LoRa et générez du contenu ultra-réaliste en quelques secondes.',
    ctaPrimary: 'Commence à créer gratuitement',
    ctaSecondary: 'Rejoins avec Google',
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
    { label: 'Galery', href: '/galery' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Help', href: '/help' },
  ],
}
