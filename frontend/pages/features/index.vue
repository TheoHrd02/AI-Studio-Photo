<script setup lang="ts">
import { navFeatures } from '~/config/site.config'
import { saasConfig } from '~/config/saas.config'

const { t } = useI18n()

definePageMeta({
  layout: 'marketing',
})

usePageSeo(() => ({ title: t('featurePages.index.title'), description: t('featurePages.index.subtitle') }))
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-500/10 via-white to-primary-500/5 pt-32 pb-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {{ $t('featurePages.index.title') }}
        </h1>
        <p class="mt-6 text-xl text-gray-600">
          {{ $t('featurePages.index.subtitle') }}
        </p>
      </div>

      <div class="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
        <div
          v-for="feature in navFeatures"
          :key="feature.href"
          class="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-primary-500 hover:shadow-xl"
        >
          <div class="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-500/10 transition-colors group-hover:bg-primary-500/20">
            <UIcon
              :name="feature.icon"
              class="h-8 w-8 text-primary-500"
            />
          </div>
          <h3 class="mt-6 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-500">
            {{ $t(`nav.${feature.id}.label`) }}
          </h3>
          <p class="mt-4 text-gray-600">
            {{ $t(`nav.${feature.id}.description`) }}
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            <NuxtLinkLocale
              :to="feature.href"
              class="inline-flex items-center text-primary-500 font-semibold text-sm hover:text-primary-600"
            >
              {{ $t('cta.discover') }}
              <svg
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </NuxtLinkLocale>
            <CommonCTAButton
              :href="saasConfig.signupUrl"
              variant="ghost"
              size="xs"
              class="text-sm text-gray-500 hover:text-primary-500"
            >
              {{ $t('cta.orStartNow') }}
            </CommonCTAButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
