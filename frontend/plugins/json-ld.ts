/**
 * JSON-LD structured data for SEO (Organization + SoftwareApplication).
 * Runs on SSR and client; descriptions follow the current locale.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { t } = nuxtApp.$i18n
  const config = useRuntimeConfig().public
  const siteUrl = config.siteUrl || 'https://aistudiophoto.com'

  useHead(() => ({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'AI Studio Photo',
          'url': siteUrl,
          'description': t('meta.description'),
          'sameAs': [],
        }),
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'AI Studio Photo',
          'applicationCategory': 'MultimediaApplication',
          'operatingSystem': 'Web',
          'description': t('meta.appDescription'),
          'url': siteUrl,
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'EUR',
          },
        }),
      },
    ],
  }))
})
