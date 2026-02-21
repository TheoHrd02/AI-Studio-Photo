/**
 * Composable pour interagir avec le chatbot support
 * @module useChatbot
 */

export const useChatbot = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'http://localhost:8080/api/v1'

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

    if (question.length > 1000) {
      throw new Error('La question est trop longue (max 1000 caractères)')
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<{ answer: string }>(`${apiBase}/ask`, {
        method: 'POST',
        body: { q: question },
      })

      return response.answer
    }
    catch (err: unknown) {
      const errObj = err as { data?: { error?: string }, message?: string }
      const errorMessage = errObj?.data?.error || errObj?.message || 'Une erreur est survenue'
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
