<script setup lang="ts">
import { saasConfig } from '~/config/saas.config'

interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Prêt à transformer vos visuels ?',
  description: 'Créez votre compte gratuitement et obtenez 5 crédits offerts.',
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
          <CommonCTAButton
            :href="saasConfig.signupUrl"
            variant="primary-inverted"
            size="lg"
          >
            {{ $t('cta.primary') }}
          </CommonCTAButton>
          <p class="text-sm text-purple-100">
            {{ $t('cta.clarification') }}
          </p>
          <CommonCTAButton
            to="/pricing"
            variant="ghost-light"
            size="xs"
          >
            {{ $t('cta.pricingLink') }}
          </CommonCTAButton>
        </div>
      </div>
    </div>
  </section>
</template>
