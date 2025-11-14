package handlers

import (
	"net/http"
	"strconv"

	"github.com/TheoHrd02/nuxt-go-boilerplate/internal/services"
	"github.com/gin-gonic/gin"
)

type CloudinaryHandler struct {
	cloudinaryService *services.CloudinaryService
}

// NewCloudinaryHandler crée un nouveau handler Cloudinary
func NewCloudinaryHandler(cloudinaryService *services.CloudinaryService) *CloudinaryHandler {
	return &CloudinaryHandler{
		cloudinaryService: cloudinaryService,
	}
}

// UploadFile gère l'upload d'un fichier (image ou vidéo)
// @Summary Upload un fichier sur Cloudinary
// @Tags Cloudinary
// @Accept multipart/form-data
// @Produce json
// @Param file formData file true "Fichier à uploader"
// @Param folder formData string false "Dossier de destination"
// @Success 200 {object} services.UploadResult
// @Router /api/v1/cloudinary/upload [post]
func (h *CloudinaryHandler) UploadFile(c *gin.Context) {
	// Récupérer le fichier
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    400,
			"message": "No file provided",
		})
		return
	}
	defer file.Close()

	// Récupérer le dossier (optionnel)
	folder := c.DefaultPostForm("folder", "")

	// Upload du fichier
	result, err := h.cloudinaryService.UploadFile(c.Request.Context(), file, header.Filename, folder)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Failed to upload file",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "File uploaded successfully",
		"data":    result,
	})
}

// UploadImage gère l'upload d'une image
func (h *CloudinaryHandler) UploadImage(c *gin.Context) {
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    400,
			"message": "No file provided",
		})
		return
	}
	defer file.Close()

	folder := c.DefaultPostForm("folder", "images")

	result, err := h.cloudinaryService.UploadImage(c.Request.Context(), file, header.Filename, folder)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Failed to upload image",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "Image uploaded successfully",
		"data":    result,
	})
}

// UploadVideo gère l'upload d'une vidéo
func (h *CloudinaryHandler) UploadVideo(c *gin.Context) {
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    400,
			"message": "No file provided",
		})
		return
	}
	defer file.Close()

	folder := c.DefaultPostForm("folder", "videos")

	result, err := h.cloudinaryService.UploadVideo(c.Request.Context(), file, header.Filename, folder)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Failed to upload video",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "Video uploaded successfully",
		"data":    result,
	})
}

// DeleteResource supprime une ressource
// @Summary Supprime une ressource de Cloudinary
// @Tags Cloudinary
// @Produce json
// @Param public_id path string true "Public ID de la ressource"
// @Param type query string true "Type de ressource (image ou video)"
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/cloudinary/{public_id} [delete]
func (h *CloudinaryHandler) DeleteResource(c *gin.Context) {
	publicID := c.Param("public_id")
	resourceType := c.DefaultQuery("type", "image")

	if publicID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    400,
			"message": "Public ID is required",
		})
		return
	}

	err := h.cloudinaryService.DeleteResource(c.Request.Context(), publicID, resourceType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Failed to delete resource",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "Resource deleted successfully",
	})
}

// ListImages liste toutes les images
// @Summary Liste les images Cloudinary
// @Tags Cloudinary
// @Produce json
// @Param folder query string false "Dossier à lister"
// @Param max_results query int false "Nombre maximum de résultats" default(50)
// @Param next_cursor query string false "Curseur pour la pagination"
// @Success 200 {object} services.ListResourcesResult
// @Router /api/v1/cloudinary/images [get]
func (h *CloudinaryHandler) ListImages(c *gin.Context) {
	folder := c.DefaultQuery("folder", "")
	maxResults, _ := strconv.Atoi(c.DefaultQuery("max_results", "50"))
	nextCursor := c.DefaultQuery("next_cursor", "")

	result, err := h.cloudinaryService.ListImages(c.Request.Context(), folder, maxResults, nextCursor)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Failed to list images",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "Images retrieved successfully",
		"data":    result,
	})
}

// ListVideos liste toutes les vidéos
func (h *CloudinaryHandler) ListVideos(c *gin.Context) {
	folder := c.DefaultQuery("folder", "")
	maxResults, _ := strconv.Atoi(c.DefaultQuery("max_results", "50"))
	nextCursor := c.DefaultQuery("next_cursor", "")

	result, err := h.cloudinaryService.ListVideos(c.Request.Context(), folder, maxResults, nextCursor)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Failed to list videos",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "Videos retrieved successfully",
		"data":    result,
	})
}

// GetResource récupère une ressource par son public_id
func (h *CloudinaryHandler) GetResource(c *gin.Context) {
	publicID := c.Param("public_id")
	resourceType := c.DefaultQuery("type", "image")

	if publicID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    400,
			"message": "Public ID is required",
		})
		return
	}

	result, err := h.cloudinaryService.GetResourceByPublicID(c.Request.Context(), publicID, resourceType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Failed to get resource",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "Resource retrieved successfully",
		"data":    result,
	})
}

// TestConnection teste la connexion à Cloudinary
func (h *CloudinaryHandler) TestConnection(c *gin.Context) {
	err := h.cloudinaryService.TestConnection(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "Cloudinary connection failed",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "Cloudinary connection successful",
	})
}
