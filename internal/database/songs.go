package database

import (
	"sputify/internal/goTypes"
	"time"
)

var Songs PSQLDatabase

func init() {
	Songs.Db = Database.Db
}

func (st *PSQLDatabase) UploadSong(song *types.Song) (*types.Song, error) {
	err := st.Db.QueryRow("INSERT INTO songs (author_id, playlist_id, title, song_path, image_path, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
		song.AuthorId, 1, song.Title, song.SongPath, song.ImagePath, time.Now().Unix()).Scan(&song.Id)
	if err != nil {
		return nil, err
	}
	return song, nil
}
func (st *PSQLDatabase) GetSongs() ([]*types.Song, error) {
	songs := make([]*types.Song, 0)
	rows, err := st.Db.Query("SELECT * FROM songs")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		song := &types.Song{}
		rows.Scan(&song.Id,
			&song.AuthorId,
			&song.PlaylistID,
			&song.Title,
			&song.SongPath,
			&song.ImagePath,
			&song.CreatedAt)
		songs = append(songs, song)
	}
	return songs, err
}

//func (st *PSQLDatabase) GetUserByUId(uid int64) (*types.User, error) {
//	user := types.User{}
//	err := st.Db.QueryRow("SELECT uid, email, username, image, email_verified, created_at FROM users WHERE uid = $1", uid).
//		Scan(&user.UId, &user.Email, &user.Username, &user.Image, &user.EmailVerified, &user.CreatedAt)
//	user.Email = helpers.DecryptData(user.Email)
//	user.Username = helpers.DecryptData(user.Username)
//	user.Image = helpers.DecryptData(user.Image)
//	return &user, err
//}
