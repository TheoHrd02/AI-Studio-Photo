<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'marketing',
})

const benefits = computed(() => [
  t('featurePages.studioVirtuel.whyAdopt.benefit1'),
  t('featurePages.studioVirtuel.whyAdopt.benefit2'),
  t('featurePages.studioVirtuel.whyAdopt.benefit3')
])

const steps = computed(() => [
  t('featurePages.studioVirtuel.howToUse.step1'),
  t('featurePages.studioVirtuel.howToUse.step2'),
  t('featurePages.studioVirtuel.howToUse.step3'),
  t('featurePages.studioVirtuel.howToUse.step4')
])

const quotes = computed(() => [
  t('featurePages.studioVirtuel.quotes.quote1'),
  t('featurePages.studioVirtuel.quotes.quote2'),
  t('featurePages.studioVirtuel.quotes.quote3')
])
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
          <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#912efb] shadow-lg">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          
          <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-[#912efb]">
            {{ $t('featurePages.studioVirtuel.badge') }}
          </p>
          
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            {{ $t('featurePages.studioVirtuel.title') }}
          </h1>
          
          <p class="mt-6 text-xl leading-relaxed text-gray-600 sm:text-2xl">
            {{ $t('featurePages.studioVirtuel.subtitle') }}
          </p>
          
          <div class="mt-10 flex justify-center gap-4">
            <NuxtLink
              to="/app"
              class="inline-flex items-center rounded-lg bg-[#912efb] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#7e1fe0] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#912efb] focus:ring-offset-2"
            >
              {{ $t('featurePages.studioVirtuel.cta') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Qu'est-ce que c'est ? -->
    <section class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {{ $t('featurePages.studioVirtuel.whatIs.title') }}
            </h2>
            <p class="mt-6 text-lg leading-relaxed text-gray-600" v-html="$t('featurePages.studioVirtuel.whatIs.text1')">
            </p>
            <p class="mt-4 text-gray-500 italic">
              {{ $t('featurePages.studioVirtuel.whatIs.text2') }}
            </p>
          </div>
          <div class="relative">
            <div class="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
              <img 
                src="https://placehold.co/600x400/4F46E5/white?text=Studio+Virtuel" 
                alt="Studio Virtuel"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pourquoi l'adopter ? -->
    <div class="bg-gray-50 py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">
            {{ $t('featurePages.studioVirtuel.whyAdopt.title') }}
          </h3>
          <ul class="space-y-4">
            <li 
              v-for="(benefit, index) in benefits" 
              :key="index"
              class="flex items-start gap-3"
            >
              <div class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#912efb]/10 mt-0.5">
                <svg class="h-4 w-4 text-[#912efb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-lg text-gray-700">{{ benefit }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Comment l'utiliser ? -->
    <section class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:grid-flow-dense">
          <div class="lg:col-start-2">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {{ $t('featurePages.studioVirtuel.howToUse.title') }}
            </h2>
            <ol class="mt-6 space-y-3 list-decimal list-inside text-gray-700">
              <li v-for="(step, index) in steps" :key="index" class="text-lg">{{ step }}</li>
            </ol>
          </div>
          <div class="lg:col-start-1 lg:row-start-1 relative">
            <div class="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
              <img 
                src="https://placehold.co/600x400/4F46E5/white?text=Tutoriel" 
                alt="Comment utiliser"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Phrases accroches -->
    <section class="bg-gradient-to-b from-white to-gray-50 py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl">
          <div class="grid gap-6 md:grid-cols-3">
            <div
              v-for="(quote, index) in quotes"
              :key="index"
              class="rounded-2xl bg-white p-6 shadow-lg border border-gray-100"
            >
              <p class="text-center text-lg font-medium text-gray-900">
                {{ quote }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-[#912efb] to-[#7e1fe0] px-8 py-16 text-center shadow-2xl">
          <h2 class="text-4xl font-bold text-white sm:text-5xl">
            {{ $t('featurePages.studioVirtuel.finalCta.title') }}
          </h2>
          <p class="mt-4 text-xl text-purple-100">
            {{ $t('featurePages.studioVirtuel.finalCta.subtitle') }}
          </p>
          <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <NuxtLink
              to="/app"
              class="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#912efb] shadow-lg transition-all hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#912efb]"
            >
              {{ $t('featurePages.studioVirtuel.finalCta.buttonPrimary') }}
            </NuxtLink>
            <NuxtLink
              to="/pricing"
              class="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#912efb]"
            >
              {{ $t('featurePages.studioVirtuel.finalCta.buttonSecondary') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
