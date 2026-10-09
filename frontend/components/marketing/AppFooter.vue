<script setup lang="ts">
import { siteConfig } from '~/config/site.config'

const currentYear = new Date().getFullYear()
const { legalUrl } = useAppLinks()
const footerColumns = siteConfig.footer.columns.filter(column => column.links.length > 0)
</script>

<template>
  <footer class="bg-gray-900 text-white py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Top Footer -->
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          <!-- About -->
          <div>
            <div class="mb-6 flex">
              <CommonBrandLogo
                :size="32"
                class="text-lg font-bold text-white"
              />
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ $t('footer.description') }}
            </p>
          </div>

          <!-- Product / Resources / Company columns from site.config -->
          <template
            v-for="column in footerColumns"
            :key="column.id"
          >
            <div>
              <h4 class="font-semibold mb-4">
                {{ $t(`footer.${column.id}`) }}
              </h4>
              <ul class="space-y-3 text-sm">
                <li
                  v-for="link in column.links"
                  :key="link.id"
                >
                  <NuxtLinkLocale
                    v-if="link.href.startsWith('/')"
                    :to="link.href"
                    class="text-gray-400 hover:text-white transition-colors"
                  >
                    {{ $t(`footer.${column.id}Links.${link.id}`) }}
                  </NuxtLinkLocale>
                  <a
                    v-else
                    :href="link.href"
                    class="text-gray-400 hover:text-white transition-colors"
                  >
                    {{ $t(`footer.${column.id}Links.${link.id}`) }}
                  </a>
                </li>
              </ul>
            </div>
          </template>
        </div>

        <!-- Bottom Footer -->
        <div class="border-t border-gray-800 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-400 text-sm">
              © {{ currentYear }} {{ $t('common.appName') }}. {{ $t('footer.allRightsReserved') }}.
            </p>
            <!-- Legal texts: hosted by the app (single source), in the page language -->
            <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm md:justify-end">
              <a
                v-for="doc in siteConfig.footer.legal"
                :key="doc"
                :href="legalUrl(doc)"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ $t(`footer.legalLinks.${doc}`) }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
