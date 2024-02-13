package types

type User struct {
	UId           int    `json:"uid"`
	Email         string `json:"email"`
	Password      []byte `json:"password"`
	Username      string `json:"username"`
	Image         string `json:"image"`
	EmailVerified bool   `json:"email_verified"`
	CreatedAt     int64  `json:"created_at"`
}

type Song struct {
	Id         int    `json:"id"`
	AuthorId   string `json:"author_id"` //TODO: authorID int
	PlaylistID int    `json:"playlist_id"`
	Title      string `json:"title"`
	SongPath   string `json:"song_path"`
	ImagePath  string `json:"image_path"`
	CreatedAt  int64  `json:"created_at"`
}
