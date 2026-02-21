<script setup lang="ts">
import { ref, computed } from 'vue'
import { saasConfig } from '~/config/saas.config'

definePageMeta({ layout: 'marketing' })

const { t } = useI18n()

const pageTitle = computed(() => t('pricing.pageTitle'))
const pageDescription = computed(() => t('pricing.pageDescription'))

useHead({
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content: pageDescription,
    },
  ],
})

const isAnnual = ref(false)

const freeFeatureIncluded = [true, true, true, true, true, false, false, false]
const proFeatureIncluded = Array(8).fill(true)
const enterpriseFeatureIncluded = Array(8).fill(true)

const plans = computed(() => [
  {
    id: 'free',
    name: t('pricing.plans.free.name'),
    tagline: t('pricing.plans.free.tagline'),
    bestFor: t('pricing.plans.free.bestFor'),
    monthlyPrice: 0,
    annualPrice: 0,
    annualSaving: null,
    badge: null,
    featured: false,
    dark: false,
    cta: t('cta.plans.free.label'),
    ctaNote: t('cta.plans.free.note'),
    ctaHref: saasConfig.signupUrl,
    redirectHint: t('pricing.redirectHint'),
    features: Array.from({ length: 8 }, (_, i) => ({
      text: t(`pricing.plans.free.features.${i}`),
      included: freeFeatureIncluded[i],
    })),
  },
  {
    id: 'pro',
    name: t('pricing.plans.pro.name'),
    tagline: t('pricing.plans.pro.tagline'),
    bestFor: t('pricing.plans.pro.bestFor'),
    monthlyPrice: 29,
    annualPrice: 24,
    annualSaving: t('pricing.plans.pro.annualSaving'),
    badge: t('pricing.plans.pro.badge'),
    featured: true,
    dark: false,
    cta: t('cta.plans.pro.label'),
    ctaNote: t('cta.plans.pro.note'),
    ctaHref: saasConfig.signupUrl,
    redirectHint: t('pricing.redirectHint'),
    features: Array.from({ length: 8 }, (_, i) => ({
      text: t(`pricing.plans.pro.features.${i}`),
      included: proFeatureIncluded[i],
    })),
  },
  {
    id: 'enterprise',
    name: t('pricing.plans.enterprise.name'),
    tagline: t('pricing.plans.enterprise.tagline'),
    bestFor: t('pricing.plans.enterprise.bestFor'),
    monthlyPrice: 99,
    annualPrice: 79,
    annualSaving: t('pricing.plans.enterprise.annualSaving'),
    badge: null,
    featured: false,
    dark: true,
    cta: t('cta.plans.enterprise.label'),
    ctaNote: t('cta.plans.enterprise.note'),
    ctaHref: saasConfig.enterpriseContactUrl,
    redirectHint: t('pricing.redirectHintEnterprise'),
    features: Array.from({ length: 8 }, (_, i) => ({
      text: t(`pricing.plans.enterprise.features.${i}`),
      included: enterpriseFeatureIncluded[i],
    })),
  },
])

const perkKeys = [
  'secureData',
  'noCard',
  'cancelAnytime',
  'noWatermark',
  'multiDevice',
  'freeUpdates',
  'frenchInterface',
  'securePayment',
] as const

const perkIcons: Record<string, string> = {
  secureData: 'heroicons:shield-check',
  noCard: 'heroicons:check-circle',
  cancelAnytime: 'heroicons:x-circle',
  noWatermark: 'heroicons:photo',
  multiDevice: 'heroicons:device-phone-mobile',
  freeUpdates: 'heroicons:arrow-path',
  frenchInterface: 'heroicons:language',
  securePayment: 'heroicons:credit-card',
}

const globalPerks = computed(() =>
  perkKeys.map((key) => ({
    icon: perkIcons[key],
    label: t(`pricing.perks.${key}`),
  }))
)

const faqOpen = ref<number | null>(null)
const toggleFaq = (i: number) => {
  faqOpen.value = faqOpen.value === i ? null : i
}

const faq = computed(() =>
  Array.from({ length: 5 }, (_, i) => ({
    q: t(`pricing.faq.${i}.q`),
    a: t(`pricing.faq.${i}.a`),
  }))
)
</script>

