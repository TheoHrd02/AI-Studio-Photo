<script setup lang="ts">
/**
 * Glint Studio brand lockup: the symbol (a "G" whose open terminal catches a four-point studio glint)
 * followed by the "Glint Studio" wordmark, rendered as text in the site font.
 *
 * Same artwork as `public/logo.svg`, inlined so it stays crisp and needs no extra request.
 * The wordmark inherits font size, weight and colour from the classes set on the component.
 * The symbol is decorative: with `wordmark` off, the caller gives the surrounding link or button its name.
 */
withDefaults(defineProps<{
  /** Symbol size in px. */
  size?: number
  /** Show the "Glint Studio" wordmark next to the symbol. */
  wordmark?: boolean
}>(), { size: 32, wordmark: true })

const gradientId = `glint-bg-${useId()}`
</script>

<template>
  <span class="inline-flex min-w-0 items-center gap-2.5">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 64 64"
      class="shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          :id="gradientId"
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9d3cff"
          />
          <stop
            offset="1"
            stop-color="#6527d8"
          />
        </linearGradient>
      </defs>
      <rect
        width="64"
        height="64"
        rx="14"
        :fill="`url(#${gradientId})`"
      />
      <path
        d="M33.36 29.04A13 13 0 1 0 38 39H28"
        fill="none"
        stroke="#fff"
        stroke-width="7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M43.5 8.5Q46.1 17.9 55.5 20.5Q46.1 23.1 43.5 32.5Q40.9 23.1 31.5 20.5Q40.9 17.9 43.5 8.5Z"
        fill="#fff"
      />
    </svg>
    <span
      v-if="wordmark"
      class="min-w-0 leading-tight tracking-tight"
    >
      {{ $t('common.appName') }}
    </span>
  </span>
</template>
