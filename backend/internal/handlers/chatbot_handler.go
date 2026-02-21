package handlers

import (
	"context"
	"errors"
	"log"
	"net/http"

	"github.com/TheoHrd02/nuxt-go-boilerplate/internal/services"
	"github.com/gin-gonic/gin"
)

// ChatbotHandler gère les requêtes du chatbot
type ChatbotHandler struct {
	openaiService *services.OpenAIService
}

// AskRequest représente la requête entrante du frontend
type AskRequest struct {
	Question string `json:"q" binding:"required"`
}

// AskResponse représente la réponse envoyée au frontend
type AskResponse struct {
	Answer string `json:"answer"`
}

// NewChatbotHandler crée une nouvelle instance du handler chatbot
func NewChatbotHandler(openaiService *services.OpenAIService) *ChatbotHandler {
	return &ChatbotHandler{
		openaiService: openaiService,
	}
}

// Ask traite une question utilisateur et retourne une réponse
// @Summary Poser une question au chatbot support
// @Description Envoie une question au chatbot qui interroge la documentation via OpenAI
// @Tags chatbot
// @Accept json
// @Produce json
// @Param request body AskRequest true "Question de l'utilisateur"
// @Success 200 {object} AskResponse
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1/ask [post]
func (h *ChatbotHandler) Ask(c *gin.Context) {
	var req AskRequest

	// Validation de la requête
	if err := c.ShouldBindJSON(&req); err != nil {
		var maxBytesErr *http.MaxBytesError
		if errors.As(err, &maxBytesErr) {
			c.JSON(http.StatusRequestEntityTooLarge, gin.H{
				"error": "Request body too large",
			})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Le champ 'q' (question) est requis",
		})
		return
	}

	// Validation de la longueur de la question
	if len(req.Question) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "La question ne peut pas être vide",
		})
		return
	}

	if len(req.Question) > 1000 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "La question est trop longue (max 1000 caractères)",
		})
		return
	}

	// Log de la question (sans données sensibles)
	log.Printf("📬 Question reçue (longueur: %d caractères)", len(req.Question))

	// Appel du service OpenAI (respecte l'annulation du context / timeout)
	answer, err := h.openaiService.AskQuestion(c.Request.Context(), req.Question)
	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) || errors.Is(err, context.Canceled) {
			c.JSON(http.StatusGatewayTimeout, gin.H{
				"error": "Request timeout",
			})
			return
		}
		log.Printf("❌ Erreur OpenAI: %v", err)
		c.JSON(http.StatusOK, AskResponse{
			Answer: "Je ne sais pas.",
		})
		return
	}

	// Succès
	log.Printf("✅ Réponse générée (longueur: %d caractères)", len(answer))
	c.JSON(http.StatusOK, AskResponse{
		Answer: answer,
	})
}
