<script setup lang="ts">
import { siteConfig } from '~/config/site.config'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-900 text-white py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Top Footer -->
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          <!-- About -->
          <div>
            <div class="flex items-center gap-2 mb-6">
              <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">G</span>
              </div>
              <span class="font-bold text-lg">{{ $t('common.appName') }}</span>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ $t('footer.description') }}
            </p>
          </div>

          <!-- Product / Resources / Company columns from site.config -->
          <template
            v-for="column in siteConfig.footer.columns"
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
            <div class="flex items-center gap-6 text-sm">
              <NuxtLinkLocale
                v-for="item in siteConfig.footer.legal"
                :key="item.id"
                :to="item.href"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ $t(`footer.legalLinks.${item.id}`) }}
              </NuxtLinkLocale>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
