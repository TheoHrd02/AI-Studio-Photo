/**
 * JSON-LD structured data for SEO (Organization + SoftwareApplication).
 * Runs on SSR and client for proper indexing.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  const siteUrl = config.siteUrl || 'https://aistudiophoto.com'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'AI Studio Photo',
    'url': siteUrl,
    'description':
      'Transformez vos photos produits en visuels studio professionnels grâce à l\'IA — en 30 secondes.',
    'sameAs': [],
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'AI Studio Photo',
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'Web',
    'description':
      'Plateforme d\'IA générative pour créer des photos studio professionnelles à partir de photos produits.',
    'url': siteUrl,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'EUR',
    },
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(organizationSchema),
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(softwareSchema),
      },
    ],
  })
})
