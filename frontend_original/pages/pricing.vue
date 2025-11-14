<script setup lang="ts">
definePageMeta({
  layout: 'marketing',
})

useHead({
  title: 'Tarifs - AI Studio Photo',
})
</script>

<template>
  <div class="container mx-auto px-4 pt-32 pb-20 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900">Nos Tarifs</h1>
      <p class="mt-4 text-xl text-gray-600">
        Choisissez l'offre qui correspond à vos besoins
      </p>
    </div>

    <div class="mt-16 grid gap-8 md:grid-cols-3">
      <!-- Pricing cards will go here -->
      <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h3 class="text-2xl font-bold text-gray-900">Gratuit</h3>
        <p class="mt-4 text-gray-600">Pour découvrir nos services</p>
        <div class="mt-8">
          <span class="text-4xl font-bold text-gray-900">0€</span>
          <span class="text-gray-600">/mois</span>
        </div>
        <ul class="mt-8 space-y-4">
          <li class="flex items-center gap-3">
            <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-600">5 générations gratuites</span>
          </li>
        </ul>
        <UButton color="neutral" size="lg" class="mt-8 w-full">
          Commencer
        </UButton>
      </div>

      <div class="rounded-2xl border-2 border-[#912efb] bg-white p-8 shadow-lg">
        <div class="mb-4 inline-block rounded-full bg-[#912efb] px-4 py-1 text-sm font-semibold text-white">
          Populaire
        </div>
        <h3 class="text-2xl font-bold text-gray-900">Pro</h3>
        <p class="mt-4 text-gray-600">Pour les créateurs actifs</p>
        <div class="mt-8">
          <span class="text-4xl font-bold text-gray-900">29€</span>
          <span class="text-gray-600">/mois</span>
        </div>
        <ul class="mt-8 space-y-4">
          <li class="flex items-center gap-3">
            <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-600">500 générations/mois</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-600">Upscaler IA inclus</span>
          </li>
        </ul>
        <UButton color="primary" size="lg" class="mt-8 w-full">
          Commencer
        </UButton>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h3 class="text-2xl font-bold text-gray-900">Entreprise</h3>
        <p class="mt-4 text-gray-600">Pour les équipes</p>
        <div class="mt-8">
          <span class="text-4xl font-bold text-gray-900">99€</span>
          <span class="text-gray-600">/mois</span>
        </div>
        <ul class="mt-8 space-y-4">
          <li class="flex items-center gap-3">
            <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-600">Générations illimitées</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-600">Support prioritaire</span>
          </li>
        </ul>
        <UButton color="neutral" size="lg" class="mt-8 w-full">
          Nous contacter
        </UButton>
      </div>
    </div>
  </div>
</template>
