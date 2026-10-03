<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const onChange = (e: Event) => setLocale((e.target as HTMLSelectElement).value as typeof locale.value)
</script>

<template>
  <div class="relative inline-flex items-center">
    <UIcon
      name="i-lucide-globe"
      class="pointer-events-none absolute left-2.5 h-4 w-4 text-gray-500"
    />
    <select
      :value="locale"
      aria-label="Language"
      class="cursor-pointer appearance-none rounded-lg bg-transparent py-1.5 pl-8 pr-7 text-[13px] font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      @change="onChange"
    >
      <option
        v-for="l in locales"
        :key="l.code"
        :value="l.code"
      >
        {{ l.name }}
      </option>
    </select>
    <UIcon
      name="i-lucide-chevron-down"
      class="pointer-events-none absolute right-2 h-3.5 w-3.5 text-gray-400"
    />
  </div>
</template>
