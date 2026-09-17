<script setup lang="ts">
const route = useRoute()
const { public: { siteUrl } } = useRuntimeConfig()

// Canonical global — recalculé à chaque navigation (SSR + client).
// route.path exclut les query params : /pricing, /features/studio-virtuel, etc.
// La page peut surcharger via son propre useHead si besoin (ex. pages paginées).
useHead(() => ({
  link: [
    { rel: 'canonical', href: `${siteUrl}${route.path}` },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
