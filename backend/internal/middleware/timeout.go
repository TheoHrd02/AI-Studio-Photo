package middleware

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

const (
	// DefaultRequestTimeout is the default request timeout (20 seconds).
	// Allows OpenAI Assistants API to complete typical queries while
	// preventing runaway requests from exhausting resources.
	DefaultRequestTimeout = 20 * time.Second
)

// RequestTimeout returns Gin middleware that cancels the request context
// after the given duration. Handlers and downstream HTTP calls using
// c.Request.Context() will receive cancellation and should return promptly.
func RequestTimeout(timeout time.Duration) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), timeout)
		defer cancel()

		c.Request = c.Request.WithContext(ctx)
		c.Next()

		// If context was cancelled due to timeout and no response written,
		// respond with 504 (handler may have already written on fast path)
		if ctx.Err() == context.DeadlineExceeded && !c.Writer.Written() {
			c.AbortWithStatusJSON(http.StatusGatewayTimeout, gin.H{
				"error": "Request timeout",
			})
		}
	}
}
