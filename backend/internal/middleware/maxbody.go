package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	// DefaultMaxBodySize is the default request body size limit (64 KB).
	DefaultMaxBodySize = 64 << 10
)

// MaxBodySize returns Gin middleware that limits request body size.
// Rejects oversized requests early when Content-Length is set; otherwise
// enforces limit during body read via http.MaxBytesReader.
func MaxBodySize(maxBytes int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Early rejection when Content-Length exceeds limit (no body read)
		if c.Request.ContentLength > maxBytes {
			c.AbortWithStatusJSON(http.StatusRequestEntityTooLarge, gin.H{
				"error": "Request body too large",
			})
			return
		}

		// Wrap body to enforce limit for chunked/unknown-length requests
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, maxBytes)
		c.Next()
	}
}
