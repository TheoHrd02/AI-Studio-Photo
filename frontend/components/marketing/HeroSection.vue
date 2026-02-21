<script setup lang="ts">
import { heroVideos, firstVideoUrl, videoRotationInterval } from '~/config/hero.config'
import { saasConfig } from '~/config/saas.config'

const videoUrls = heroVideos.map(v => v.url)

const personaKeys = ['ecommerce', 'fashion', 'creators'] as const

useHead({
  link: [
    { rel: 'preload', as: 'video', href: firstVideoUrl, type: 'video/mp4' },
  ],
})
</script>

<template>
  <section class="relative h-screen min-h-[600px] overflow-hidden">
    <!-- Video carousel background — client-only to prevent SSR/hydration mismatch -->
    <ClientOnly>
      <FeaturesVideoCarousel
        :videos="videoUrls"
        :interval="videoRotationInterval"
      />
      <template #fallback>
        <div class="absolute inset-0 bg-gray-900" />
      </template>
    </ClientOnly>

    <!-- Hero content -->
    <div class="relative z-20 flex h-full items-center">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <!-- Eyebrow — instantly scannable trust signals -->
          <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm shadow-sm">
            <span
              class="h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full bg-primary-400"
              aria-hidden="true"
            />
            {{ $t('hero.eyebrow') }}
          </div>

          <!-- H1 — outcome first, no jargon -->
          <h1 class="text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
            {{ $t('hero.title') }}
          </h1>

          <!-- Subtitle — always default, no persona selection -->
          <p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/85 drop-shadow-md sm:text-xl">
            {{ $t('personas.default.subtitle') }}
          </p>

          <!-- Single dominant CTA — no competing choices -->
          <div class="mt-10 flex flex-col items-center gap-3">
            <a
              :href="saasConfig.signupUrl"
              target="_blank"
              rel="noopener"
              class="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-black/25 transition-all hover:bg-primary-600 hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
            >
              {{ $t('cta.primaryWithCredits') }}
              <svg
                class="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <p class="mt-3 text-sm text-white/70">
              {{ $t('cta.clarification') }}
            </p>

            <!-- Returning-user login link — demoted to avoid choice paralysis -->
            <a
              :href="saasConfig.loginUrl"
              target="_blank"
              rel="noopener"
              class="text-sm font-medium text-white/55 underline-offset-4 transition-colors hover:text-white/85 hover:underline"
            >
              {{ $t('cta.login') }} →
            </a>
          </div>

          <!-- Persistent trust chips — speed · free · social proof -->
          <div class="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <div class="flex items-center gap-1.5 text-sm font-medium text-white/75">
              <!-- Lightning bolt — speed signal -->
              <svg
                class="h-4 w-4 flex-shrink-0 text-yellow-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13 3L4 14h7v7l9-11h-7z" />
              </svg>
              {{ $t('hero.trustChips.speed') }}
            </div>

            <span
              class="hidden h-3 w-px bg-white/20 sm:block"
              aria-hidden="true"
            />

            <div class="flex items-center gap-1.5 text-sm font-medium text-white/75">
              <!-- Check circle — risk reduction signal -->
              <svg
                class="h-4 w-4 flex-shrink-0 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ $t('hero.trustChips.free') }}
            </div>

            <span
              class="hidden h-3 w-px bg-white/20 sm:block"
              aria-hidden="true"
            />

            <div class="flex items-center gap-1.5 text-sm font-medium text-white/75">
              <!-- No skills required — reduces perceived effort -->
              <svg
                class="h-4 w-4 flex-shrink-0 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              {{ $t('hero.trustChips.noSkills') }}
            </div>

            <span
              class="hidden h-3 w-px bg-white/20 sm:block"
              aria-hidden="true"
            />

            <div class="flex items-center gap-1.5 text-sm font-medium text-white/75">
              <!-- Cancel anytime — risk reversal -->
              <svg
                class="h-4 w-4 flex-shrink-0 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
              {{ $t('hero.trustChips.cancel') }}
            </div>

            <span
              class="hidden h-3 w-px bg-white/20 sm:block"
              aria-hidden="true"
            />

            <div class="flex items-center gap-1.5 text-sm font-medium text-white/75">
              <!-- Early access — pre-launch positioning -->
              <svg
                class="h-4 w-4 flex-shrink-0 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
              {{ $t('hero.trustChips.earlyAccess') }}
            </div>
          </div>

          <!-- Persona labels — passive identification, low visual priority -->
          <p
            class="mt-8 text-xs font-medium text-white/50"
            aria-label="Audience"
          >
            {{ $t('personas.forLabel') }}
            <span
              v-for="(key, i) in personaKeys"
              :key="key"
              class="inline"
            >
              {{ $t(`personas.${key}.label`) }}<span
                v-if="i < personaKeys.length - 1"
                class="mx-1.5"
                aria-hidden="true"
              >·</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
