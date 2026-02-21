<script setup lang="ts">
import { saasConfig } from '~/config/saas.config'

const { t } = useI18n()
</script>

<template>
  <section class="py-12 md:py-16 bg-surface">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          {{ $t('pricingTeaser.title') }}
        </h2>
        <p class="mt-3 text-lg text-gray-600">
          {{ $t('pricingTeaser.subtitle') }}
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            :href="saasConfig.signupUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-600 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {{ $t('cta.primary') }}
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <p class="text-sm text-gray-500">{{ $t('cta.clarification') }}</p>
          <NuxtLink
            to="/pricing"
            class="text-xs font-medium text-gray-400 hover:text-primary-600 transition-colors"
          >
            {{ $t('cta.pricingLink') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
