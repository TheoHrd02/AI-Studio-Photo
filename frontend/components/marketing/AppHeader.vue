<script setup lang="ts">
import { siteConfig } from '~/config/site.config'
import { saasConfig } from '~/config/saas.config'

const { t } = useI18n()
const isMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)

const navigation = computed(() =>
  siteConfig.navigation.map((item) => {
    if (item.children) {
      return {
        id: item.id,
        label: t(`nav.${item.id}`),
        children: item.children.map(child => ({
          label: t(`nav.${child.id}.label`),
          description: t(`nav.${child.id}.description`),
          href: child.href,
          icon: child.icon,
        })),
      }
    }
    return { id: item.id, label: t(`nav.${item.id}`), href: item.href }
  }),
)

const showDropdown = (id: string) => {
  openDropdown.value = id
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
          <NuxtLinkLocale
            to="/"
            class="flex items-center gap-2.5"
          >
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
              <svg
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span class="text-base font-bold text-gray-900">{{ $t('common.appName') }}</span>
          </NuxtLinkLocale>

          <!-- Desktop Navigation -->
          <nav class="hidden items-center gap-7 md:flex">
            <template
              v-for="item in navigation"
              :key="item.id"
            >
              <!-- Dropdown pour Fonctionnalités -->
              <div
                v-if="item.children"
                class="relative"
                @mouseenter="showDropdown(item.id)"
                @mouseleave="hideDropdown"
              >
                <button class="group flex items-center gap-1 text-[13px] font-medium text-gray-600 transition-colors hover:text-gray-900 cursor-pointer">
                  {{ item.label }}
                  <svg
                    class="h-4 w-4 transition-transform group-hover:translate-y-0.5"
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
                    v-show="openDropdown === item.id"
                    class="absolute left-0 top-full mt-2 w-80 p-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50"
                  >
                    <NuxtLinkLocale
                      v-for="child in item.children"
                      :key="child.href"
                      :to="child.href"
                      class="flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-gray-50 hover:shadow-sm cursor-pointer group"
                    >
                      <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 transition-colors group-hover:bg-primary-500/20">
                        <UIcon
                          :name="child.icon"
                          class="h-5 w-5 text-primary-500"
                        />
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                          {{ child.label }}
                        </p>
                        <p class="text-xs text-gray-500 mt-0.5">
                          {{ child.description }}
                        </p>
                      </div>
                    </NuxtLinkLocale>
                  </div>
                </Transition>
              </div>

              <!-- Liens normaux -->
              <NuxtLinkLocale
                v-else
                :to="item.href"
                class="text-[13px] font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {{ item.label }}
              </NuxtLinkLocale>
            </template>
          </nav>

          <!-- CTA Button -->
          <div class="hidden items-center gap-2 md:flex">
            <CommonLanguageSelect />
            <CommonCTAButton
              :href="saasConfig.signupUrl"
              variant="primary"
              size="sm"
            >
              {{ $t('cta.header') }}
            </CommonCTAButton>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2 text-gray-600 hover:text-gray-900"
            :aria-label="$t('common.menu')"
            @click="isMenuOpen = !isMenuOpen"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <ClientOnly>
      <div
        v-show="isMenuOpen"
        class="border-t border-gray-200 bg-white md:hidden"
      >
        <nav class="container mx-auto flex flex-col gap-2 px-4 py-4">
          <template
            v-for="item in navigation"
            :key="item.id"
          >
            <!-- Dropdown mobile pour Fonctionnalités -->
            <div
              v-if="item.children"
              class="flex flex-col gap-2"
            >
              <p class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
                {{ item.label }}
              </p>
              <NuxtLinkLocale
                v-for="child in item.children"
                :key="child.href"
                :to="child.href"
                class="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                @click="isMenuOpen = false"
              >
                <UIcon
                  :name="child.icon"
                  class="h-4 w-4"
                />
                {{ child.label }}
              </NuxtLinkLocale>
            </div>

            <!-- Liens normaux mobile -->
            <NuxtLinkLocale
              v-else
              :to="item.href"
              class="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              @click="isMenuOpen = false"
            >
              {{ item.label }}
            </NuxtLinkLocale>
          </template>

          <CommonLanguageSelect class="mt-2 self-start px-2" />

          <CommonCTAButton
            :href="saasConfig.signupUrl"
            variant="primary"
            size="md"
            class="mt-4 w-full justify-center"
            @click="isMenuOpen = false"
          >
            {{ $t('cta.header') }}
          </CommonCTAButton>
        </nav>
      </div>
    </ClientOnly>
  </header>
</template>
