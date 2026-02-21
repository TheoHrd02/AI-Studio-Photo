<script setup lang="ts">
import { saasConfig } from '~/config/saas.config'

export interface BenefitItem {
  icon: string
  text: string
}

const props = defineProps<{
  // Hero
  icon: string
  badge: string
  title: string
  subtitle: string
  /** @deprecated Use cta.primary from i18n — kept for prop compatibility */
  ctaLabel?: string
  // Section 01 — Concept
  whatIsTitle: string
  whatIsText1: string
  whatIsText2?: string
  /** Output result — example of generated content */
  conceptImageUrl: string
  conceptImageAlt?: string
  /** Optional: before image for transformation clarity (before/after in Concept section) */
  beforeImageUrl?: string
  beforeImageAlt?: string
  // Section 02 — Benefits
  whyTitle: string
  benefits: BenefitItem[]
  // Section 03 — Steps
  howTitle: string
  steps: string[]
  /** Workflow/interface screenshot (replaces gradient mockup) */
  workflowImageUrl: string
  workflowImageAlt?: string
  // Section 04 — Quotes
  quotes: string[]
  // Final CTA
  finalCtaTitle: string
  finalCtaSub: string
  finalCtaBtnPrimary: string
  finalCtaBtnSecondary: string
}>()

// One reveal hook per section
const r1 = useReveal() // concept
const r2 = useReveal() // benefits
const r3 = useReveal() // steps
const r4 = useReveal() // quotes
const r5 = useReveal(0.06) // final CTA

const { t } = useI18n()

const trustChips = computed(() => [
  { icon: 'heroicons:bolt', label: t('hero.trustChips.speed') },
  { icon: 'heroicons:check-circle', label: t('hero.trustChips.noSkills') },
  { icon: 'heroicons:rocket-launch', label: t('hero.trustChips.earlyAccess') },
])
</script>

