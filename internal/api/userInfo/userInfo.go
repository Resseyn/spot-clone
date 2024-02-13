package userInfo

import (
	"github.com/gin-gonic/gin"
	"sputify/internal/database"
)

func GetUserData(c *gin.Context) {
	if uid, ok := c.Get("uid"); ok {
		user, err := database.Users.GetUserByUId(int64(uid.(float64)))
		if err != nil {
			c.JSON(500, "User not found!")
		}
		c.JSON(200, user)
	} else {
		c.Status(401)
		return
	}
}
