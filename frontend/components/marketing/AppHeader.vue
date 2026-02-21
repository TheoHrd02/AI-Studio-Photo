<script setup lang="ts">
import { saasConfig } from '~/config/saas.config'

const { t } = useI18n()

const isMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)

const navigation = computed(() => [
  {
    label: t('nav.features'),
    children: [
      {
        label: t('nav.studioVirtuel.label'),
        description: t('nav.studioVirtuel.description'),
        href: '/features/studio-virtuel',
        icon: 'heroicons:camera'
      },
      {
        label: t('nav.mannequinVirtuel.label'),
        description: t('nav.mannequinVirtuel.description'),
        href: '/features/mannequin-virtuel',
        icon: 'heroicons:user-circle'
      },
      {
        label: t('nav.motionStudio.label'),
        description: t('nav.motionStudio.description'),
        href: '/features/motion-studio',
        icon: 'heroicons:play-circle'
      }
    ]
  },
  { label: t('nav.gallery'), href: '/gallery' },
  { label: t('nav.pricing'), href: '/pricing' },
  { label: t('nav.help'), href: '/help' }
])

const showDropdown = (label: string) => {
  openDropdown.value = label
}

const hideDropdown = () => {
  openDropdown.value = null
}
</script>

<template>
  <header class="fixed top-0 z-50 w-full pt-6">
    <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm">
        <div class="flex h-16 items-center justify-between px-6">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2.5">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
              <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-base font-bold text-gray-900">{{ $t('common.appName') }}</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden items-center gap-7 md:flex">
            <template v-for="item in navigation" :key="item.label">
              <!-- Dropdown pour Fonctionnalités -->
              <div 
                v-if="item.children" 
                class="relative"
                @mouseenter="showDropdown(item.label)"
                @mouseleave="hideDropdown"
              >
                <button class="group flex items-center gap-1 text-[13px] font-medium text-gray-600 transition-colors hover:text-gray-900 cursor-pointer">
                  {{ item.label }}
                  <svg class="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Dropdown Panel -->
                <Transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-1"
                >
                  <div 
                    v-show="openDropdown === item.label"
                    class="absolute left-0 top-full mt-2 w-80 p-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50"
                  >
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.href"
                      :to="child.href"
                      class="flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-gray-50 hover:shadow-sm cursor-pointer group"
                    >
                      <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 transition-colors group-hover:bg-primary-500/20">
                        <UIcon :name="child.icon" class="h-5 w-5 text-primary-500" />
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">{{ child.label }}</p>
                        <p class="text-xs text-gray-500 mt-0.5">{{ child.description }}</p>
                      </div>
                    </NuxtLink>
                  </div>
                </Transition>
              </div>

              <!-- Liens normaux -->
              <NuxtLink
                v-else
                :to="item.href"
                class="text-[13px] font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {{ item.label }}
              </NuxtLink>
            </template>
          </nav>

          <!-- CTA Button -->
          <div class="hidden items-center gap-4 md:flex">
            <a
              :href="saasConfig.signupUrl"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {{ $t('cta.header') }}
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2 text-gray-600 hover:text-gray-900"
            @click="isMenuOpen = !isMenuOpen"
            aria-label="Menu"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Free Gems Badge - Positionné sous le header blanc, aligné à droite -->
      <!-- <div class="absolute right-6 top-full mt-2 hidden md:block">
        <div class="flex items-center gap-2 rounded-lg bg-gray-900 px-3.5 py-1.5 shadow-lg transition-all hover:bg-gray-800 cursor-pointer">
          <svg class="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-xs font-semibold text-white">Obtiens 5 crédits gratuits</span>
        </div>
      </div> -->
    </div>

    <!-- Mobile Menu -->
    <ClientOnly>
      <div
        v-show="isMenuOpen"
        class="border-t border-gray-200 bg-white md:hidden"
      >
        <nav class="container mx-auto flex flex-col gap-2 px-4 py-4">
          <template v-for="item in navigation" :key="item.label">
            <!-- Dropdown mobile pour Fonctionnalités -->
            <div v-if="item.children" class="flex flex-col gap-2">
              <p class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">{{ item.label }}</p>
              <NuxtLink
                v-for="child in item.children"
                :key="child.href"
                :to="child.href"
                class="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                @click="isMenuOpen = false"
              >
                <UIcon :name="child.icon" class="h-4 w-4" />
                {{ child.label }}
              </NuxtLink>
            </div>

            <!-- Liens normaux mobile -->
            <NuxtLink
              v-else
              :to="item.href"
              class="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              @click="isMenuOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
          </template>

          <a
            :href="saasConfig.signupUrl"
            target="_blank"
            rel="noopener"
            class="mt-4 inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="isMenuOpen = false"
          >
            {{ $t('cta.header') }}
          </a>
        </nav>
      </div>
    </ClientOnly>
  </header>
</template>
