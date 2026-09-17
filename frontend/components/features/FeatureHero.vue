<script setup lang="ts">
import { saasConfig } from '~/config/saas.config'

interface Props {
  title: string
  subtitle: string
  accentText?: string
  icon: string
}

defineProps<Props>()
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-primary-500/10 via-white to-primary-500/5 pt-32 pb-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <!-- Icon -->
        <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-500 shadow-lg">
          <UIcon
            :name="icon"
            class="h-10 w-10 text-white"
          />
        </div>

        <!-- Accent Text -->
        <p
          v-if="accentText"
          class="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-500"
        >
          {{ accentText }}
        </p>

        <!-- Title -->
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          {{ title }}
        </h1>

        <!-- Subtitle -->
        <p class="mt-6 text-xl leading-relaxed text-gray-600 sm:text-2xl">
          {{ subtitle }}
        </p>

        <!-- CTA -->
        <div class="mt-10 flex flex-col items-center gap-3">
          <CommonCTAButton
            :href="saasConfig.signupUrl"
            variant="primary"
            size="lg"
          >
            {{ $t('cta.primary') }}
          </CommonCTAButton>
          <p class="text-sm text-gray-500">
            {{ $t('cta.clarification') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div
      class="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
      aria-hidden="true"
    >
      <div class="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-primary-500 to-primary-600 opacity-20" />
    </div>
  </section>
</template>
