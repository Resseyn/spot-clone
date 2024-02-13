package auth

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"sputify/internal/database"
	"sputify/internal/goTypes"
	"sputify/internal/helpers"
	"sputify/internal/logger"
)

func RegisterByMail(c *gin.Context) {
	//TODO: Verify email
	var data map[string]string

	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"message": "invalid request"})
		return
	}
	password := helpers.HashPassword(data["password"])
	if len(data["username"]) <= 4 || len(data["password"]) < 8 {
		c.JSON(400, gin.H{"message": "invalid request"})
		return
	}
	user := types.User{
		Email:         data["email"],
		Password:      []byte(password),
		Username:      data["username"],
		Image:         "",
		EmailVerified: false,
	}

	createdUser, err := database.Users.AddUserByMail(&user)
	if err != nil {
		if err.Error() == "pq: duplicate key value violates unique constraint \"users_email_key\"" {
			c.String(http.StatusBadRequest, "Email Occupied")
		} else {
			logger.ErrorLogger.Println(err)
			c.String(http.StatusInternalServerError, "Adding User Failed")
		}
	} else {
		c.JSON(200, createdUser)
	}
}
