<script setup lang="ts">
import { siteConfig } from '~/config/site.config'
</script>

<template>
  <section class="border-t border-gray-200 bg-white py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-center gap-12 md:flex-row md:gap-24">
        <!-- Users Stats -->
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <svg class="h-8 w-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
            <svg class="h-8 w-8 -ml-2 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
          </div>
          <div>
            <div class="text-3xl font-bold text-gray-900 md:text-4xl">
              {{ siteConfig.stats.users }}
            </div>
            <div class="text-sm text-gray-600">Utilisateurs</div>
          </div>
        </div>

        <!-- Generations Stats -->
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <svg class="h-8 w-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
            <svg class="h-8 w-8 -ml-2 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
          </div>
          <div>
            <div class="text-3xl font-bold text-gray-900 md:text-4xl">
              {{ siteConfig.stats.generations }}
            </div>
            <div class="text-sm text-gray-600">Générations IA</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
