<template>
  <div class="flex flex-col h-full bg-white">
    <!-- Messages Area -->
    <div 
      ref="messagesContainer"
      class="flex-1 overflow-y-auto px-6 py-8 space-y-6 bg-white"
    >
      <!-- Header - Toujours visible -->
      <div class="text-center max-w-2xl mx-auto mb-6">
        <div class="w-16 h-16 mx-auto mb-4 bg-primary-500 rounded-2xl flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">
          {{ emptyStateTitle }}
        </h2>
        <p class="text-gray-600">
          {{ emptyStateDescription }}
        </p>
      </div>

      <!-- Suggested Questions - Toujours affichées -->
      <div v-if="suggestedQuestions.length > 0" class="max-w-2xl mx-auto mb-6">
        <div class="space-y-3">
          <p class="text-sm font-medium text-gray-700 mb-4 text-center">
            Questions suggérées :
          </p>
          <button
            v-for="(suggestion, index) in suggestedQuestions"
            :key="index"
            @click="askSuggestion(suggestion)"
            :disabled="isLoading"
            class="w-full text-left p-4 bg-surface border border-gray-200 rounded-xl hover:border-primary-500 hover:bg-gray-50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-gray-400 group-hover:text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-gray-700 group-hover:text-gray-900">
                {{ suggestion }}
              </span>
            </div>
          </button>
        </div>
      </div>

      <!-- Messages List -->
      <div v-if="messages.length > 0" class="max-w-4xl mx-auto w-full space-y-6">
        <div v-for="(message, index) in messages" :key="index">
          <!-- User Message -->
          <div v-if="message.role === 'user'" class="flex justify-end">
            <div class="flex items-start gap-3 max-w-[80%]">
              <div class="flex-1">
                <div class="bg-primary-500 text-white rounded-2xl rounded-tr-md px-5 py-3 shadow-sm">
                  <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</p>
                </div>
              </div>
              <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Bot Message -->
          <div v-else class="flex justify-start">
            <div class="flex items-start gap-3 max-w-[80%]">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div class="flex-1">
                <div class="bg-surface text-gray-900 rounded-2xl rounded-tl-md px-5 py-3 shadow-sm border border-gray-200">
                  <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-start">
          <div class="flex items-start gap-3 max-w-[80%]">
            <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div class="flex-1">
              <div class="bg-surface rounded-2xl rounded-tl-md px-5 py-3 shadow-sm border border-gray-200">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="border-t border-gray-200 bg-white px-6 py-4">
      <div class="max-w-4xl mx-auto">
        <!-- Error Message -->
        <div v-if="error" class="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start">
          <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span>{{ error }}</span>
        </div>

        <!-- Input Form -->
        <form @submit.prevent="handleSubmit" class="relative">
          <textarea
            ref="textareaRef"
            v-model="question"
            @keydown.enter.exact.prevent="handleSubmit"
            :placeholder="placeholder"
            :disabled="isLoading"
            rows="1"
            maxlength="1000"
            class="w-full px-4 py-3 pr-12 bg-surface text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none placeholder:text-gray-500"
            style="min-height: 52px; max-height: 200px;"
          />
          <button
            type="submit"
            :disabled="!question.trim() || isLoading"
            class="absolute right-2 bottom-2 p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </form>

        <!-- Character Counter -->
        <div class="mt-2 text-xs text-gray-500 text-right">
          {{ question.length }} / 1000
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  role: 'user' | 'bot'
  content: string
}

interface Props {
  suggestedQuestions?: string[]
  placeholder?: string
  emptyStateTitle?: string
  emptyStateDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  suggestedQuestions: () => [],
  placeholder: 'Posez votre question...',
  emptyStateTitle: 'Comment puis-je vous aider ?',
  emptyStateDescription: 'Posez-moi n\'importe quelle question sur AI Studio Photo',
})

const { ask, isLoading, error, clearError } = useChatbot()

const question = ref('')
const messages = ref<Message[]>([])
const messagesContainer = ref<HTMLElement | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

// Auto-resize textarea
watch(question, () => {
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
      textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
    }
  })
})

// Auto-scroll to bottom
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: 'smooth'
      })
    }
  })
}

// Envoyer une question
const handleSubmit = async () => {
  if (!question.value.trim() || isLoading.value) return

  const userQuestion = question.value.trim()
  
  // Ajouter le message utilisateur
  messages.value.push({
    role: 'user',
    content: userQuestion,
  })

  question.value = ''
  clearError()
  scrollToBottom()

  // Reset textarea height
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }

  try {
    // Obtenir la réponse du chatbot
    const answer = await ask(userQuestion)

    // Ajouter la réponse du bot
    messages.value.push({
      role: 'bot',
      content: answer,
    })

    scrollToBottom()
  } catch (err: any) {
    // En cas d'erreur, ajouter un message d'erreur
    messages.value.push({
      role: 'bot',
      content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
    })
    scrollToBottom()
  }
}

// Poser une question suggérée
const askSuggestion = (suggestion: string) => {
  question.value = suggestion
  handleSubmit()
}
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background-color: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 9999px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>
