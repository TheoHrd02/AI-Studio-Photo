<script setup lang="ts">
const { t } = useI18n()

// lang + dir on <html>, hreflang alternates, canonical (baseUrl from nuxt.config i18n), og:locale
const i18nHead = useLocaleHead({ seo: true })

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: [
    ...(i18nHead.value.meta ?? []),
    { name: 'description', content: t('meta.description') },
  ],
  titleTemplate: (title?: string) => title ? `${title} – AI Studio Photo` : t('meta.title'),
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
