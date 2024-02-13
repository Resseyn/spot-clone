package auth

import (
	"context"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
	"sputify/configs"
	"sputify/internal/database"
	"sputify/internal/goTypes"
	"sputify/internal/logger"
)

func GoogleLogin(c *gin.Context) {
	url := configs.AppConfig.GoogleLoginConfig.AuthCodeURL("randomstate")
	c.Redirect(http.StatusSeeOther, url)
}

func GoogleCallback(c *gin.Context) {
	state := c.Query("state")
	if state != "randomstate" {
		c.String(http.StatusBadRequest, "States don't Match!!")
		return
	}

	code := c.Query("code")

	googlecon := configs.GoogleConfig()

	token, err := googlecon.Exchange(context.Background(), code)
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.String(http.StatusInternalServerError, "Code-Token Exchange Failed")
		return
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.String(http.StatusInternalServerError, "User Data Fetch Failed")
		return
	}

	userData, err := io.ReadAll(resp.Body)
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.String(http.StatusInternalServerError, "JSON Parsing Failed")
		return
	}

	user := map[string]interface{}{}
	err = json.Unmarshal(userData, &user)
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.String(http.StatusInternalServerError, "JSON Parsing Failed")
		return
	}

	stUser := types.User{}
	if user["verified_email"] == true && user["email"] != "" && user["name"] != "" {
		stUser = types.User{
			Email:         user["email"].(string),
			Username:      user["name"].(string),
			EmailVerified: user["verified_email"].(bool),
		}
		if user["picture"] != nil {
			stUser.Image = user["picture"].(string)
		} else {
			stUser.Image = ""
		}

		createdUser, err := database.Users.AddUserFromOAuth(&stUser)
		if err != nil {
			if err.Error() == "pq: duplicate key value violates unique constraint \"users_email_key\"" {
				existingUser, err := database.Users.GetUserByEmail(stUser.Email)
				if err != nil || len(existingUser.Password) != 0 {
					logger.ErrorLogger.Println(err)
					c.String(http.StatusInternalServerError, "Email occupied by email-password auth")
				}
				c.JSON(200, existingUser)
			} else {
				logger.ErrorLogger.Println(err)
				c.String(http.StatusInternalServerError, "Adding User Failed")
			}
		}
		c.JSON(200, createdUser)
	} else if user["verified_email"] == false && user["email"] != "" && user["name"] != "" {
		//TODO: Send Email Verification
	} else {
		c.JSON(400, "Invalid data")
	}
}
