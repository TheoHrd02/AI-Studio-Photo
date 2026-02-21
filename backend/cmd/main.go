package main

import (
	"log"
	"os"
	"strings"

	"github.com/TheoHrd02/nuxt-go-boilerplate/internal/handlers"
	"github.com/TheoHrd02/nuxt-go-boilerplate/internal/middleware"
	"github.com/TheoHrd02/nuxt-go-boilerplate/internal/services"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Production safety: fail if GIN_MODE=debug when not explicitly in development
	appEnv := strings.ToLower(strings.TrimSpace(os.Getenv("APP_ENV")))
	ginMode := strings.ToLower(strings.TrimSpace(os.Getenv("GIN_MODE")))
	isDevelopment := appEnv == "development" || appEnv == "dev"

	if !isDevelopment && ginMode == "debug" {
		log.Fatal("FATAL: GIN_MODE=debug is not allowed outside development. Set GIN_MODE=release for production.")
	}

	if isDevelopment {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	corsOrigins, err := middleware.ParseCORSOrigins(os.Getenv("CORS_ORIGINS"), !isDevelopment)
	if err != nil {
		log.Fatalf("FATAL: CORS configuration: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	openaiService := services.NewOpenAIService()
	chatbotHandler := handlers.NewChatbotHandler(openaiService)

	router := gin.Default()
	router.Use(middleware.CORS(corsOrigins))

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "Server is running",
		})
	})

	v1 := router.Group("/api/v1")
	{
		v1.POST("/ask", middleware.RateLimiter(15), middleware.MaxBodySize(middleware.DefaultMaxBodySize), middleware.RequestTimeout(middleware.DefaultRequestTimeout), chatbotHandler.Ask)
	}

	log.Printf("🚀 Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