<template>
  <div class="min-h-screen bg-white">

    <!-- Background decorations -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div class="absolute -top-60 right-0 w-[700px] h-[700px] bg-primary-500/5 rounded-full blur-3xl" />
      <div class="absolute top-1/3 -left-60 w-[600px] h-[600px] bg-primary-300/4 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-500/3 rounded-full blur-3xl" />
    </div>

    <!-- ─── Hero + Tarifs (même section, fond blanc) ────────────── -->
    <section class="bg-white px-4 pt-24 pb-16">
      <div class="mx-auto max-w-6xl">
        <!-- Titre + sous-titre + toggle -->
        <div class="text-center mb-10">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-5xl md:whitespace-nowrap xl:text-6xl leading-tight">
            {{ $t('pricing.heroTitle') }} <span class="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 bg-clip-text text-transparent">{{ $t('pricing.heroHighlight') }}</span>
          </h1>
          <p class="mt-4 text-lg text-gray-500 sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {{ $t('pricing.heroSubtitle') }}
          </p>

          <!-- Billing toggle -->
          <div class="mt-6 inline-flex items-center gap-4 rounded-2xl border border-gray-100 bg-surface px-6 py-3 shadow-sm">
            <span :class="['text-sm font-semibold transition-colors', !isAnnual ? 'text-gray-900' : 'text-gray-400']">
              {{ $t('pricing.monthly') }}
            </span>

            <button
              type="button"
              role="switch"
              :aria-checked="isAnnual"
              :aria-label="$t('pricing.billingToggleAria')"
              class="relative h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              :class="isAnnual ? 'bg-primary-500' : 'bg-gray-300'"
              @click="isAnnual = !isAnnual"
            >
              <span
                class="absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300"
                :class="isAnnual ? 'translate-x-7' : 'translate-x-0'"
              />
            </button>

            <span :class="['flex items-center gap-2 text-sm font-semibold transition-colors', isAnnual ? 'text-gray-900' : 'text-gray-400']">
              {{ $t('pricing.yearly') }}
              <span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                {{ $t('pricing.annualBadge') }}
              </span>
            </span>
          </div>
        </div>

        <!-- Pricing cards -->
        <div class="grid gap-6 md:grid-cols-3 md:items-start">

          <div
            v-for="plan in plans"
            :key="plan.id"
            :class="[
              'relative flex flex-col rounded-3xl p-8 transition-all duration-300',
              plan.featured
                ? 'bg-gradient-to-b from-primary-500 to-primary-700 text-white shadow-2xl shadow-primary-500/30 ring-2 ring-primary-400/50 md:-mt-6 md:pb-14'
                : plan.dark
                  ? 'bg-gray-900 text-white shadow-xl'
                  : 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-100 hover:shadow-md',
            ]"
          >

            <!-- Popular badge -->
            <div
              v-if="plan.badge"
              class="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-1 text-sm font-bold text-primary-600 shadow-lg ring-1 ring-primary-100"
            >
              ✦ {{ plan.badge }}
            </div>

            <!-- Plan name & tagline -->
            <div>
              <h3
                class="text-xl font-bold"
                :class="plan.featured || plan.dark ? 'text-white' : 'text-gray-900'"
              >
                {{ plan.name }}
              </h3>
              <p
                class="mt-2 text-sm leading-relaxed"
                :class="plan.featured ? 'text-primary-100' : plan.dark ? 'text-gray-400' : 'text-gray-500'"
              >
                {{ plan.tagline }}
              </p>
              <p
                class="mt-1.5 text-xs"
                :class="plan.featured ? 'text-primary-200/80' : plan.dark ? 'text-gray-500' : 'text-gray-400'"
              >
                {{ plan.bestFor }}
              </p>
            </div>

            <!-- Divider -->
            <div
              class="my-6 h-px"
              :class="plan.featured ? 'bg-primary-400/40' : plan.dark ? 'bg-gray-700' : 'bg-gray-100'"
            />

            <!-- Price -->
            <div class="flex items-end gap-1.5">
              <span
                class="text-5xl font-extrabold leading-none tracking-tight"
                :class="plan.featured || plan.dark ? 'text-white' : 'text-gray-900'"
              >
                {{ isAnnual ? plan.annualPrice : plan.monthlyPrice }}€
              </span>
              <span
                class="mb-1 text-sm font-medium"
                :class="plan.featured ? 'text-primary-100' : plan.dark ? 'text-gray-400' : 'text-gray-400'"
              >
                {{ $t('pricing.periodPerMonth') }}
              </span>
            </div>

            <!-- Annual billing note + savings -->
            <div class="mt-2 h-5 text-xs">
              <span v-if="plan.annualPrice > 0 && isAnnual" :class="plan.featured ? 'text-primary-100' : plan.dark ? 'text-gray-400' : 'text-gray-400'">
                {{ $t('pricing.billedPrefix') }} {{ plan.annualPrice * 12 }}{{ $t('pricing.billedSuffix') }}
              </span>
              <span v-else-if="!isAnnual && plan.annualSaving" :class="plan.featured ? 'text-primary-100' : plan.dark ? 'text-emerald-400' : 'text-emerald-600'" class="font-medium">
                {{ $t('pricing.savingsPrefix') }} {{ plan.annualSaving }} {{ $t('pricing.savingsSuffix') }}
              </span>
            </div>

            <!-- CTA -->
            <a
              :href="plan.ctaHref"
              target="_blank"
              rel="noopener"
              :class="[
                'mt-7 flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
                plan.featured
                  ? 'bg-white text-primary-600 shadow-lg hover:bg-primary-50 hover:scale-[1.02] focus:ring-white'
                  : plan.dark
                    ? 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-[1.02] focus:ring-primary-500'
                    : 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-[1.02] focus:ring-primary-500',
              ]"
            >
              {{ plan.cta }}
            </a>
            <p
              class="mt-2.5 text-center text-xs"
              :class="plan.featured ? 'text-primary-200' : plan.dark ? 'text-gray-500' : 'text-gray-400'"
            >
              {{ plan.ctaNote }}
            </p>
            <p
              v-if="plan.redirectHint"
              class="mt-1 text-center text-[10px]"
              :class="plan.featured ? 'text-primary-300/70' : plan.dark ? 'text-gray-500/80' : 'text-gray-400/80'"
            >
              {{ plan.redirectHint }}
            </p>

            <!-- Divider -->
            <div
              class="my-6 h-px"
              :class="plan.featured ? 'bg-primary-400/40' : plan.dark ? 'bg-gray-700' : 'bg-gray-100'"
            />

            <!-- Features list -->
            <ul class="flex-1 space-y-3.5">
              <li
                v-for="feature in plan.features"
                :key="feature.text"
                class="flex items-start gap-3"
              >
                <!-- Included -->
                <span
                  v-if="feature.included"
                  class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                  :class="plan.featured ? 'bg-primary-400/40' : plan.dark ? 'bg-primary-500/20' : 'bg-primary-500/10'"
                >
                  <svg
                    class="h-3 w-3"
                    :class="plan.featured || plan.dark ? 'text-white' : 'text-primary-600'"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <!-- Excluded -->
                <span
                  v-else
                  class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100"
                >
                  <svg
                    class="h-3 w-3 text-gray-300"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>

                <span
                  class="text-sm leading-snug"
                  :class="[
                    !feature.included
                      ? plan.featured ? 'text-primary-300/60 line-through' : plan.dark ? 'text-gray-600 line-through' : 'text-gray-300 line-through'
                      : plan.featured ? 'text-white' : plan.dark ? 'text-gray-200' : 'text-gray-700',
                  ]"
                >
                  {{ feature.text }}
                </span>
              </li>
            </ul>

          </div>
        </div>

        <!-- Trust strip — reinforcement below pricing cards -->
        <div class="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <div class="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-white/80 px-4 py-2 text-sm font-semibold text-primary-600 shadow-sm backdrop-blur-sm">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500" aria-hidden="true" />
            {{ $t('pricing.trustStrip') }}
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Included in all plans ─────────────────────────────── -->
    <section class="border-y border-gray-200 bg-surface px-4 py-16">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-center text-sm font-bold uppercase tracking-widest text-gray-400">
          {{ $t('pricing.includedTitle') }}
        </h2>
        <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="perk in globalPerks"
            :key="perk.label"
            class="flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10">
              <UIcon :name="perk.icon" class="h-5 w-5 text-primary-600" />
            </div>
            <p class="text-center text-xs font-medium leading-snug text-gray-700">{{ perk.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FAQ ───────────────────────────────────────────────── -->
    <section class="px-4 py-24 bg-white">
      <div class="mx-auto max-w-2xl">

        <div class="mb-12 text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">{{ $t('pricing.faqTitle') }}</h2>
          <p class="mt-3 text-gray-500">{{ $t('pricing.faqSubtitle') }}</p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, i) in faq"
            :key="i"
            class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
              @click="toggleFaq(i)"
            >
              <span class="pr-6 text-sm font-semibold text-gray-900">{{ item.q }}</span>
              <span
                class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300"
                :class="faqOpen === i ? 'bg-primary-500 text-white rotate-45' : 'bg-gray-100 text-gray-500'"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>

            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-48"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-48"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="faqOpen === i" class="overflow-hidden">
                <p class="px-6 pb-5 text-sm leading-relaxed text-gray-500">{{ item.a }}</p>
              </div>
            </Transition>
          </div>
        </div>

      </div>
    </section>

    <!-- ─── Final CTA ─────────────────────────────────────────── -->
    <section class="px-4 pb-24 bg-surface">
      <div class="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-600 to-primary-800 p-12 text-center shadow-2xl shadow-primary-500/20 md:p-16 relative">

        <!-- Background glow -->
        <div class="absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
          <div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div class="relative">
          <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-200">
            {{ $t('pricing.finalCtaEyebrow') }}
          </p>
          <h2 class="text-3xl font-extrabold text-white md:text-4xl">
            {{ $t('pricing.finalCtaTitle') }}<br>{{ $t('pricing.finalCtaTitleBreak') }}
          </h2>
          <p class="mt-4 text-lg text-primary-100">
            {{ $t('pricing.finalCtaLine') }}
          </p>

          <div class="mt-8 flex flex-col items-center gap-3">
            <a
              :href="saasConfig.signupUrl"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-primary-600 shadow-lg transition-all hover:bg-primary-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              {{ $t('cta.primary') }}
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <p class="text-sm text-primary-100">{{ $t('cta.clarification') }}</p>
            <p class="text-xs text-primary-200/80">{{ $t('pricing.redirectHint') }}</p>
            <a
              :href="saasConfig.loginUrl"
              target="_blank"
              rel="noopener"
              class="text-xs font-medium text-primary-200/80 hover:text-white transition-colors"
            >
              {{ $t('cta.loginShort') }} →
            </a>
          </div>
          <CommonRiskReversalChips variant="light" :show-trial="true" class="mt-6" />
        </div>
      </div>
    </section>

  </div>
</template>
