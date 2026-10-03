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
    '@nuxtjs/i18n',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      // lang, hreflang, canonical, default title/description: app.vue (per locale)
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
    // Server-only, overridden at runtime by NUXT_* env vars (see .env.example)
    openaiApiKey: '',
    openaiVectorStoreId: '',
    openaiModel: 'gpt-4.1-mini',
    chatDailyLimit: 500,
    trustProxy: false,

    // Public keys (exposed to client)
    public: {
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

  i18n: {
    // Files: i18n/locales/*.json. FR at /, others prefixed (/en, /de, /it, /es).
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://aistudiophoto.com',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    // No auto-redirect on browser language: avoids a cookie; hreflang lets search engines
    // serve the right version, and the header switcher covers the rest.
    detectBrowserLanguage: false,
  },

  // Icons from installed @iconify-json/* collections, bundled — no runtime call to api.iconify.design
  icon: {
    clientBundle: { scan: true },
    fallbackToApi: false,
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    excludeAppSources: true,
    autoLastmod: true,
  },
})
