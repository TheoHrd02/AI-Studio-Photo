/**
 * Composable d'authentification pour AI Studio Photo
 * 
 * Gère l'authentification avec :
 * - Access token JWT (15 min) stocké en mémoire
 * - Refresh token (7 jours) stocké en httpOnly cookie
 * - Rotation automatique des tokens
 * - Max 5 appareils actifs par utilisateur
 */

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  role: 'user' | 'admin'
  createdAt: string
}

export interface AuthResponse {
  code: number
  message: string
  data: {
    user: User
    accessToken: string
  }
}

export interface RefreshResponse {
  code: number
  message: string
  data: {
    accessToken: string
  }
}

export const useAuth = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:8080/api/v1'

  // État de l'utilisateur (global via useState)
  const user = useState<User | null>('auth:user', () => null)
  const accessToken = useState<string | null>('auth:accessToken', () => null)
  const isAuthenticated = computed(() => !!user.value && !!accessToken.value)

  /**
   * Connexion avec email/mot de passe
   */
  const login = async (email: string, password: string): Promise<void> => {
    const { data, error } = await useFetch<AuthResponse>(`${baseURL}/auth/login`, {
      method: 'POST',
      body: { email, password },
      credentials: 'include', // Important pour les cookies httpOnly
    })

    if (error.value) {
      throw new Error(error.value.message || 'Erreur de connexion')
    }

    if (!data.value || data.value.code !== 200) {
      throw new Error(data.value?.message || 'Échec de la connexion')
    }

    // Stockage du token et de l'utilisateur
    accessToken.value = data.value.data.accessToken
    user.value = data.value.data.user
  }

  /**
   * Connexion avec Google OAuth
   */
  const loginWithGoogle = async (credential: string): Promise<void> => {
    const { data, error } = await useFetch<AuthResponse>(`${baseURL}/auth/google`, {
      method: 'POST',
      body: { credential },
      credentials: 'include',
    })

    if (error.value) {
      throw new Error(error.value.message || 'Erreur de connexion Google')
    }

    if (!data.value || data.value.code !== 200) {
      throw new Error(data.value?.message || 'Échec de la connexion Google')
    }

    accessToken.value = data.value.data.accessToken
    user.value = data.value.data.user
  }

  /**
   * Inscription avec email/mot de passe
   */
  const register = async (email: string, password: string, name?: string): Promise<void> => {
    const { data, error } = await useFetch<AuthResponse>(`${baseURL}/auth/register`, {
      method: 'POST',
      body: { email, password, name },
      credentials: 'include',
    })

    if (error.value) {
      throw new Error(error.value.message || 'Erreur d\'inscription')
    }

    if (!data.value || data.value.code !== 201) {
      throw new Error(data.value?.message || 'Échec de l\'inscription')
    }

    accessToken.value = data.value.data.accessToken
    user.value = data.value.data.user
  }

  /**
   * Déconnexion
   */
  const logout = async (): Promise<void> => {
    try {
      // Appel API pour invalider le refresh token côté serveur
      await useFetch(`${baseURL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      })
    } catch (error) {
      // Ignore les erreurs de logout
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      // Nettoyage local dans tous les cas
      accessToken.value = null
      user.value = null
    }
  }

  /**
   * Rafraîchissement du token d'accès
   * Utilise le refresh token stocké en httpOnly cookie
   */
  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      const { data, error } = await useFetch<RefreshResponse>(`${baseURL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      })

      if (error.value || !data.value || data.value.code !== 200) {
        // Le refresh token a expiré ou est invalide
        accessToken.value = null
        user.value = null
        return false
      }

      accessToken.value = data.value.data.accessToken
      return true
    } catch {
      accessToken.value = null
      user.value = null
      return false
    }
  }

  /**
   * Récupération des informations de l'utilisateur connecté
   */
  const fetchUser = async (): Promise<void> => {
    if (!accessToken.value) {
      throw new Error('Non authentifié')
    }

    const { data, error } = await useFetch<{
      code: number
      message: string
      data: User
    }>(`${baseURL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    if (error.value) {
      throw new Error(error.value.message || 'Erreur lors de la récupération du profil')
    }

    if (!data.value || data.value.code !== 200) {
      throw new Error(data.value?.message || 'Impossible de récupérer le profil')
    }

    user.value = data.value.data
  }

  /**
   * Vérification de l'authentification au chargement
   * Essaie de rafraîchir le token si possible
   */
  const checkAuth = async (): Promise<boolean> => {
    // Si déjà authentifié en mémoire, c'est OK
    if (isAuthenticated.value) {
      return true
    }

    // Sinon, essaie de rafraîchir avec le refresh token
    const refreshed = await refreshAccessToken()
    
    if (refreshed) {
      // Récupère les infos utilisateur
      try {
        await fetchUser()
        return true
      } catch {
        return false
      }
    }

    return false
  }

  /**
   * Obtenir les headers d'authentification pour les requêtes API
   */
  const getAuthHeaders = () => {
    if (!accessToken.value) {
      return {}
    }

    return {
      Authorization: `Bearer ${accessToken.value}`,
    }
  }

  return {
    // État
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    accessToken: readonly(accessToken),

    // Méthodes
    login,
    loginWithGoogle,
    register,
    logout,
    refreshAccessToken,
    fetchUser,
    checkAuth,
    getAuthHeaders,
  }
}
