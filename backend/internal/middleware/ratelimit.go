package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

// ipLimiter holds a rate limiter per IP with last-access time for cleanup.
type ipLimiter struct {
	limiter    *rate.Limiter
	lastAccess time.Time
}

// RateLimiter returns Gin middleware that limits requests per IP.
// Uses token bucket: r requests per minute, burst of r.
// Only applies to routes where it is explicitly used.
func RateLimiter(requestsPerMinute int) gin.HandlerFunc {
	// 15 req/min = 1 token every 4 seconds, burst 15
	interval := time.Minute / time.Duration(requestsPerMinute)
	limit := rate.Every(interval)

	var (
		mu      sync.RWMutex
		clients = make(map[string]*ipLimiter)
	)

	// Cleanup stale entries every 10 minutes to prevent unbounded memory growth
	go func() {
		ticker := time.NewTicker(10 * time.Minute)
		defer ticker.Stop()
		for range ticker.C {
			mu.Lock()
			for ip, entry := range clients {
				if time.Since(entry.lastAccess) > 10*time.Minute {
					delete(clients, ip)
				}
			}
			mu.Unlock()
		}
	}()

	return func(c *gin.Context) {
		ip := c.ClientIP()
		if ip == "" {
			ip = "unknown"
		}

		mu.Lock()
		entry, exists := clients[ip]
		if !exists {
			entry = &ipLimiter{
				limiter:    rate.NewLimiter(limit, requestsPerMinute),
				lastAccess: time.Now(),
			}
			clients[ip] = entry
		}
		entry.lastAccess = time.Now()
		mu.Unlock()

		if !entry.limiter.Allow() {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
				"error": "Too many requests. Please try again later.",
			})
			return
		}

		c.Next()
	}
}
