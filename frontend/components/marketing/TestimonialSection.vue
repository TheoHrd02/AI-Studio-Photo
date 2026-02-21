<script setup lang="ts">
const { t } = useI18n()

const useCases = computed(() => [
  { key: '1' },
  { key: '2' },
  { key: '3' },
])
</script>

<template>
  <section class="relative overflow-hidden bg-white py-12 md:py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">

        <!-- Section header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/8 px-4 py-1.5 text-sm font-semibold text-primary-600 mb-6">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500" aria-hidden="true" />
            {{ $t('testimonials.badge') }}
          </div>
          <h2 class="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {{ $t('testimonials.title') }}
          </h2>
          <p class="mt-5 max-w-2xl mx-auto text-lg text-gray-600">
            {{ $t('testimonials.subtitle') }}
          </p>
        </div>

        <!-- Use case cards -->
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="item in useCases"
            :key="item.key"
            class="group relative rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100 transition-all duration-300 hover:shadow-xl hover:ring-primary-200"
          >
            <!-- Outcome quote -->
            <blockquote class="text-base font-medium leading-relaxed text-gray-700">
              {{ $t(`testimonials.items.${item.key}.quote`) }}
            </blockquote>

            <!-- Role & industry — no fake names -->
            <footer class="mt-6 flex items-center gap-4">
              <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-lg font-bold text-primary-600 ring-2 ring-primary-500/20">
                {{ $t(`testimonials.items.${item.key}.avatarLetter`) }}
              </div>
              <div>
                <p class="font-semibold text-gray-900">
                  {{ $t(`testimonials.items.${item.key}.role`) }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ $t(`testimonials.items.${item.key}.industry`) }}
                </p>
              </div>
            </footer>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
