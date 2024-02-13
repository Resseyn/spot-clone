package songsManagement

import (
	"github.com/gin-gonic/gin"
	"io"
	"os"
	"sputify/internal/database"
	types "sputify/internal/goTypes"
	"sputify/internal/logger"
)

func AddSong(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.Status(400)
		return
	}
	song, err := form.File["song"][0].Open()
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.JSON(500, gin.H{"error": "Failed to open file"})
		return
	}
	image, err := form.File["image"][0].Open()
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.JSON(500, gin.H{"error": "Failed to open file"})
		return
	}
	_, err = database.Songs.UploadSong(&types.Song{
		AuthorId:   form.Value["author"][0],
		PlaylistID: 1,
		Title:      form.Value["title"][0],
		SongPath:   "data_dirXD/songs/" + form.File["song"][0].Filename,
		ImagePath:  "data_dirXD/images/" + form.File["image"][0].Filename,
	})
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.JSON(500, gin.H{"error": "Failed to upload song to DB"})
		return
	}
	fileS, err := os.Create("data_dirXD/songs/" + form.File["song"][0].Filename)
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.JSON(500, gin.H{"error": "Failed to create file"})
		return
	}
	_, err = io.Copy(fileS, song)
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.JSON(500, gin.H{"error": "Failed to write file"})
		return
	}
	fileI, err := os.Create("data_dirXD/images/" + form.File["image"][0].Filename)
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.JSON(500, gin.H{"error": "Failed to create file"})
		return
	}
	defer fileI.Close()
	defer image.Close()
	defer fileS.Close()
	defer song.Close()

	_, err = io.Copy(fileI, image)
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.JSON(500, gin.H{"error": "Failed to write file"})
		return
	}
	c.JSON(200, gin.H{"message": "File uploaded successfully!"})
}

func GetAllSongs(c *gin.Context) {
	songs, err := database.Songs.GetSongs()
	if err != nil {
		logger.ErrorLogger.Println(err)
		c.JSON(500, gin.H{"error": "Database fetching error"})
		return
	}
	c.JSON(200, songs)
}
