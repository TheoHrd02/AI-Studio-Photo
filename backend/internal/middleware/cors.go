package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const wildcard = "*"

// ParseCORSOrigins validates and parses CORS_ORIGINS into an explicit origin list.
// Returns nil and error if validation fails.
// - Rejects wildcard (*) origins
// - Fails if empty when isProduction is true
// - Accepts comma-separated list (e.g. "https://a.com,https://b.com")
func ParseCORSOrigins(raw string, isProduction bool) ([]string, error) {
	raw = strings.TrimSpace(raw)

	if raw == "" {
		if isProduction {
			return nil, &CORSConfigError{msg: "CORS_ORIGINS must be set in production"}
		}
		// Development: default to localhost for convenience
		return []string{"http://localhost:3000", "http://127.0.0.1:3000"}, nil
	}

	parts := strings.Split(raw, ",")
	origins := make([]string, 0, len(parts))

	for _, p := range parts {
		origin := strings.TrimSpace(p)
		if origin == "" {
			continue
		}
		if origin == wildcard || strings.Contains(origin, wildcard) {
			return nil, &CORSConfigError{msg: "CORS_ORIGINS: wildcard (*) is not allowed"}
		}
		origins = append(origins, origin)
	}

	if isProduction && len(origins) == 0 {
		return nil, &CORSConfigError{msg: "CORS_ORIGINS must contain at least one explicit origin in production"}
	}

	return origins, nil
}

// CORSConfigError is returned when CORS configuration is invalid.
type CORSConfigError struct {
	msg string
}

func (e *CORSConfigError) Error() string {
	return e.msg
}

// CORS returns Gin middleware that sets CORS headers using an explicit origin list.
// Only echoes the request Origin when it matches the allowed list.
// Rejects wildcard; credentials-safe.
func CORS(allowedOrigins []string) gin.HandlerFunc {
	allowedSet := make(map[string]struct{}, len(allowedOrigins))
	for _, o := range allowedOrigins {
		allowedSet[o] = struct{}{}
	}

	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")

		if origin != "" {
			if _, ok := allowedSet[origin]; ok {
				c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			}
			// If origin not in list, do not set header (browser will block cross-origin response)
		}

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Accept, Origin, Cache-Control")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}
