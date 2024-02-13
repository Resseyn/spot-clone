package auth

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Logout(c *gin.Context) {
	var data map[string]string

	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"message": "invalid request"})
		return
	}

	refreshToken, err := ParseRefreshToken(data["refreshToken"])
	if err != nil {
		c.JSON(http.StatusUnauthorized, "invalid token")
		return
	}
	err = BlacklistToken(refreshToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	token, ok := c.Get("token")

	if ok {
		err = BlacklistToken(token.(*jwt.Token))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}
