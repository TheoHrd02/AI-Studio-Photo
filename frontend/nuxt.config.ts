// Security headers — production only. Disabled in dev to allow Vite HMR, inline scripts, eval.
const isProduction = process.env.NODE_ENV === 'production'

const productionSecurityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Content-Security-Policy': [
    'default-src \'self\'',
    'script-src \'self\'',
    'style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com',
    'font-src \'self\' https://fonts.gstatic.com',
    'img-src \'self\' data: blob: https://res.cloudinary.com https://images.unsplash.com https://placehold.co',
    'media-src \'self\' blob: https://res.cloudinary.com https://videos.pexels.com',
    'connect-src \'self\' https://*.aistudiophoto.com https://api.iconify.design',
    'frame-ancestors \'none\'',
    'base-uri \'self\'',
    'form-action \'self\'',
    'object-src \'none\'',
  ].join('; '),
}

const securityHeaders = isProduction ? productionSecurityHeaders : {}

export default defineNuxtConfig({

  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'AI Studio Photo - Photos Produits Professionnelles par IA',
      meta: [
        { name: 'description', content: 'Transformez vos photos produits en visuels studio professionnels grâce à l\'IA — en 30 secondes. Sans photographe, sans studio.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' },
        // Video CDN — resolves DNS + opens TCP+TLS before any JS runs
        { rel: 'preconnect', href: 'https://res.cloudinary.com' },
        { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Private keys (server-only)
    goApiUrl: process.env.NUXT_GO_API_URL,

    // Public keys (exposed to client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://aistudiophoto.com',
    },
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  compatibilityDate: '2025-10-09',

  nitro: {
    routeRules: {
      '/**': {
        headers: securityHeaders,
      },
      '/api/**': {
        cors: true,
        headers: {
          ...securityHeaders,
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
