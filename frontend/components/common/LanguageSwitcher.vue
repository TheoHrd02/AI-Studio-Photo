<script setup lang="ts">
const { locale, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
]

const currentLanguage = computed(() =>
  languages.find(lang => lang.code === locale.value),
)

const isOpen = ref(false)

const changeLanguage = async (code: string) => {
  setLocale(code)
  isOpen.value = false

  // Naviguer vers la nouvelle URL localisée
  const path = switchLocalePath(code)
  await navigateTo(path)
}

// Fermer le dropdown si on clique à l'extérieur
const dropdownRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false
    }
  }

  document.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="relative"
  >
    <button
      class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      aria-label="Changer de langue"
      @click="isOpen = !isOpen"
    >
      <span class="text-xl">{{ currentLanguage?.flag }}</span>
      <span class="hidden sm:inline">{{ currentLanguage?.name }}</span>
      <svg
        class="w-4 h-4 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
      >
        <button
          v-for="lang in languages"
          :key="lang.code"
          class="flex items-center gap-3 w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors"
          :class="{ 'bg-gray-100 font-semibold': locale === lang.code }"
          @click="changeLanguage(lang.code)"
        >
          <span class="text-xl">{{ lang.flag }}</span>
          <span class="flex-1">{{ lang.name }}</span>
          <svg
            v-if="locale === lang.code"
            class="w-4 h-4 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>
