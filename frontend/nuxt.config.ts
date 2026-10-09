import { appLegalUrl, type AppLegalDoc } from './config/saas.config'

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

// Legal texts live in the app only (single versioned source, see config/saas.config.ts): the former legal pages of
// this site redirect permanently (301) to the app page in the same language, for every locale prefix.
const siteLocales = ['fr', 'en', 'de', 'it', 'es']
const legacyLegalPages: Record<string, AppLegalDoc> = {
  'mentions-legales': 'notice',
  'cgu': 'terms',
  'confidentialite': 'privacy',
  'cookies': 'cookies',
}
const legacyLegalRedirects = Object.fromEntries(
  siteLocales.flatMap(code => Object.entries(legacyLegalPages).map(([page, doc]) => [
    `${code === 'fr' ? '' : `/${code}`}/${page}`,
    { redirect: { to: appLegalUrl(doc, code), statusCode: 301 } },
  ])),
)

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
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
      meta: [{ name: 'theme-color', content: '#912efb' }],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // Video CDN — resolves DNS + opens TCP+TLS before any JS runs
        { rel: 'preconnect', href: 'https://res.cloudinary.com' },
        { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://glintstudio.ai',
    name: 'Glint Studio',
  },

  content: {
    // Node's built-in SQLite (Node ≥ 22.5, Docker: 24): no native addon to compile.
    // Runtime DB in .data/ (writable by the container user, see Dockerfile.prod)
    experimental: { sqliteConnector: 'native' },
  },

  runtimeConfig: {
    // Server-only, overridden at runtime by NUXT_* env vars (see .env.example)
    anthropicApiKey: '',
    anthropicModel: 'claude-haiku-4-5', // Haiku only (server/api/ask.post.ts)
    // Global chatbot caps (questions, all visitors), per UTC day and month; 0 = chatbot off
    chatDailyLimit: 200,
    chatMonthlyLimit: 1000,
    trustProxy: false,

    // Public keys (exposed to client)
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://glintstudio.ai',
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
      ...legacyLegalRedirects,
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
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://glintstudio.ai',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    // First visit on / redirects to the browser language (Accept-Language), then the
    // i18n_redirected cookie keeps the choice (also set by the header switcher).
    // Root only + no fallbackLocale: crawlers without Accept-Language stay on FR.
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  // Icons from installed @iconify-json/* collections, bundled — no runtime call to api.iconify.design
  icon: {
    clientBundle: { scan: true },
    fallbackToApi: false,
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    excludeAppSources: true,
  },
})
