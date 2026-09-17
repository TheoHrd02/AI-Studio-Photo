/**
 * Limites applicatives — centralisées pour éviter les modifications dispersées.
 * Chaque constante est documentée avec son "pourquoi".
 *
 * IMPORTANT: Garder aligné avec backend/internal/config/limits.go pour les limites partagées.
 */

/** Longueur max d'une question chatbot (caractères).
 *  Pourquoi: limite raisonnable pour une question support, évite les abus et les payloads excessifs.
 *  Doit être aligné avec le backend (internal/config/limits.go). */
export const MAX_CHAT_QUESTION_LENGTH = 1000

/** Intervalle de rotation du hero carousel (ms).
 *  Pourquoi: 6 secondes par vidéo pour un hero lisible sans être trop lent. */
export const VIDEO_ROTATION_INTERVAL_MS = 6000
