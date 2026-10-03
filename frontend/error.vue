<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const is404 = computed(() => props.error.statusCode === 404)

useSeoMeta({
  // error.vue renders outside app.vue: no titleTemplate, so add the suffix here
  title: () => `${is404.value ? t('errorPage.notFoundTitle') : t('errorPage.errorTitle')} – AI Studio Photo`,
  robots: 'noindex, follow',
})
</script>

<template>
  <NuxtLayout name="marketing">
    <div class="bg-white pt-40 pb-32">
      <div class="mx-auto max-w-xl px-4 text-center">
        <p class="text-sm font-semibold text-primary-600">
          {{ error.statusCode }}
        </p>
        <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900">
          {{ is404 ? $t('errorPage.notFoundTitle') : $t('errorPage.errorTitle') }}
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          {{ is404 ? $t('errorPage.notFoundText') : $t('errorPage.errorText') }}
        </p>
        <NuxtLink
          :to="localePath('/')"
          class="mt-8 inline-flex items-center rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600"
          @click.prevent="clearError({ redirect: localePath('/') })"
        >
          {{ $t('errorPage.backHome') }}
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
