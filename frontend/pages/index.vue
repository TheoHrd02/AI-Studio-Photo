<script setup lang="ts">
import { siteConfig } from '~/config/site.config'

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
    color: 'from-purple-500 to-pink-500',
    stats: t('features.studioVirtuel.stats'),
    statsLabel: t('features.studioVirtuel.statsLabel'),
    href: '/features/studio-virtuel',
  },
  {
    title: t('features.mannequinVirtuel.title'),
    description: t('features.mannequinVirtuel.description'),
    icon: '👤',
    color: 'from-blue-500 to-cyan-500',
    stats: t('features.mannequinVirtuel.stats'),
    statsLabel: t('features.mannequinVirtuel.statsLabel'),
    href: '/features/mannequin-virtuel',
  },
  {
    title: t('features.motionStudio.title'),
    description: t('features.motionStudio.description'),
    icon: '🎬',
    color: 'from-orange-500 to-red-500',
    stats: t('features.motionStudio.stats'),
    statsLabel: t('features.motionStudio.statsLabel'),
    href: '/features/motion-studio',
  },
])

const steps = computed(() => [
  {
    number: '01',
    title: t('howItWorks.steps.upload.title'),
    description: t('howItWorks.steps.upload.description'),
    icon: '⬆️',
  },
  {
    number: '02',
    title: t('howItWorks.steps.choose.title'),
    description: t('howItWorks.steps.choose.description'),
    icon: '✨',
  },
  {
    number: '03',
    title: t('howItWorks.steps.download.title'),
    description: t('howItWorks.steps.download.description'),
    icon: '⚡',
  },
])

const benefits = computed(() => [
  {
    title: t('howItWorks.benefits.cost.title'),
    description: t('howItWorks.benefits.cost.description'),
    metric: t('howItWorks.benefits.cost.metric'),
    metricLabel: t('howItWorks.benefits.cost.metricLabel'),
  },
  {
    title: t('howItWorks.benefits.speed.title'),
    description: t('howItWorks.benefits.speed.description'),
    metric: t('howItWorks.benefits.speed.metric'),
    metricLabel: t('howItWorks.benefits.speed.metricLabel'),
  },
  {
    title: t('howItWorks.benefits.conversion.title'),
    description: t('howItWorks.benefits.conversion.description'),
    metric: t('howItWorks.benefits.conversion.metric'),
    metricLabel: t('howItWorks.benefits.conversion.metricLabel'),
  },
])

const socialProof = computed(() => [
  { number: '10k+', label: t('socialProof.users') },
  { number: '500k+', label: t('socialProof.generations') },
  { number: '4.9/5', label: t('socialProof.rating') },
  { number: '50+', label: t('socialProof.countries') },
])

