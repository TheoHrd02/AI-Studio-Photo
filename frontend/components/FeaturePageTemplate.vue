<script setup lang="ts">
export interface BenefitItem {
  icon: string
  text: string
}

defineProps<{
  // Hero
  icon: string
  badge: string
  title: string
  subtitle: string
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
  /** Studio not open in the app yet: "coming soon" badge, contact CTA instead of sign-up */
  comingSoon?: boolean
}>()

// One reveal hook per section
const r1 = useReveal() // concept
const r2 = useReveal() // benefits
const r3 = useReveal() // steps
const r4 = useReveal() // quotes
const r5 = useReveal(0.06) // final CTA

const { t } = useI18n()
const { signupUrl } = useAppLinks()

// No speed chip here: it is about images, and a Motion Studio video takes minutes
const trustChips = computed(() => [
  { icon: 'heroicons:check-circle', label: t('hero.trustChips.noSkills') },
  { icon: 'heroicons:rocket-launch', label: t('hero.trustChips.earlyAccess') },
])
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- ─── Hero ──────────────────────────────────────────────── -->
    <section class="relative overflow-hidden pt-28 pb-20">
      <!-- Background gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-primary-50/70 via-white to-white pointer-events-none"
        aria-hidden="true"
      />

      <!-- Background blobs -->
      <div
        class="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary-500/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-primary-300/6 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <!-- Eyebrow badge (above icon for clear hierarchy) -->
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600">
            <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500" />
            {{ badge }}
          </div>
          <CommonComingSoonBadge
            v-if="comingSoon"
            class="mb-6 ml-2 align-top"
          />

          <!-- Icon with glow ring — vertically centered block -->
          <div class="relative mx-auto mb-6 flex justify-center">
            <div
              class="absolute inset-0 scale-[2] rounded-full bg-primary-500/15 blur-2xl"
              aria-hidden="true"
            />
            <div class="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-2xl shadow-primary-500/30">
              <UIcon
                :name="icon"
                class="h-10 w-10 text-white"
              />
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
          <div
            v-if="comingSoon"
            class="mt-10 flex flex-col items-center gap-4"
          >
            <CommonCTAButton
              to="/help#contact"
              variant="primary"
              size="md"
              rounded="xl"
              show-arrow
              class="px-6 py-3.5 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
            >
              {{ $t('cta.comingSoon.button') }}
            </CommonCTAButton>
            <p class="text-sm text-gray-500">
              {{ $t('cta.comingSoon.note') }}
            </p>
          </div>
          <div
            v-else
            class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:items-center"
          >
            <CommonCTAButton
              :href="signupUrl"
              variant="primary"
              size="md"
              rounded="xl"
              show-arrow
              class="group gap-3 px-6 py-3.5 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
            >
              <span class="flex flex-col items-start text-left">
                <span class="whitespace-nowrap text-base font-bold leading-tight text-white sm:text-lg">{{ $t('cta.featureButtonLine1') }}</span>
                <span class="mt-0.5 whitespace-nowrap text-xs font-medium leading-tight text-white/90 sm:text-sm">{{ $t('cta.featureButtonLine2') }}</span>
              </span>
            </CommonCTAButton>
            <p class="text-sm text-gray-500">
              {{ $t('cta.clarification') }}
            </p>
            <CommonRiskReversalChips class="mt-4" />
          </div>

          <!-- Trust chips -->
          <div class="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div
              v-for="chip in trustChips"
              :key="chip.label"
              class="flex items-center gap-2 text-sm text-gray-400"
            >
              <UIcon
                :name="chip.icon"
                class="h-4 w-4 text-primary-500/70"
              />
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
            <!-- eslint-disable vue/no-v-html -- trusted i18n string -->
            <p
              class="mt-5 text-lg leading-relaxed text-gray-600"
              v-html="whatIsText1"
            />
            <!-- eslint-enable vue/no-v-html -->
            <p
              v-if="whatIsText2"
              class="mt-4 text-base italic leading-relaxed text-gray-400"
            >
              {{ whatIsText2 }}
            </p>
          </div>

          <!-- Visual proof — output result or before/after -->
          <div class="relative">
            <div
              class="absolute -inset-4 rounded-3xl bg-primary-500/8 blur-2xl"
              aria-hidden="true"
            />
            <div
              v-if="beforeImageUrl"
              class="relative grid grid-cols-2 gap-3"
            >
              <!-- Before -->
              <div class="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-200/50">
                <img
                  :src="beforeImageUrl"
                  :alt="beforeImageAlt ?? $t('beforeAfter.before')"
                  class="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                >
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
                >
                <div class="absolute bottom-3 inset-x-3 flex justify-center">
                  <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-sm">
                    <span
                      class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
                      aria-hidden="true"
                    />
                    {{ $t('beforeAfter.after') }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-200/50"
            >
              <img
                :src="conceptImageUrl"
                :alt="conceptImageAlt ?? title"
                class="aspect-[4/3] w-full object-cover"
                loading="lazy"
              >
              <div class="absolute bottom-4 inset-x-4 flex justify-center">
                <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-sm">
                  <span
                    class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
                    aria-hidden="true"
                  />
                  {{ $t('featurePageSection.outputLabel') }}
                </div>
              </div>
            </div>
            <!-- Stock pictures (config/visual-proof.config.ts): say so until real outputs replace them -->
            <p class="relative mt-3 text-center text-xs text-gray-500">
              {{ $t('beforeAfter.illustrativeLabel') }}
            </p>
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
            <p class="mb-2 text-xs font-bold uppercase tracking-widest text-primary-500">
              {{ $t('featurePageSection.sectionBenefits') }}
            </p>
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
                <UIcon
                  :name="benefit.icon"
                  class="h-6 w-6 text-primary-600"
                />
              </div>
              <p class="text-base font-medium leading-relaxed text-gray-700">
                {{ benefit.text }}
              </p>
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
              <p class="mb-3 text-xs font-bold uppercase tracking-widest text-primary-500">
                {{ $t('featurePageSection.sectionHowToUse') }}
              </p>
              <h2 class="mb-10 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {{ howTitle }}
              </h2>

              <!-- Timeline steps -->
              <div class="relative">
                <!-- Vertical connector line -->
                <div
                  class="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary-300 via-primary-200 to-transparent hidden sm:block"
                  aria-hidden="true"
                />

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
                    <p class="text-base leading-relaxed text-gray-700">
                      {{ step }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Visual proof — workflow / interface -->
            <div class="lg:col-start-1 lg:row-start-1">
              <div class="relative">
                <div
                  class="absolute -inset-4 rounded-3xl bg-primary-500/8 blur-2xl"
                  aria-hidden="true"
                />
                <div class="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-200/50">
                  <img
                    :src="workflowImageUrl"
                    :alt="workflowImageAlt ?? howTitle"
                    class="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  >
                  <div class="absolute bottom-4 inset-x-4 flex justify-center">
                    <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-sm">
                      <span
                        class="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse"
                        aria-hidden="true"
                      />
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
              <div
                class="absolute top-4 right-5 text-6xl font-serif leading-none text-primary-500/10 select-none transition-colors group-hover:text-primary-500/20"
                aria-hidden="true"
              >
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
          <div
            class="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/6 blur-3xl"
            aria-hidden="true"
          />
          <div
            class="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/6 blur-3xl"
            aria-hidden="true"
          />

          <div class="relative">
            <h2 class="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              {{ finalCtaTitle }}
            </h2>
            <p class="mt-4 text-lg text-primary-100">
              {{ finalCtaSub }}
            </p>

            <div
              v-if="comingSoon"
              class="mt-10 flex flex-col items-center gap-3"
            >
              <CommonCTAButton
                to="/help#contact"
                variant="primary-inverted"
                size="md"
                rounded="xl"
                show-arrow
                class="px-6 py-3.5"
              >
                {{ $t('cta.comingSoon.button') }}
              </CommonCTAButton>
            </div>
            <div
              v-else
              class="mt-10 flex flex-col items-center gap-3"
            >
              <CommonCTAButton
                :href="signupUrl"
                variant="primary-inverted"
                size="md"
                rounded="xl"
                show-arrow
                class="group gap-3 px-6 py-3.5"
              >
                <span class="flex flex-col items-start text-left">
                  <span class="whitespace-nowrap text-base font-bold leading-tight text-primary-600 sm:text-lg">{{ $t('cta.featureButtonLine1') }}</span>
                  <span class="mt-0.5 whitespace-nowrap text-xs font-medium leading-tight text-primary-600/80 sm:text-sm">{{ $t('cta.featureButtonLine2') }}</span>
                </span>
              </CommonCTAButton>
              <p class="text-sm text-primary-100">
                {{ $t('cta.clarification') }}
              </p>
            </div>
            <CommonRiskReversalChips
              v-if="!comingSoon"
              variant="light"
              class="mt-6"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
