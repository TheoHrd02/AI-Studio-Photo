<script setup lang="ts">
import { saasConfig } from '~/config/saas.config'

const { t } = useI18n()

const steps = computed(() => [
  {
    key: 'upload',
    title: t('productWalkthrough.steps.upload.title'),
    description: t('productWalkthrough.steps.upload.description'),
    icon: 'heroicons:arrow-up-tray',
  },
  {
    key: 'choose',
    title: t('productWalkthrough.steps.choose.title'),
    description: t('productWalkthrough.steps.choose.description'),
    icon: 'heroicons:squares-2x2',
  },
  {
    key: 'generate',
    title: t('productWalkthrough.steps.generate.title'),
    description: t('productWalkthrough.steps.generate.description'),
    icon: 'heroicons:sparkles',
  },
  {
    key: 'download',
    title: t('productWalkthrough.steps.download.title'),
    description: t('productWalkthrough.steps.download.description'),
    icon: 'heroicons:arrow-down-tray',
  },
])
</script>

<template>
  <section class="py-16 md:py-24 bg-surface">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <!-- Header -->
        <div class="text-center mb-14">
          <div class="inline-block px-4 py-2 bg-primary-500/10 rounded-full text-primary-600 font-semibold text-sm mb-4">
            {{ $t('productWalkthrough.badge') }}
          </div>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {{ $t('productWalkthrough.title') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            {{ $t('productWalkthrough.subtitle') }}
          </p>
          <p class="text-sm text-gray-500 italic">
            {{ $t('productWalkthrough.framing') }}
          </p>
        </div>

        <!-- 4-step workflow with illustrative previews -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(step, index) in steps"
            :key="step.key"
            class="group"
          >
            <!-- Step number -->
            <div class="flex items-center gap-2 mb-4">
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                {{ index + 1 }}
              </span>
            </div>

            <!-- Illustrative UI preview (conceptual mockup) -->
            <div
              class="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:shadow-md group-hover:ring-primary-500/20 mb-4"
              :class="{ 'aspect-[4/3]': step.key !== 'generate', 'aspect-[4/3]': step.key === 'generate' }"
            >
              <!-- Upload mockup -->
              <div
                v-if="step.key === 'upload'"
                class="absolute inset-0 flex flex-col items-center justify-center p-6"
              >
                <div class="w-full flex-1 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/80 flex flex-col items-center justify-center gap-2">
                  <UIcon
                    name="heroicons:cloud-arrow-up"
                    class="h-10 w-10 text-gray-400"
                  />
                  <span class="text-xs font-medium text-gray-500">{{ $t('productWalkthrough.mockup.uploadHint') }}</span>
                </div>
              </div>

              <!-- Choose Scene mockup -->
              <div
                v-else-if="step.key === 'choose'"
                class="absolute inset-0 p-4"
              >
                <div class="grid grid-cols-2 gap-2 h-full">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="rounded-lg bg-gradient-to-br from-gray-100 to-gray-200"
                  />
                </div>
              </div>

              <!-- Generate mockup -->
              <div
                v-else-if="step.key === 'generate'"
                class="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gray-50/50"
              >
                <div class="w-full space-y-3">
                  <div class="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div class="h-full w-3/4 rounded-full bg-primary-500 animate-pulse" />
                  </div>
                  <div class="flex items-center gap-2 justify-center">
                    <UIcon
                      name="heroicons:sparkles"
                      class="h-5 w-5 text-primary-500"
                    />
                    <span class="text-xs font-medium text-gray-600">{{ $t('productWalkthrough.mockup.generating') }}</span>
                  </div>
                </div>
              </div>

              <!-- Download mockup -->
              <div
                v-else-if="step.key === 'download'"
                class="absolute inset-0 flex flex-col items-center justify-center p-6"
              >
                <div class="flex flex-col items-center gap-3">
                  <div class="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/10">
                    <UIcon
                      name="heroicons:check-circle"
                      class="h-8 w-8 text-primary-500"
                    />
                  </div>
                  <div class="h-3 w-24 rounded bg-gray-200" />
                  <div class="h-8 w-32 rounded-lg bg-primary-500/20" />
                </div>
              </div>
            </div>

            <!-- Step content -->
            <h3 class="text-base font-bold text-gray-900 mb-1">
              {{ step.title }}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-14 text-center">
          <a
            :href="saasConfig.signupUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all shadow-lg hover:scale-105"
          >
            {{ $t('cta.primary') }}
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <p class="mt-3 text-sm text-gray-500">
            {{ $t('cta.clarification') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
