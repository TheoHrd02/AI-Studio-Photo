<script setup lang="ts">
const { t, locales, localeProperties } = useI18n()
const ogLocale = (language?: string) => language?.replace('-', '_')
const { public: { siteUrl, i18n: { defaultLocale } } } = useRuntimeConfig()

// lang + dir on <html>, hreflang alternates, canonical (baseUrl from nuxt.config i18n), og:locale
const i18nHead = useLocaleHead({ seo: true })

// Pages missing in some locales (blog articles) declare their versions: keep only those alternates
const route = useRoute()
const pageAlternates = usePageAlternates()
const alternatePaths = () => pageAlternates.value?.path === route.path ? pageAlternates.value.paths : null
const hasVersion = (code: string) => !alternatePaths() || code in alternatePaths()!
const hreflangLocale = (hreflang: string) => hreflang === 'x-default' ? defaultLocale : hreflang.split('-')[0]!
const links = () => {
  const paths = alternatePaths()
  if (!paths) return i18nHead.value.link
  return i18nHead.value.link
    ?.filter(l => l.rel !== 'alternate' || paths[hreflangLocale(l.hreflang)])
    .map(l => l.rel === 'alternate' ? { ...l, href: `${siteUrl}${paths[hreflangLocale(l.hreflang)]}` } : l)
}

// JSON-LD structured data (Organization + SoftwareApplication), localized
const jsonLd = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`, // referenced as publisher by blog articles
    'name': 'Glint Studio',
    'url': siteUrl,
    'logo': `${siteUrl}/icon-512.png`,
    'description': t('meta.description'),
    'sameAs': [],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite', // site name shown in search results
    'name': 'Glint Studio',
    'url': siteUrl,
    'publisher': { '@id': `${siteUrl}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Glint Studio',
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'Web',
    'description': t('meta.appDescription'),
    'url': siteUrl,
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR' },
  },
]

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: links(),
  meta: [
    ...(i18nHead.value.meta ?? []),
    { name: 'description', content: t('meta.description') },
  ],
  script: jsonLd().map(schema => ({ type: 'application/ld+json', innerHTML: JSON.stringify(schema) })),
  titleTemplate: (title?: string) => title ? `${title} – Glint Studio` : t('meta.title'),
}))

// Open Graph / Twitter defaults; per-page title/description come from usePageSeo
// TODO(content): replace public/og-image.png (1200x630 placeholder)
useSeoMeta({
  ogType: 'website',
  ogLocale: () => ogLocale(localeProperties.value.language),
  ogLocaleAlternate: () => locales.value
    .filter(l => l.code !== localeProperties.value.code && hasVersion(l.code))
    .map(l => ogLocale(l.language))
    .filter((l): l is string => !!l),
  ogSiteName: 'Glint Studio',
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
