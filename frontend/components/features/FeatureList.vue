<script setup lang="ts">
interface Props {
  title: string
  items: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">
          {{ title }}
        </h3>
        <ul class="space-y-4">
          <li 
            v-for="(item, index) in items" 
            :key="index"
            class="flex items-start gap-3"
          >
            <div class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/10 mt-0.5">
              <UIcon name="heroicons:check" class="h-4 w-4 text-primary-500" />
            </div>
            <span class="text-lg text-gray-700">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
