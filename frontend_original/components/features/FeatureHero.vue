<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  accentText?: string
  icon: string
}

defineProps<Props>()
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-[#912efb]/10 via-white to-[#912efb]/5 pt-32 pb-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <!-- Icon -->
        <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#912efb] shadow-lg">
          <UIcon :name="icon" class="h-10 w-10 text-white" />
        </div>

        <!-- Accent Text -->
        <p v-if="accentText" class="mb-4 text-sm font-semibold uppercase tracking-wider text-[#912efb]">
          {{ accentText }}
        </p>

        <!-- Title -->
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          {{ title }}
        </h1>

        <!-- Subtitle -->
        <p class="mt-6 text-xl leading-relaxed text-gray-600 sm:text-2xl">
          {{ subtitle }}
        </p>

        <!-- CTA -->
        <div class="mt-10 flex justify-center gap-4">
          <NuxtLink
            to="/app"
            class="inline-flex items-center rounded-lg bg-[#912efb] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#7e1fe0] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#912efb] focus:ring-offset-2"
          >
            Essayer gratuitement
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
      <div class="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#912efb] to-[#7e1fe0] opacity-20" />
    </div>
  </section>
</template>
