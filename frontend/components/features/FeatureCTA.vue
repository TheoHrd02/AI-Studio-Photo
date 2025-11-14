<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Prêt à transformer vos visuels ?',
  description: 'Créez votre compte gratuitement et obtenez 5 crédits offerts.'
})
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-[#912efb] to-[#7e1fe0] px-8 py-16 text-center shadow-2xl">
        <h2 class="text-4xl font-bold text-white sm:text-5xl">
          {{ title }}
        </h2>
        <p class="mt-4 text-xl text-purple-100">
          {{ description }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NuxtLink
            to="/app"
            class="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#912efb] shadow-lg transition-all hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#912efb]"
          >
            Commencer gratuitement
          </NuxtLink>
          <NuxtLink
            to="/pricing"
            class="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#912efb]"
          >
            Voir les tarifs
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
