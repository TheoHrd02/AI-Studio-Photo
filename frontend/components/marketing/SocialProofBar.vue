<script setup lang="ts">
useI18n()
</script>

<template>
  <section class="border-y border-gray-200 bg-surface py-8 md:py-10">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <p class="mb-4 text-center text-xs font-bold uppercase tracking-widest text-gray-400">
        {{ $t('socialProof.header') }}
      </p>
      <div class="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        <p class="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          {{ $t('socialProof.headline') }}
        </p>
        <p class="text-base font-medium text-gray-600">
          {{ $t('socialProof.subline') }}
        </p>
      </div>
    </div>
  </section>
</template>
