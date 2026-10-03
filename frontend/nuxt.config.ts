// Security headers — production only. Disabled in dev to allow Vite HMR, inline scripts, eval.
const isProduction = process.env.NODE_ENV === 'production'

const productionSecurityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  // Content-Security-Policy: set per request with a nonce in server/plugins/csp.ts
}

const securityHeaders = isProduction ? productionSecurityHeaders : {}

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
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

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://aistudiophoto.com',
    name: 'AI Studio Photo',
  },

  runtimeConfig: {
    // Private keys (server-only)
    goApiUrl: process.env.NUXT_GO_API_URL,

    // Public keys (exposed to client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://aistudiophoto.com',
    },
  },

  srcDir: '.',

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  compatibilityDate: '2025-10-09',

  nitro: {
    routeRules: {
      '/**': { headers: securityHeaders },
      '/api/**': { cors: true, headers: securityHeaders },
    },
  },

  vite: {
    server: {
      hmr: {
        clientPort: 3000,
        port: 24679,
      },
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    excludeAppSources: true,
    autoLastmod: true,
  },
})
