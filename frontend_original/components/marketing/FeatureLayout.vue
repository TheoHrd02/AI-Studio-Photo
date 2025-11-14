<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
  features: string[]
}

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="pt-32 pb-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#912efb]/10">
            <UIcon :name="icon" class="h-8 w-8 text-[#912efb]" />
          </div>
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {{ title }}
          </h1>
          <p class="mt-6 text-lg text-gray-600">
            {{ description }}
          </p>
          <div class="mt-8 flex justify-center gap-4">
            <NuxtLink
              to="/app"
              class="inline-flex items-center rounded-lg bg-[#912efb] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#7e1fe0] focus:outline-none focus:ring-2 focus:ring-[#912efb] focus:ring-offset-2"
            >
              {{ $t('common.startNow') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-5xl">
          <h2 class="text-2xl font-bold text-gray-900 mb-8">{{ $t('common.mainFeatures') }}</h2>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#912efb]/10 mb-4">
                <svg class="h-6 w-6 text-[#912efb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ feature }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl rounded-2xl bg-[#912efb] px-8 py-12 text-center">
          <h2 class="text-3xl font-bold text-white">
            {{ $t('common.readyToStart') }}
          </h2>
          <p class="mt-4 text-lg text-purple-100">
            {{ $t('common.createAccountFree') }}
          </p>
          <div class="mt-8">
            <NuxtLink
              to="/app"
              class="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#912efb] shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#912efb]"
            >
              {{ $t('common.startFree') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
