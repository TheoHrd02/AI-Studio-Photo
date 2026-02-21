<script setup lang="ts">
import { saasConfig } from '~/config/saas.config'

interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Prêt à transformer vos visuels ?',
  description: 'Créez votre compte gratuitement et obtenez 5 crédits offerts.'
})
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-16 text-center shadow-2xl">
        <h2 class="text-4xl font-bold text-white sm:text-5xl">
          {{ title }}
        </h2>
        <p class="mt-4 text-xl text-purple-100">
          {{ description }}
        </p>
        <div class="mt-10 flex flex-col items-center gap-3">
          <a
            :href="saasConfig.signupUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-500 shadow-lg transition-all hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
          >
            {{ $t('cta.primary') }}
          </a>
          <p class="text-sm text-purple-100">{{ $t('cta.clarification') }}</p>
          <NuxtLink
            to="/pricing"
            class="text-xs font-medium text-white/60 hover:text-white/90 transition-colors"
          >
            {{ $t('cta.pricingLink') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
