<script setup lang="ts">
type Variant = 'primary' | 'primary-inverted' | 'ghost' | 'ghost-light'
type Size = 'xs' | 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** External URL — renders <a> with target="_blank" rel="noopener" */
    href?: string
    /** Internal route — renders <NuxtLinkLocale> */
    to?: string
    variant?: Variant
    size?: Size
    /** Show arrow icon after content */
    showArrow?: boolean
    /** Rounded corners */
    rounded?: 'lg' | 'xl'
    /** Analytics event id (no-op if no tracking) */
    track?: string
    /** Extra CSS classes */
    class?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
    showArrow: false,
    rounded: 'lg',
  },
)

const emit = defineEmits<{
  click: []
}>()

const baseClasses = 'inline-flex items-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2'

const variantClasses: Record<Variant, string> = {
  'primary':
    'bg-primary-500 text-white shadow-sm hover:bg-primary-600 focus:ring-primary-500',
  'primary-inverted':
    'bg-white text-primary-600 shadow-lg hover:bg-primary-50 hover:scale-[1.02] focus:ring-white focus:ring-offset-primary-600',
  'ghost':
    'text-gray-400 hover:text-primary-600 font-medium bg-transparent focus:ring-primary-500',
  'ghost-light':
    'text-white/60 hover:text-white/90 font-medium bg-transparent focus:ring-white',
}

const sizeClasses: Record<Size, string> = {
  xs: 'px-0 py-0 text-xs font-medium gap-0',
  sm: 'px-4 py-2 text-sm font-semibold gap-2',
  md: 'px-6 py-3 text-base font-semibold gap-2',
  lg: 'px-8 py-4 text-lg font-semibold gap-2',
}

const roundedClasses = computed(() =>
  props.rounded === 'xl' ? 'rounded-xl' : 'rounded-lg',
)

const scaleClass = computed(() => {
  if (props.variant === 'ghost' || props.variant === 'ghost-light') return ''
  if (props.size === 'xs' || props.size === 'sm') return ''
  if (props.size === 'lg') return 'hover:scale-105'
  return 'hover:scale-[1.02]'
})

const groupClass = computed(() => (props.showArrow ? 'group' : ''))

const buttonClasses = computed(() =>
  [
    baseClasses,
    groupClass.value,
    variantClasses[props.variant],
    sizeClasses[props.size],
    roundedClasses.value,
    scaleClass.value,
    props.class,
  ]
    .filter(Boolean)
    .join(' '),
)

const linkProps = computed(() => {
  if (props.to) {
    return { to: props.to }
  }
  return {
    href: props.href,
    target: '_blank',
    rel: 'noopener',
  }
})

function onClick() {
  if (props.track) {
    // Placeholder for future analytics
    // useTrack(props.track)
  }
  emit('click')
}
</script>

<template>
  <NuxtLinkLocale
    v-if="props.to"
    v-bind="linkProps"
    :class="buttonClasses"
    @click="onClick"
  >
    <slot />
    <svg
      v-if="props.showArrow"
      class="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2.5"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  </NuxtLinkLocale>
  <a
    v-else
    v-bind="linkProps"
    :class="buttonClasses"
    @click="onClick"
  >
    <slot />
    <svg
      v-if="props.showArrow"
      class="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2.5"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  </a>
</template>
