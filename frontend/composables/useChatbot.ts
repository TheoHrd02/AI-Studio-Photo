/**
 * Composable pour interagir avec le chatbot support
 * @module useChatbot
 */

import { MAX_CHAT_QUESTION_LENGTH } from '~/config/app-limits'

export const useChatbot = () => {
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
      throw new Error('La question ne peut pas être vide')
    }

    if (question.length > MAX_CHAT_QUESTION_LENGTH) {
      error.value = `La question est trop longue (max ${MAX_CHAT_QUESTION_LENGTH} caractères)`
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

      return response.answer
    }
    catch (err: unknown) {
      const errObj = err as { data?: { message?: string } }
      const errorMessage = errObj?.data?.message || 'Une erreur est survenue, réessayez plus tard'
      error.value = errorMessage
      throw new Error(errorMessage)
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