<template>
  <div class="min-h-screen bg-white">

    <!-- ─── Hero ──────────────────────────────────────────────── -->
    <section class="relative overflow-hidden pt-28 pb-20">

      <!-- Background gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-primary-50/70 via-white to-white pointer-events-none" aria-hidden="true" />

      <!-- Background blobs -->
      <div class="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary-500/8 blur-3xl pointer-events-none" aria-hidden="true" />
      <div class="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-primary-300/6 blur-3xl pointer-events-none" aria-hidden="true" />

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">

          <!-- Eyebrow badge (above icon for clear hierarchy) -->
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600">
            <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500" />
            {{ badge }}
          </div>

          <!-- Icon with glow ring — vertically centered block -->
          <div class="relative mx-auto mb-6 flex justify-center">
            <div class="absolute inset-0 scale-[2] rounded-full bg-primary-500/15 blur-2xl" aria-hidden="true" />
            <div class="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-2xl shadow-primary-500/30">
              <UIcon :name="icon" class="h-10 w-10 text-white" />
            </div>
          </div>

          <!-- Title (directly below icon) -->
          <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight">
            {{ title }}
          </h1>

          <!-- Subtitle -->
          <p class="mt-5 text-xl leading-relaxed text-gray-500 sm:text-2xl">
            {{ subtitle }}
          </p>

          <!-- CTAs -->
          <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:items-center">
            <a
              :href="saasConfig.signupUrl"
              target="_blank"
              rel="noopener"
              class="group inline-flex items-center gap-3 rounded-xl bg-primary-500 px-6 py-3.5 shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span class="flex flex-col items-start text-left">
                <span class="whitespace-nowrap text-base font-bold leading-tight text-white sm:text-lg">{{ $t('cta.featureButtonLine1') }}</span>
                <span class="mt-0.5 whitespace-nowrap text-xs font-medium leading-tight text-white/90 sm:text-sm">{{ $t('cta.featureButtonLine2') }}</span>
              </span>
              <svg class="h-4 w-4 flex-shrink-0 text-white/90 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <p class="text-sm text-gray-500">{{ $t('cta.clarification') }}</p>
            <NuxtLink
              to="/pricing"
              class="text-xs font-medium text-gray-400 hover:text-primary-600 transition-colors"
            >
              {{ $t('cta.pricing') }}
            </NuxtLink>
            <CommonRiskReversalChips class="mt-4" />
          </div>

          <!-- Trust chips -->
          <div class="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div
              v-for="chip in trustChips"
              :key="chip.label"
              class="flex items-center gap-2 text-sm text-gray-400"
            >
              <UIcon :name="chip.icon" class="h-4 w-4 text-primary-500/70" />
              {{ chip.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── 01 — Concept ─────────────────────────────────────── -->
    <section
      :ref="r1.el"
      :class="r1.cls()"
      class="py-24"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">

          <!-- Text side -->
          <div>
            <p class="mb-3 text-xs font-bold uppercase tracking-widest text-primary-500">
              {{ $t('featurePageSection.sectionConcept') }}
            </p>
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {{ whatIsTitle }}
            </h2>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="mt-5 text-lg leading-relaxed text-gray-600" v-html="whatIsText1" />
            <p v-if="whatIsText2" class="mt-4 text-base italic leading-relaxed text-gray-400">
              {{ whatIsText2 }}
            </p>
          </div>

          <!-- Visual proof — output result or before/after -->
          <div class="relative">
            <div class="absolute -inset-4 rounded-3xl bg-primary-500/8 blur-2xl" aria-hidden="true" />
            <div v-if="beforeImageUrl" class="relative grid grid-cols-2 gap-3">
              <!-- Before -->
              <div class="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-200/50">
                <img
                  :src="beforeImageUrl"
                  :alt="beforeImageAlt ?? $t('beforeAfter.before')"
                  class="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div class="absolute bottom-3 inset-x-3 flex justify-center">
                  <div class="inline-flex items-center gap-2 rounded-full bg-gray-900/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    {{ $t('beforeAfter.before') }}
                  </div>
                </div>
              </div>
              <!-- After -->
              <div class="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-200/50">
                <img
                  :src="conceptImageUrl"
                  :alt="conceptImageAlt ?? title"
                  class="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div class="absolute bottom-3 inset-x-3 flex justify-center">
                  <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-sm">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                    {{ $t('beforeAfter.after') }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-200/50">
              <img
                :src="conceptImageUrl"
                :alt="conceptImageAlt ?? title"
                class="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div class="absolute bottom-4 inset-x-4 flex justify-center">
                <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-sm">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  {{ $t('featurePageSection.outputLabel') }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ─── 02 — Benefits ─────────────────────────────────────── -->
    <section
      :ref="r2.el"
      class="py-20 bg-surface"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-6xl">

          <!-- Section header -->
          <div
            :class="[
              'mb-12 transition-all duration-700',
              r2.revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            ]"
          >
            <p class="mb-2 text-xs font-bold uppercase tracking-widest text-primary-500">{{ $t('featurePageSection.sectionBenefits') }}</p>
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {{ whyTitle }}
            </h2>
          </div>

          <!-- Benefit cards -->
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(benefit, i) in benefits"
              :key="i"
              :class="[
                'group rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100',
                'transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:ring-primary-200',
                r2.revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              ]"
              :style="`transition-delay: ${i * 120}ms`"
            >
              <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/15 to-primary-500/5 ring-1 ring-primary-500/10 transition-colors group-hover:from-primary-500/25 group-hover:to-primary-500/10">
                <UIcon :name="benefit.icon" class="h-6 w-6 text-primary-600" />
              </div>
              <p class="text-base font-medium leading-relaxed text-gray-700">{{ benefit.text }}</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ─── 03 — How to use ───────────────────────────────────── -->
    <section
      :ref="r3.el"
      :class="r3.cls()"
      class="py-24 bg-white"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-6xl">

          <div class="grid items-center gap-14 lg:grid-cols-2 lg:grid-flow-dense">

            <!-- Steps side (right col on desktop) -->
            <div class="lg:col-start-2">
              <p class="mb-3 text-xs font-bold uppercase tracking-widest text-primary-500">{{ $t('featurePageSection.sectionHowToUse') }}</p>
              <h2 class="mb-10 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {{ howTitle }}
              </h2>

              <!-- Timeline steps -->
              <div class="relative">
                <!-- Vertical connector line -->
                <div class="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary-300 via-primary-200 to-transparent hidden sm:block" aria-hidden="true" />

                <div
                  v-for="(step, i) in steps"
                  :key="i"
                  class="relative flex items-start gap-5 pb-8 last:pb-0"
                  :class="[
                    'transition-all duration-500',
                    r3.revealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
                  ]"
                  :style="`transition-delay: ${i * 130}ms`"
                >
                  <!-- Step number bubble -->
                  <div class="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white shadow-lg shadow-primary-500/25">
                    {{ i + 1 }}
                  </div>
                  <!-- Step text -->
                  <div class="pt-1.5">
                    <p class="text-base leading-relaxed text-gray-700">{{ step }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Visual proof — workflow / interface -->
            <div class="lg:col-start-1 lg:row-start-1">
              <div class="relative">
                <div class="absolute -inset-4 rounded-3xl bg-primary-500/8 blur-2xl" aria-hidden="true" />
                <div class="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-200/50">
                  <img
                    :src="workflowImageUrl"
                    :alt="workflowImageAlt ?? howTitle"
                    class="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <div class="absolute bottom-4 inset-x-4 flex justify-center">
                    <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-sm">
                      <span class="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" aria-hidden="true" />
                      {{ steps.length }} {{ $t('featurePageSection.stepsLabel') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- ─── 04 — Quotes / Outcomes ───────────────────────────── -->
    <section
      :ref="r4.el"
      class="py-20 bg-gradient-to-b from-white to-surface"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-5xl">

          <p
            :class="[
              'mb-10 text-center text-xs font-bold uppercase tracking-widest text-primary-500 transition-all duration-700',
              r4.revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ]"
          >
            {{ $t('featurePageSection.sectionOutcomes') }}
          </p>

          <div class="grid gap-6 md:grid-cols-3">
            <div
              v-for="(quote, i) in quotes"
              :key="i"
              :class="[
                'group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100',
                'transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:ring-primary-200',
                r4.revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              ]"
              :style="`transition-delay: ${i * 130}ms`"
            >
              <!-- Decorative quote mark -->
              <div class="absolute top-4 right-5 text-6xl font-serif leading-none text-primary-500/10 select-none transition-colors group-hover:text-primary-500/20" aria-hidden="true">
                "
              </div>

              <!-- Accent line -->
              <div class="mb-5 h-0.5 w-8 rounded-full bg-primary-500" />

              <p class="relative text-base font-medium leading-relaxed text-gray-800">
                {{ quote }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ─── Final CTA ─────────────────────────────────────────── -->
    <section class="px-4 py-16 md:py-24">
      <div
        :ref="r5.el"
        :class="r5.cls('duration-700')"
        class="mx-auto max-w-4xl"
      >
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-600 to-primary-800 px-8 py-16 text-center shadow-2xl shadow-primary-500/20 md:px-16">

          <!-- Background glows -->
          <div class="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/6 blur-3xl" aria-hidden="true" />
          <div class="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/6 blur-3xl" aria-hidden="true" />

          <div class="relative">
            <h2 class="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              {{ finalCtaTitle }}
            </h2>
            <p class="mt-4 text-lg text-primary-100">
              {{ finalCtaSub }}
            </p>

            <div class="mt-10 flex flex-col items-center gap-3">
              <a
                :href="saasConfig.signupUrl"
                target="_blank"
                rel="noopener"
                class="group inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 shadow-lg transition-all hover:bg-primary-50 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
              >
                <span class="flex flex-col items-start text-left">
                  <span class="whitespace-nowrap text-base font-bold leading-tight text-primary-600 sm:text-lg">{{ $t('cta.featureButtonLine1') }}</span>
                  <span class="mt-0.5 whitespace-nowrap text-xs font-medium leading-tight text-primary-600/80 sm:text-sm">{{ $t('cta.featureButtonLine2') }}</span>
                </span>
                <svg class="h-4 w-4 flex-shrink-0 text-primary-600/80 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <p class="text-sm text-primary-100">{{ $t('cta.clarification') }}</p>
              <NuxtLink
                to="/pricing"
                class="text-xs font-medium text-white/60 hover:text-white/90 transition-colors"
              >
                {{ finalCtaBtnSecondary }}
              </NuxtLink>
            </div>
            <CommonRiskReversalChips variant="light" class="mt-6" />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
