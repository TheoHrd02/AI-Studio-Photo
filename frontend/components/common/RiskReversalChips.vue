<script setup lang="ts">
useI18n()

interface Props {
  /** Light text for dark backgrounds (e.g. hero, CTA banner) */
  variant?: 'light' | 'dark'
  /** Include free trial chip (for Pro plan CTAs) */
  showTrial?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'dark',
  showTrial: false,
})

const textClass = computed(() =>
  props.variant === 'light'
    ? 'text-white/80'
    : 'text-gray-500',
)
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
    <span
      :class="textClass"
      class="inline-flex items-center gap-1.5"
    >
      <svg
        class="h-4 w-4 flex-shrink-0 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {{ $t('riskReversal.noCard') }}
    </span>
    <span
      :class="textClass"
      class="inline-flex items-center gap-1.5"
    >
      <svg
        class="h-4 w-4 flex-shrink-0 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      </svg>
      {{ $t('riskReversal.cancelAnytime') }}
    </span>
    <span
      v-if="showTrial"
      :class="textClass"
      class="inline-flex items-center gap-1.5"
    >
      <svg
        class="h-4 w-4 flex-shrink-0 text-primary-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {{ $t('riskReversal.freeTrial') }}
    </span>
  </div>
</template>
