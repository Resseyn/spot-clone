package middleware

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
	"sputify/internal/auth"
	"strings"
)

func AuthMiddleware(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" || len(strings.Split(tokenString, " ")) == 1 {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	token, err := auth.ParseAccessToken(strings.Split(tokenString, " ")[1])

	if err != nil {
		if c.Request.URL.Path == "/user/logout" {
			c.Next()
			return
		}
		if err.Error() == "Token is expired" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Token expired"})
			return
		}
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}
	if auth.CheckIfTokenBlacklisted(token) {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Token blacklisted!"})
		return
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if c.Request.URL.Path == "/auth/logout" {
			c.Set("token", token)
			c.Next()
			return
		}
		c.Set("uid", claims["uid"])
		c.Next()
	} else {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}
}
