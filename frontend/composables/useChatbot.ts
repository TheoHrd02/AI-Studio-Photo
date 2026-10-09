/**
 * Composable pour interagir avec le chatbot support
 * @module useChatbot
 */

import { MAX_CHAT_QUESTION_LENGTH } from '~/config/app-limits'

export const useChatbot = () => {
  const { t } = useI18n()

  /**
   * État du chatbot
   */
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Envoie une question au chatbot et retourne la réponse
   * @param question - La question à poser
   * @returns La réponse du chatbot
   */
  const ask = async (question: string): Promise<string> => {
    if (!question.trim()) {
      throw new Error('Empty question')
    }

    if (question.length > MAX_CHAT_QUESTION_LENGTH) {
      error.value = t('help.chat.errors.tooLong', { max: MAX_CHAT_QUESTION_LENGTH })
      throw new Error(error.value)
    }

    isLoading.value = true
    error.value = null

    try {
      // Same-origin Nuxt server route (server/api/ask.post.ts)
      const response = await $fetch<{ answer: string }>('/api/ask', {
        method: 'POST',
        body: { q: question },
        timeout: 30_000,
      })

      return response.answer || t('help.chat.noAnswer', { email: 'support@glint-studio.com' })
    }
    catch (err: unknown) {
      const status = (err as { statusCode?: number }).statusCode
      error.value = status === 429
        ? t('help.chat.errors.rateLimited')
        : status === 503
          ? t('help.chat.errors.unavailable')
          : t('help.chat.errors.generic')
      throw new Error(error.value, { cause: err })
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * Réinitialise l'état d'erreur
   */
  const clearError = () => {
    error.value = null
  }

  return {
    ask,
    isLoading: readonly(isLoading),
    error: readonly(error),
    clearError,
  }
}
