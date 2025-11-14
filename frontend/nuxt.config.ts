export default defineNuxtConfig({
  devtools: { enabled: true },
  
  compatibilityDate: '2025-10-09',

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  css: ['~/assets/css/main.css'],
  
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxt/image'
  ],

  runtimeConfig: {
    // Private keys (server-only)
    goApiUrl: process.env.NUXT_GO_API_URL,
    
    // Public keys (exposed to client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://aistudiophoto.com'
    }
  },

  nitro: {
    // Server routes for BFF pattern
    routeRules: {
      '/api/**': { 
        cors: true,
        headers: {
          'Access-Control-Allow-Credentials': 'true'
        }
      }
    }
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'AI Studio Photo - Outils d\'IA Génératifs Ultra Réalistes',
      meta: [
        { name: 'description', content: 'Entrainez vos propres modèles d\'IA LoRa et générez du contenu ultra-réaliste en quelques secondes.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
      ]
    }
  }
})