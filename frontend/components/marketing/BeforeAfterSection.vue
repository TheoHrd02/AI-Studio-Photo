<script setup lang="ts">
import { beforeAfterExamples } from '~/config/visual-proof.config'
import { saasConfig } from '~/config/saas.config'

const { t } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden bg-white py-12 md:py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">

        <!-- Section header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/8 px-4 py-1.5 text-sm font-semibold text-primary-600 mb-6">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500" aria-hidden="true" />
            {{ $t('beforeAfter.badge') }}
          </div>
          <h2 class="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {{ $t('beforeAfter.title') }}
          </h2>
          <p class="mt-5 max-w-2xl mx-auto text-lg text-gray-600">
            {{ $t('beforeAfter.subtitle') }}
          </p>
          <p class="mt-4 text-sm text-gray-400 font-medium">
            {{ $t('beforeAfter.illustrativeLabel') }}
          </p>
        </div>

        <!-- Before/After comparisons -->
        <div class="grid gap-12 md:gap-16">
          <div
            v-for="(example, index) in beforeAfterExamples"
            :key="index"
            class="group"
          >
            <!-- Optional label -->
            <p
              v-if="example.label"
              class="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-500"
            >
              {{ example.label }}
            </p>

            <!-- Side-by-side comparison -->
            <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center">
              <!-- Before -->
              <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-lg">
                <div class="absolute top-4 left-4 z-10 rounded-lg bg-gray-900/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  {{ $t('beforeAfter.before') }}
                </div>
                <img
                  :src="example.before.src"
                  :alt="example.before.alt"
                  class="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>

              <!-- Arrow (desktop) -->
              <div class="hidden md:flex flex-shrink-0 items-center justify-center">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-xl">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              <!-- After -->
              <div class="relative overflow-hidden rounded-2xl border-2 border-primary-500/30 bg-white shadow-xl ring-2 ring-primary-500/10">
                <div class="absolute top-4 left-4 z-10 rounded-lg bg-primary-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  {{ $t('beforeAfter.after') }}
                </div>
                <img
                  :src="example.after.src"
                  :alt="example.after.alt"
                  class="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- CTA with risk reversal -->
        <div class="mt-16 text-center">
          <a
            :href="saasConfig.signupUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-600 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {{ $t('cta.primary') }}
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <p class="mt-3 text-sm text-gray-500">{{ $t('cta.clarification') }}</p>
          <CommonRiskReversalChips class="mt-4" />
        </div>

      </div>
    </div>
  </section>
</template>
