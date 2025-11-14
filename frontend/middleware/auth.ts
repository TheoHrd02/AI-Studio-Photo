/**
 * Middleware d'authentification
 * 
 * Protège les routes nécessitant une authentification
 * Redirige vers /login si non authentifié
 * Essaie de rafraîchir le token automatiquement
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, checkAuth } = useAuth()

  // Si déjà authentifié, laisser passer
  if (isAuthenticated.value) {
    return
  }

  // Essayer de restaurer la session avec le refresh token
  const authenticated = await checkAuth()

  if (authenticated) {
    // Session restaurée avec succès
    return
  }

  // Pas authentifié et impossible de restaurer la session
  // Rediriger vers la page de login avec redirect query
  return navigateTo({
    path: '/login',
    query: {
      redirect: to.fullPath,
    },
  })
})
