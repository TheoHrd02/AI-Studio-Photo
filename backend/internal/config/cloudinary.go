package config

import (
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
)

type CloudinaryConfig struct {
	CloudName string
	APIKey    string
	APISecret string
}

// LoadCloudinaryConfig charge la configuration Cloudinary depuis les variables d'environnement
func LoadCloudinaryConfig() *CloudinaryConfig {
	return &CloudinaryConfig{
		CloudName: os.Getenv("CLOUDINARY_CLOUD_NAME"),
		APIKey:    os.Getenv("CLOUDINARY_API_KEY"),
		APISecret: os.Getenv("CLOUDINARY_API_SECRET"),
	}
}

// NewCloudinaryClient crée une nouvelle instance du client Cloudinary
func NewCloudinaryClient(config *CloudinaryConfig) (*cloudinary.Cloudinary, error) {
	cld, err := cloudinary.NewFromParams(
		config.CloudName,
		config.APIKey,
		config.APISecret,
	)
	if err != nil {
		return nil, err
	}
	return cld, nil
}
