<script setup lang="ts">
import { siteConfig } from '~/config/site.config'

definePageMeta({
  layout: 'marketing',
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#912efb]/10 via-white to-[#912efb]/5 pt-32 pb-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Nos Fonctionnalités
        </h1>
        <p class="mt-6 text-xl text-gray-600">
          Découvrez nos outils d'IA pour transformer vos visuels
        </p>
      </div>

      <div class="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
        <NuxtLink
          v-for="feature in siteConfig.features"
          :key="feature.href"
          :to="feature.href"
          class="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-[#912efb] hover:shadow-xl"
        >
          <div class="flex h-16 w-16 items-center justify-center rounded-xl bg-[#912efb]/10 transition-colors group-hover:bg-[#912efb]/20">
            <svg class="h-8 w-8 text-[#912efb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="mt-6 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#912efb]">
            {{ feature.title }}
          </h3>
          <p class="mt-4 text-gray-600">
            {{ feature.description }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