const tutorialSteps = computed(() => [
  {
    title: t('tutorial.steps.step1.title'),
    description: t('tutorial.steps.step1.description'),
    features: [
      t('tutorial.steps.step1.features.0'),
      t('tutorial.steps.step1.features.1'),
      t('tutorial.steps.step1.features.2')
    ]
  },
  {
    title: t('tutorial.steps.step2.title'),
    description: t('tutorial.steps.step2.description'),
    features: [
      t('tutorial.steps.step2.features.0'),
      t('tutorial.steps.step2.features.1'),
      t('tutorial.steps.step2.features.2')
    ]
  },
  {
    title: t('tutorial.steps.step3.title'),
    description: t('tutorial.steps.step3.description'),
    features: [
      t('tutorial.steps.step3.features.0'),
      t('tutorial.steps.step3.features.1'),
      t('tutorial.steps.step3.features.2')
    ]
  },
  {
    title: t('tutorial.steps.step4.title'),
    description: t('tutorial.steps.step4.description'),
    features: [
      t('tutorial.steps.step4.features.0'),
      t('tutorial.steps.step4.features.1'),
      t('tutorial.steps.step4.features.2')
    ]
  }
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

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>

<template>
  <div class="bg-white">
    <!-- Hero Section - Écran 1 -->
    <section class="min-h-screen relative flex items-center">
      <div class="w-full">
        <MarketingHeroSection />
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 bg-[#eff0f0]">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div v-for="stat in socialProof" :key="stat.label" class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-[#912efb] mb-2">
              {{ stat.number }}
            </div>
            <div class="text-sm text-gray-600">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comment ça marche - Écran 2 -->
    <section class="min-h-screen py-20 bg-gradient-to-b from-white to-[#eff0f0] flex items-center relative overflow-hidden">
      <!-- Decorative circles -->
      <div class="absolute top-20 right-10 w-72 h-72 bg-[#912efb]/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-[#912efb]/10 rounded-full blur-3xl"></div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-6xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-20">
            <div class="inline-block px-4 py-2 bg-[#912efb]/10 rounded-full text-[#912efb] font-semibold text-sm mb-6">
              {{ $t('howItWorks.badge') }}
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {{ $t('howItWorks.title') }}
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ $t('howItWorks.subtitle') }}
            </p>
          </div>

          <!-- Steps - Flow Design -->
          <div class="relative max-w-4xl mx-auto mb-16">
            <!-- SVG Path -->
            <svg class="absolute inset-0 w-full h-full hidden md:block" style="z-index: 0;">
              <path d="M 100 100 Q 250 150, 400 100 T 700 100" stroke="#912efb" stroke-width="3" fill="none" stroke-dasharray="10,10" opacity="0.3"/>
            </svg>

            <div class="relative grid md:grid-cols-3 gap-12">
              <div v-for="(step, index) in steps" :key="step.number" class="relative" :class="index === 1 ? 'md:mt-16' : ''">
                <!-- Circular step design -->
                <div class="relative group">
                  <!-- Big circle background -->
                  <div class="w-48 h-48 mx-auto bg-gradient-to-br from-[#912efb]/10 to-[#912efb]/30 rounded-full flex items-center justify-center relative transition-all group-hover:scale-110 group-hover:shadow-2xl">
                    <!-- Inner circle -->
                    <div class="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <div class="text-6xl">{{ step.icon }}</div>
                    </div>
                    <!-- Step number badge -->
                    <div class="absolute -top-4 -right-4 w-16 h-16 bg-[#912efb] text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg border-4 border-white">
                      {{ index + 1 }}
                    </div>
                  </div>
                  
                  <!-- Text content -->
                  <div class="mt-8 text-center">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">
                      {{ step.title }}
                    </h3>
                    <p class="text-gray-600 text-sm leading-relaxed">
                      {{ step.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="text-center">
            <NuxtLink to="/signup" class="inline-flex items-center px-8 py-4 bg-[#912efb] text-white rounded-full font-semibold hover:bg-[#7e1fe0] transition-all shadow-lg hover:shadow-2xl hover:scale-105">
              Commencer gratuitement
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités Principales - Écran 3 -->
    <section class="min-h-screen py-20 bg-white flex items-center relative overflow-hidden">
      <!-- Decorative blobs -->
      <div class="absolute top-0 left-0 w-full h-full opacity-40">
        <div class="absolute top-10 left-10 w-64 h-64 bg-[#912efb]/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div class="absolute top-20 right-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-20 left-1/2 w-64 h-64 bg-[#7e1fe0]/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-6xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-20">
            <div class="inline-block px-4 py-2 bg-[#912efb]/10 rounded-full text-[#912efb] font-semibold text-sm mb-6">
              {{ $t('features.badge') }}
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {{ $t('features.title') }}
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ $t('features.subtitle') }}
            </p>
          </div>

          <!-- Features - Hexagonal Design -->
          <div class="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            <div v-for="(feature, index) in features" :key="feature.title" class="relative" :class="index === 1 ? 'md:mt-12' : ''">
              <div class="group relative">
                <!-- Hexagonal background effect -->
                <div class="absolute inset-0 bg-gradient-to-br from-[#912efb]/5 to-[#912efb]/15 transform rotate-6 rounded-3xl group-hover:rotate-12 transition-all duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-br from-[#912efb]/15 to-[#912efb]/5 transform -rotate-6 rounded-3xl group-hover:-rotate-12 transition-all duration-300"></div>
                
                <!-- Content card -->
                <div class="relative bg-white rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all">
                  <!-- Icon in circle with gradient -->
                  <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#912efb] to-[#7e1fe0] rounded-full flex items-center justify-center text-4xl shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all">
                    {{ feature.icon }}
                  </div>

                  <!-- Stats badge -->
                  <div class="absolute -top-4 -right-4 bg-[#912efb] text-white px-4 py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-all">
                    <div class="text-sm font-bold">{{ feature.stats }}</div>
                    <div class="text-xs opacity-90">{{ feature.statsLabel }}</div>
                  </div>

                  <!-- Title -->
                  <h3 class="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-[#912efb] transition-colors">
                    {{ feature.title }}
                  </h3>

                  <!-- Description -->
                  <p class="text-gray-600 text-center leading-relaxed mb-6">
                    {{ feature.description }}
                  </p>

                  <!-- Link -->
                  <div class="text-center">
                    <NuxtLink 
                      :to="feature.href" 
                      class="inline-flex items-center text-[#912efb] font-semibold hover:text-[#7e1fe0] transition-colors group"
                    >
                      {{ $t('common.discover') }}
                      <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tutoriel - Comment ça fonctionne -->
    <section class="min-h-screen py-20 bg-gradient-to-b from-white via-[#912efb]/5 to-white flex items-center relative overflow-hidden">
      <!-- Decorative organic shapes -->
      <div class="absolute inset-0 opacity-20 pointer-events-none">
        <div class="absolute top-20 left-10 w-72 h-72 bg-[#912efb] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div class="absolute top-40 right-20 w-72 h-72 bg-[#7e1fe0] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-6xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-20">
            <div class="inline-block px-6 py-2 bg-[#912efb]/10 rounded-full text-[#912efb] font-semibold text-sm mb-6 border border-[#912efb]/20">
              {{ $t('tutorial.badge') }}
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {{ $t('tutorial.title') }}
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ $t('tutorial.subtitle') }}
            </p>
          </div>

          <!-- Tutorial Steps - Organic Cards -->
          <div class="space-y-16">
            <div v-for="(tutorialStep, index) in tutorialSteps" :key="tutorialStep.title" class="group">
              <div :class="['relative flex flex-col md:flex-row items-center gap-12', index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse']">
                <!-- Step Number Circle -->
                <div class="flex-shrink-0 relative">
                  <div class="w-32 h-32 rounded-full bg-gradient-to-br from-[#912efb] to-[#7e1fe0] flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                    <span class="text-5xl font-bold text-white">{{ index + 1 }}</span>
                  </div>
                  <!-- Decorative ring -->
                  <div class="absolute inset-0 rounded-full border-4 border-[#912efb]/20 scale-125 group-hover:scale-150 transition-all duration-500"></div>
                </div>

                <!-- Content Card -->
                <div class="flex-1">
                  <div class="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl group-hover:border-[#912efb]/30 transition-all duration-300 relative overflow-hidden">
                    <!-- Decorative gradient -->
                    <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#912efb]/10 to-transparent rounded-bl-full"></div>
                    
                    <div class="relative z-10">
                      <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#912efb] transition-colors">
                        {{ tutorialStep.title }}
                      </h3>
                      <p class="text-lg text-gray-600 leading-relaxed mb-6">
                        {{ tutorialStep.description }}
                      </p>
                      
                      <!-- Features list -->
                      <ul class="space-y-3">
                        <li v-for="feature in tutorialStep.features" :key="feature" class="flex items-start gap-3">
                          <div class="flex-shrink-0 w-6 h-6 rounded-full bg-[#912efb]/10 flex items-center justify-center mt-0.5">
                            <svg class="w-4 h-4 text-[#912efb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span class="text-gray-700">{{ feature }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Final CTA -->
          <div class="relative mt-24">
            <div class="relative bg-gradient-to-r from-[#912efb] to-[#7e1fe0] rounded-3xl p-12 md:p-16 text-center shadow-2xl overflow-hidden">
              <!-- Decorative circles -->
              <div class="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div class="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
              
              <div class="relative z-10">
                <h3 class="text-3xl md:text-4xl font-bold text-white mb-4">
                  {{ $t('tutorial.cta.title') }}
                </h3>
                <p class="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  {{ $t('tutorial.cta.subtitle') }}
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <NuxtLink to="/signup" class="inline-flex items-center justify-center px-8 py-4 bg-white text-[#912efb] rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:scale-105">
                    {{ $t('tutorial.cta.buttonPrimary') }}
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </NuxtLink>
                  <NuxtLink to="/pricing" class="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white rounded-full font-semibold border-2 border-white hover:bg-white/10 transition-all">
                    {{ $t('tutorial.cta.buttonSecondary') }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
