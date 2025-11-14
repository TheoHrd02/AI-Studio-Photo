package services

import (
	"context"
	"fmt"
	"mime/multipart"
	"path/filepath"
	"strings"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api"
	"github.com/cloudinary/cloudinary-go/v2/api/admin"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

type CloudinaryService struct {
	cld *cloudinary.Cloudinary
}

// UploadResult représente le résultat d'un upload
type UploadResult struct {
	PublicID  string `json:"public_id"`
	URL       string `json:"url"`
	SecureURL string `json:"secure_url"`
	Format    string `json:"format"`
	Width     int    `json:"width"`
	Height    int    `json:"height"`
	Bytes     int    `json:"bytes"`
	Type      string `json:"type"` // image ou video
}

// ListResourcesResult représente une liste de ressources
type ListResourcesResult struct {
	Resources []Resource `json:"resources"`
	NextCursor string    `json:"next_cursor,omitempty"`
}

// Resource représente une ressource Cloudinary
type Resource struct {
	PublicID  string `json:"public_id"`
	Format    string `json:"format"`
	URL       string `json:"url"`
	SecureURL string `json:"secure_url"`
	Width     int    `json:"width"`
	Height    int    `json:"height"`
	Bytes     int    `json:"bytes"`
	CreatedAt string `json:"created_at"`
	Type      string `json:"type"`
}

// NewCloudinaryService crée une nouvelle instance du service Cloudinary
func NewCloudinaryService(cld *cloudinary.Cloudinary) *CloudinaryService {
	return &CloudinaryService{
		cld: cld,
	}
}

// UploadImage uploade une image sur Cloudinary
func (s *CloudinaryService) UploadImage(ctx context.Context, file multipart.File, filename string, folder string) (*UploadResult, error) {
	uploadParams := uploader.UploadParams{
		Folder:         folder,
		ResourceType:   "image",
		UseFilename:    api.Bool(true),
		UniqueFilename: api.Bool(true),
	}

	resp, err := s.cld.Upload.Upload(ctx, file, uploadParams)
	if err != nil {
		return nil, fmt.Errorf("failed to upload image: %w", err)
	}

	return &UploadResult{
		PublicID:  resp.PublicID,
		URL:       resp.URL,
		SecureURL: resp.SecureURL,
		Format:    resp.Format,
		Width:     resp.Width,
		Height:    resp.Height,
		Bytes:     resp.Bytes,
		Type:      "image",
	}, nil
}

// UploadVideo uploade une vidéo sur Cloudinary
func (s *CloudinaryService) UploadVideo(ctx context.Context, file multipart.File, filename string, folder string) (*UploadResult, error) {
	uploadParams := uploader.UploadParams{
		Folder:         folder,
		ResourceType:   "video",
		UseFilename:    api.Bool(true),
		UniqueFilename: api.Bool(true),
	}

	resp, err := s.cld.Upload.Upload(ctx, file, uploadParams)
	if err != nil {
		return nil, fmt.Errorf("failed to upload video: %w", err)
	}

	return &UploadResult{
		PublicID:  resp.PublicID,
		URL:       resp.URL,
		SecureURL: resp.SecureURL,
		Format:    resp.Format,
		Width:     resp.Width,
		Height:    resp.Height,
		Bytes:     resp.Bytes,
		Type:      "video",
	}, nil
}

// UploadFile détecte automatiquement le type et uploade le fichier
func (s *CloudinaryService) UploadFile(ctx context.Context, file multipart.File, filename string, folder string) (*UploadResult, error) {
	ext := strings.ToLower(filepath.Ext(filename))
	
	// Extensions vidéo
	videoExts := []string{".mp4", ".mov", ".avi", ".webm", ".mkv", ".flv", ".wmv"}
	for _, videoExt := range videoExts {
		if ext == videoExt {
			return s.UploadVideo(ctx, file, filename, folder)
		}
	}
	
	// Par défaut, traiter comme une image
	return s.UploadImage(ctx, file, filename, folder)
}

// DeleteResource supprime une ressource (image ou vidéo) de Cloudinary
func (s *CloudinaryService) DeleteResource(ctx context.Context, publicID string, resourceType string) error {
	deleteParams := uploader.DestroyParams{
		PublicID:     publicID,
		ResourceType: resourceType,
	}

	_, err := s.cld.Upload.Destroy(ctx, deleteParams)
	if err != nil {
		return fmt.Errorf("failed to delete resource: %w", err)
	}

	return nil
}

// DeleteImage supprime une image
func (s *CloudinaryService) DeleteImage(ctx context.Context, publicID string) error {
	return s.DeleteResource(ctx, publicID, "image")
}

// DeleteVideo supprime une vidéo
func (s *CloudinaryService) DeleteVideo(ctx context.Context, publicID string) error {
	return s.DeleteResource(ctx, publicID, "video")
}

// ListImages liste toutes les images d'un dossier
func (s *CloudinaryService) ListImages(ctx context.Context, folder string, maxResults int, nextCursor string) (*ListResourcesResult, error) {
	params := admin.AssetsParams{
		MaxResults: maxResults,
	}

	if folder != "" {
		params.Prefix = folder
	}

	if nextCursor != "" {
		params.NextCursor = nextCursor
	}

	resp, err := s.cld.Admin.Assets(ctx, params)
	if err != nil {
		return nil, fmt.Errorf("failed to list images: %w", err)
	}

	resources := make([]Resource, 0, len(resp.Assets))
	for _, asset := range resp.Assets {
		resources = append(resources, Resource{
			PublicID:  asset.PublicID,
			Format:    asset.Format,
			URL:       asset.URL,
			SecureURL: asset.SecureURL,
			Width:     asset.Width,
			Height:    asset.Height,
			Bytes:     asset.Bytes,
			CreatedAt: asset.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
			Type:      "image",
		})
	}

	return &ListResourcesResult{
		Resources:  resources,
		NextCursor: resp.NextCursor,
	}, nil
}

// ListVideos liste toutes les vidéos d'un dossier
func (s *CloudinaryService) ListVideos(ctx context.Context, folder string, maxResults int, nextCursor string) (*ListResourcesResult, error) {
	params := admin.AssetsParams{
		MaxResults: maxResults,
	}

	if folder != "" {
		params.Prefix = folder
	}

	if nextCursor != "" {
		params.NextCursor = nextCursor
	}

	resp, err := s.cld.Admin.Assets(ctx, params)
	if err != nil {
		return nil, fmt.Errorf("failed to list videos: %w", err)
	}

	resources := make([]Resource, 0, len(resp.Assets))
	for _, asset := range resp.Assets {
		resources = append(resources, Resource{
			PublicID:  asset.PublicID,
			Format:    asset.Format,
			URL:       asset.URL,
			SecureURL: asset.SecureURL,
			Width:     asset.Width,
			Height:    asset.Height,
			Bytes:     asset.Bytes,
			CreatedAt: asset.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
			Type:      "video",
		})
	}

	return &ListResourcesResult{
		Resources:  resources,
		NextCursor: resp.NextCursor,
	}, nil
}

// GetResourceByPublicID récupère les infos d'une ressource par son public_id
func (s *CloudinaryService) GetResourceByPublicID(ctx context.Context, publicID string, resourceType string) (*Resource, error) {
	params := admin.AssetParams{
		PublicID: publicID,
	}

	resp, err := s.cld.Admin.Asset(ctx, params)
	if err != nil {
		return nil, fmt.Errorf("failed to get resource: %w", err)
	}

	return &Resource{
		PublicID:  resp.PublicID,
		Format:    resp.Format,
		URL:       resp.URL,
		SecureURL: resp.SecureURL,
		Width:     resp.Width,
		Height:    resp.Height,
		Bytes:     resp.Bytes,
		CreatedAt: resp.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
		Type:      resourceType,
	}, nil
}

// TestConnection teste la connexion à Cloudinary
func (s *CloudinaryService) TestConnection(ctx context.Context) error {
	_, err := s.cld.Admin.Ping(ctx)
	if err != nil {
		return fmt.Errorf("cloudinary connection failed: %w", err)
	}
	return nil
}
