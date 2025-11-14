package main

import (
	"log"
	"os"

	"github.com/TheoHrd02/nuxt-go-boilerplate/internal/config"
	"github.com/TheoHrd02/nuxt-go-boilerplate/internal/handlers"
	"github.com/TheoHrd02/nuxt-go-boilerplate/internal/services"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Charger les variables d'environnement
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Récupérer le port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Initialiser Cloudinary
	cloudinaryConfig := config.LoadCloudinaryConfig()
	cloudinaryClient, err := config.NewCloudinaryClient(cloudinaryConfig)
	if err != nil {
		log.Printf("Warning: Failed to initialize Cloudinary: %v", err)
	} else {
		log.Println("✅ Cloudinary client initialized successfully")
	}

	// Créer les services
	cloudinaryService := services.NewCloudinaryService(cloudinaryClient)
	openaiService := services.NewOpenAIService()

	// Créer les handlers
	cloudinaryHandler := handlers.NewCloudinaryHandler(cloudinaryService)
	chatbotHandler := handlers.NewChatbotHandler(openaiService)

	// Créer le routeur Gin
	router := gin.Default()

	// Configuration CORS
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", os.Getenv("CORS_ORIGINS"))
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Route de santé
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "Server is running",
		})
	})

	// Routes API v1
	v1 := router.Group("/api/v1")
	{
		v1.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "pong",
			})
		})

		// Route Chatbot Support
		v1.POST("/ask", chatbotHandler.Ask)

		// Routes Cloudinary
		cloudinary := v1.Group("/cloudinary")
		{
			// Test de connexion
			cloudinary.GET("/ping", cloudinaryHandler.TestConnection)

			// Upload
			cloudinary.POST("/upload", cloudinaryHandler.UploadFile)
			cloudinary.POST("/upload/image", cloudinaryHandler.UploadImage)
			cloudinary.POST("/upload/video", cloudinaryHandler.UploadVideo)

			// Liste
			cloudinary.GET("/images", cloudinaryHandler.ListImages)
			cloudinary.GET("/videos", cloudinaryHandler.ListVideos)

			// Récupération d'une ressource
			cloudinary.GET("/resource/:public_id", cloudinaryHandler.GetResource)

			// Suppression
			cloudinary.DELETE("/resource/:public_id", cloudinaryHandler.DeleteResource)
		}
	}

	// Démarrer le serveur
	log.Printf("🚀 Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
