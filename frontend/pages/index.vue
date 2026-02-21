<script setup lang="ts">
import { siteConfig } from '~/config/site.config'
import { saasConfig } from '~/config/saas.config'

definePageMeta({
  layout: 'marketing',
})

useHead({
  title: siteConfig.hero.title,
  meta: [
    { name: 'description', content: siteConfig.description },
  ],
})

const { t } = useI18n()

const features = computed(() => [
  {
    title: t('features.studioVirtuel.title'),
    description: t('features.studioVirtuel.description'),
    icon: '📸',
    stats: t('features.studioVirtuel.stats'),
    statsLabel: t('features.studioVirtuel.statsLabel'),
    href: '/features/studio-virtuel',
  },
  {
    title: t('features.mannequinVirtuel.title'),
    description: t('features.mannequinVirtuel.description'),
    icon: '👤',
    stats: t('features.mannequinVirtuel.stats'),
    statsLabel: t('features.mannequinVirtuel.statsLabel'),
    href: '/features/mannequin-virtuel',
  },
  {
    title: t('features.motionStudio.title'),
    description: t('features.motionStudio.description'),
    icon: '🎬',
    stats: t('features.motionStudio.stats'),
    statsLabel: t('features.motionStudio.statsLabel'),
    href: '/features/motion-studio',
  },
])

const steps = computed(() => [
  {
    title: t('howItWorks.steps.upload.title'),
    description: t('howItWorks.steps.upload.description'),
    icon: '⬆️',
  },
  {
    title: t('howItWorks.steps.choose.title'),
    description: t('howItWorks.steps.choose.description'),
    icon: '✨',
  },
  {
    title: t('howItWorks.steps.generate.title'),
    description: t('howItWorks.steps.generate.description'),
    icon: '⚡',
  },
  {
    title: t('howItWorks.steps.download.title'),
    description: t('howItWorks.steps.download.description'),
    icon: '📥',
  },
])
</script>

<style scoped>
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -50px) scale(1.1); }
  50% { transform: translate(-20px, 20px) scale(0.9); }
  75% { transform: translate(50px, 50px) scale(1.05); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
</style>

<template>
  <div class="bg-white">
    <!-- 1. Hero -->
    <section class="min-h-screen relative flex items-center">
      <div class="w-full">
        <MarketingHeroSection />
      </div>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- 2. Product demo (embedded video) -->
    <MarketingProductDemoSection />

    <!-- 3. Product walkthrough (conceptual workflow) -->
    <MarketingProductWalkthroughSection />

    <!-- 4. Before/After -->
    <MarketingBeforeAfterSection />

    <!-- 5. How it works (4 steps) -->
    <section class="py-12 md:py-16 bg-surface">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-12">
          <div class="inline-block px-4 py-2 bg-primary-500/10 rounded-full text-primary-500 font-semibold text-sm mb-4">
            {{ $t('howItWorks.badge') }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('howItWorks.title') }}
          </h2>
          <p class="text-lg text-gray-600">
            {{ $t('howItWorks.subtitle') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-10">
          <div v-for="(step, index) in steps" :key="index" class="text-center">
            <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary-500/10 to-primary-500/30 rounded-full flex items-center justify-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg text-4xl">
                {{ step.icon }}
              </div>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-600">{{ step.description }}</p>
          </div>
        </div>

        <div class="text-center">
          <a :href="saasConfig.signupUrl" target="_blank" rel="noopener" class="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all shadow-lg hover:scale-105">
            {{ $t('cta.primary') }}
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p class="mt-3 text-sm text-gray-500">{{ $t('cta.clarification') }}</p>
          <CommonRiskReversalChips class="mt-4" />
        </div>
      </div>
    </section>

    <!-- 6. Features -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-12">
          <div class="inline-block px-4 py-2 bg-primary-500/10 rounded-full text-primary-500 font-semibold text-sm mb-4">
            {{ $t('features.badge') }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('features.title') }}
          </h2>
          <p class="text-lg text-gray-600">
            {{ $t('features.subtitle') }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div v-for="feature in features" :key="feature.title" class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-500/30 transition-all">
            <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-2xl">
              {{ feature.icon }}
            </div>
            <div class="mb-2 text-xs font-bold text-primary-500">{{ feature.stats }} {{ feature.statsLabel }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ feature.description }}</p>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
              <NuxtLink :to="feature.href" class="inline-flex items-center text-primary-500 font-semibold text-sm hover:text-primary-600">
                {{ $t('cta.discover') }}
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
              <a
                :href="saasConfig.signupUrl"
                target="_blank"
                rel="noopener"
                class="text-sm font-medium text-gray-500 hover:text-primary-500 transition-colors"
              >
                {{ $t('cta.orStartNow') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Pricing teaser -->
    <MarketingPricingTeaser />

    <!-- 8. Trust (Testimonials + Social proof) -->
    <MarketingTestimonialSection />
    <MarketingSocialProofBar />

    <!-- 9. Final CTA -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 p-10 md:p-14 text-center shadow-2xl">
          <h2 class="text-3xl md:text-4xl font-bold text-white">
            {{ $t('cta.finalSection.title') }}
          </h2>
          <p class="mt-4 text-lg text-white/90">
            {{ $t('cta.finalSection.subtitle') }}
          </p>
          <div class="mt-8 flex flex-col items-center gap-3">
            <a :href="saasConfig.signupUrl" target="_blank" rel="noopener" class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-500 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:scale-105">
              {{ $t('cta.primary') }}
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <p class="text-sm text-white/80">{{ $t('cta.clarification') }}</p>
            <NuxtLink to="/pricing" class="text-xs text-white/60 hover:text-white/90 transition-colors">
              {{ $t('cta.pricing') }}
            </NuxtLink>
          </div>
          <CommonRiskReversalChips variant="light" class="mt-6" />
        </div>
      </div>
    </section>
  </div>
</template>
