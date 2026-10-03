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
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
