<script setup lang="ts">
const { signupUrl } = useAppLinks()

definePageMeta({
  layout: 'marketing',
})

const { t } = useI18n()

usePageSeo(() => ({ title: t('help.meta.title'), description: t('help.meta.description') }))

const chatSectionRef = ref<HTMLElement | null>(null)

const scrollToChat = () => {
  chatSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const suggestedQuestions = computed(() =>
  ['howItWorks', 'pricing', 'studioPhoto', 'mannequins', 'animations', 'formats'].map(key => t(`help.suggestedQuestions.${key}`)),
)

const faqKeys = ['responseTime', 'demo', 'language'] as const

const contactCards = [
  { key: 'support', email: 'support@glint-studio.com', primary: true, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { key: 'sales', email: 'contact@glint-studio.com', primary: false, icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
] as const
</script>

<template>
  <div class="bg-white">
    <!-- Chatbot Section - Plein écran -->
    <h1 class="sr-only">
      {{ $t('help.meta.title') }}
    </h1>

    <section
      id="chat"
      ref="chatSectionRef"
      class="min-h-screen relative"
    >
      <div class="h-screen pt-16">
        <FeaturesChatInterface
          :suggested-questions="suggestedQuestions"
          :placeholder="$t('help.chat.placeholder')"
          :empty-state-title="$t('help.chat.emptyTitle')"
          :empty-state-description="$t('help.chat.emptyDescription')"
        />
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          class="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>

    <!-- Contact Section -->
    <section
      id="contact"
      class="py-20 bg-gradient-to-br from-gray-50 to-white scroll-mt-20"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-16">
            <div class="inline-block p-3 bg-primary-500/10 rounded-2xl mb-6">
              <svg
                class="w-12 h-12 text-primary-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 class="text-4xl font-bold text-gray-900 mb-4">
              {{ $t('help.contact.title') }}
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ $t('help.contact.subtitle') }}
            </p>
          </div>

          <!-- FAQ Rapide -->
          <div class="bg-surface rounded-2xl p-8 mb-16">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
              {{ $t('help.faq.title') }}
            </h3>
            <div class="space-y-4">
              <details
                v-for="key in faqKeys"
                :key="key"
                class="group bg-white rounded-xl p-6 cursor-pointer"
              >
                <summary class="font-semibold text-gray-900 flex justify-between items-center">
                  {{ $t(`help.faq.${key}.q`) }}
                  <svg
                    class="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p class="mt-4 text-gray-600 text-sm">
                  {{ $t(`help.faq.${key}.a`) }}
                </p>
              </details>
            </div>
          </div>

          <!-- Contact Cards -->
          <div class="grid md:grid-cols-3 gap-8 mb-16">
            <div
              v-for="card in contactCards"
              :key="card.key"
              class="bg-white rounded-2xl p-8 transition-shadow hover:shadow-xl"
              :class="card.primary ? 'shadow-xl border-2 border-primary-500/40' : 'shadow-lg border border-gray-100'"
            >
              <div class="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg
                  class="w-6 h-6 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="card.icon"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                {{ $t(`help.contact.cards.${card.key}.title`) }}
              </h3>
              <p class="text-gray-600 mb-4 text-sm">
                {{ $t(`help.contact.cards.${card.key}.description`) }}
              </p>
              <a
                :href="`mailto:${card.email}`"
                class="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center group"
              >
                {{ card.email }}
                <svg
                  class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- CTA -->
          <div class="text-center">
            <p class="text-gray-600 mb-6">
              {{ $t('help.contact.chatPrompt') }}
            </p>
            <button
              type="button"
              class="inline-flex items-center px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
              @click="scrollToChat"
            >
              {{ $t('cta.help.chat') }}
              <svg
                class="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <p class="mt-6">
              <CommonCTAButton
                :href="signupUrl"
                variant="ghost"
                size="xs"
                class="text-primary-500 hover:text-primary-600 text-sm"
              >
                {{ $t('cta.help.returnToProduct') }} →
              </CommonCTAButton>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
