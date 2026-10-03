<script setup lang="ts">
const { t } = useI18n()
const { public: { siteUrl } } = useRuntimeConfig()

// lang + dir on <html>, hreflang alternates, canonical (baseUrl from nuxt.config i18n), og:locale
const i18nHead = useLocaleHead({ seo: true })

// JSON-LD structured data (Organization + SoftwareApplication), localized
const jsonLd = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'AI Studio Photo',
    'url': siteUrl,
    'description': t('meta.description'),
    'sameAs': [],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'AI Studio Photo',
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'Web',
    'description': t('meta.appDescription'),
    'url': siteUrl,
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR' },
  },
]

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: [
    ...(i18nHead.value.meta ?? []),
    { name: 'description', content: t('meta.description') },
  ],
  script: jsonLd().map(schema => ({ type: 'application/ld+json', innerHTML: JSON.stringify(schema) })),
  titleTemplate: (title?: string) => title ? `${title} – AI Studio Photo` : t('meta.title'),
}))

// Open Graph / Twitter defaults; per-page title/description come from usePageSeo
// TODO(content): replace public/og-image.png (1200x630 placeholder)
useSeoMeta({
  ogType: 'website',
  ogSiteName: 'AI Studio Photo',
  ogUrl: () => i18nHead.value.link?.find(l => l.rel === 'canonical')?.href,
  ogImage: `${siteUrl}/og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterImage: `${siteUrl}/og-image.png`,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
