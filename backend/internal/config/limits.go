package config

import "time"

// MaxChatQuestionLength — longueur max d'une question chatbot (caractères).
// Pourquoi: limite raisonnable pour une question support, évite les abus.
// Doit être aligné avec le frontend (config/app-limits.ts).
const MaxChatQuestionLength = 1000

// MaxBodySizeBytes — taille max du body de requête (64 KB).
// Pourquoi: 64KB suffit pour les requêtes JSON minimales (question), évite DoS par payload.
const MaxBodySizeBytes = 64 << 10

// RateLimitRequestsPerMinute — nombre de requêtes par minute par IP.
// Pourquoi: 15 req/min permet un usage support normal sans abus.
const RateLimitRequestsPerMinute = 15

// RequestTimeout — durée max d'une requête chatbot.
// Pourquoi: OpenAI Assistants API typiquement 5-15s, 20s laisse une marge sans bloquer les ressources.
const RequestTimeout = 20 * time.Second
