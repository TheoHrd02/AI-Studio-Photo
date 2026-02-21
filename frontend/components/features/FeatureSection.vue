<script setup lang="ts">
interface Props {
  title: string
  content: string
  imagePosition?: 'left' | 'right'
  imagePlaceholder?: string
}

withDefaults(defineProps<Props>(), {
  imagePosition: 'right',
  imagePlaceholder: 'https://placehold.co/600x400/4F46E5/white?text=Image',
})
</script>

<template>
  <div class="py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2"
        :class="imagePosition === 'left' ? 'lg:grid-flow-dense' : ''"
      >
        <!-- Contenu -->
        <div :class="imagePosition === 'left' ? 'lg:col-start-2' : ''">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {{ title }}
          </h2>
          <div
            class="mt-6 text-lg leading-relaxed text-gray-600"
            v-html="content"
          />
        </div>

        <!-- Image -->
        <div
          :class="imagePosition === 'left' ? 'lg:col-start-1 lg:row-start-1' : ''"
          class="relative"
        >
          <div class="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
            <img
              :src="imagePlaceholder"
              :alt="title"
              class="h-full w-full object-cover"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
