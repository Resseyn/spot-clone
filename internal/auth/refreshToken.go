package auth

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
	"sputify/internal/database"
	types "sputify/internal/goTypes"
)

func RefreshTokens(c *gin.Context) {
	var data map[string]string

	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"message": "invalid request"})
		return
	}
	// Parse takes the token string and a function for looking up the key.
	// The latter is especially useful if you use multiple keys for your application.
	// The standard is to use 'kid' in the head of the token to identify
	// which key to use, but the parsed token (head and claims) is provided
	// to the callback, providing flexibility.
	token, err := ParseRefreshToken(data["refreshToken"])
	if err != nil {
		c.JSON(http.StatusUnauthorized, "invalid token")
		return
	}
	if CheckIfTokenBlacklisted(token) {
		c.JSON(http.StatusUnauthorized, "Token is blacklisted")
		return
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Get the user record from database or
		// run through your business logic to verify if the user can log in
		_, err := database.Users.GetUserByUId(int64(claims["uid"].(float64)))
		if err == nil {

			err = BlacklistToken(token)

			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
				return
			}

			newTokenPair, err := generateTokenPair(&types.User{UId: int(claims["uid"].(float64))})
			if err != nil {
				c.String(http.StatusInternalServerError, "Token Generation Failed")
				return
			}
			c.JSON(http.StatusOK, newTokenPair)
			return
		}
		c.JSON(http.StatusUnauthorized, nil)
		return
	}
	c.JSON(http.StatusUnauthorized, nil)
	return
}
