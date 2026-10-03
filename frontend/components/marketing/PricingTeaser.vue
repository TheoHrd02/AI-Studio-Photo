<script setup lang="ts">
import { saasConfig } from '~/config/saas.config'
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
          <CommonCTAButton
            :href="saasConfig.signupUrl"
            variant="primary"
            size="md"
            rounded="xl"
            show-arrow
          >
            {{ $t('cta.primary') }}
          </CommonCTAButton>
          <p class="text-sm text-gray-500">
            {{ $t('cta.clarification') }}
          </p>
          <CommonCTAButton
            to="/pricing"
            variant="ghost"
            size="xs"
          >
            {{ $t('cta.pricingLink') }}
          </CommonCTAButton>
        </div>
      </div>
    </div>
  </section>
</template>
