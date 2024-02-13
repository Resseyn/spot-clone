package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"sputify/internal/api/songsManagement"
	"sputify/internal/api/userInfo"
	"sputify/internal/auth"
	"sputify/pkg/middleware"
)

func (s *APIServer) Run() {

	app := gin.Default()
	app.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	//app.LoadHTMLGlob("web/html/*.html")
	//app.Static("/static", "web/static")
	app.GET("/google_login", auth.GoogleLogin)
	app.GET("/google_callback", auth.GoogleCallback)
	app.POST("/register", auth.RegisterByMail)
	app.POST("/login", auth.LoginByMail)

	app.NoRoute(middleware.AuthMiddleware, func(c *gin.Context) {
		c.JSON(404, gin.H{"message": "Page not found"})
	})

	authG := app.Group("/user")
	authG.POST("/refresh_token", auth.RefreshTokens)
	authG.Use(middleware.AuthMiddleware)
	{
		authG.POST("/logout", auth.Logout)
		authG.GET("/data", userInfo.GetUserData)
	}

	songG := app.Group("/songs")
	songG.Use(middleware.AuthMiddleware)
	{
		songG.POST("/upload", songsManagement.AddSong)
		songG.GET("/all", songsManagement.GetAllSongs)
	}

	err := app.Run(s.Addr)
	if err != nil {
		panic(err)
	}
}

type APIServer struct {
	Addr string
}
