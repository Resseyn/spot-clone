package auth

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"sputify/internal/database"
	"sputify/internal/helpers"
)

func LoginByMail(c *gin.Context) {
	var form map[string]string

	if err := c.BindJSON(&form); err != nil {
		c.JSON(400, gin.H{"message": "invalid request"})
		return
	}
	var login string
	if val, ok := form["username"]; ok {
		login = val
	} else if val, ok := form["email"]; ok {
		login = val
	} else {
		c.JSON(400, gin.H{"message": "invalid request"})
		return
	}
	password := helpers.HashPassword(form["password"])
	// Check in your db if the user exists or not
	if user, err := database.Users.GetUserByAuth(login, password); err == nil {
		pair, err := generateTokenPair(user)
		if err != nil {
			c.String(http.StatusInternalServerError, "Token Generation Failed")
			return
		}
		pair["username"] = user.Username
		c.JSON(http.StatusOK, pair)
	} else {
		c.JSON(http.StatusUnauthorized, nil)
	}
}
