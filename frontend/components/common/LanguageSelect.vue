<script setup lang="ts">
import { de, en, es, fr, it } from '@nuxt/ui/locale'

const { locale, setLocale } = useI18n()

// Must match i18n.locales in nuxt.config.ts
const locales = [fr, en, de, it, es]
</script>

<template>
  <ULocaleSelect
    :model-value="locale"
    :locales="locales"
    size="sm"
    variant="ghost"
    aria-label="Language"
    @update:model-value="setLocale($event as typeof locale)"
  />
</template>
