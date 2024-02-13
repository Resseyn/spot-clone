package database

import (
	"github.com/dgrijalva/jwt-go"
	"sputify/internal/goTypes"
	"sputify/internal/helpers"
	"time"
)

var Users PSQLDatabase

func init() {
	Users.Db = Database.Db
}

func (st *PSQLDatabase) SearchUser(user *types.User, token *jwt.StandardClaims) error {
	err := st.Db.QueryRow("SELECT uid, username, password FROM users WHERE id = $1", token.Issuer).
		Scan(&user.UId, &user.Username, &user.Email)
	return err
}

func (st *PSQLDatabase) UploadUserImage(uid string, image string) error {
	_, err := st.Db.Exec("UPDATE users SET image = $1 WHERE uid = $2", image, uid)
	return err
}

func (st *PSQLDatabase) AddUserByMail(user *types.User) (*types.User, error) {
	err := st.Db.QueryRow("INSERT INTO users (email, password, username, image, email_verified, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING uid",
		helpers.EncryptData(user.Email),
		helpers.EncryptData(string(user.Password)),
		helpers.EncryptData(user.Username),
		helpers.EncryptData(user.Image),
		user.EmailVerified, time.Now().Unix()).Scan(&user.UId)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (st *PSQLDatabase) AddUserFromOAuth(user *types.User) (*types.User, error) {
	err := st.Db.QueryRow("INSERT INTO users (email, username, image, email_verified, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING uid",
		helpers.EncryptData(user.Email),
		helpers.EncryptData(user.Username),
		helpers.EncryptData(user.Image),
		user.EmailVerified, time.Now().Unix()).Scan(&user.UId)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (st *PSQLDatabase) GetUserByUId(uid int64) (*types.User, error) {
	user := types.User{}
	err := st.Db.QueryRow("SELECT uid, email, username, image, email_verified, created_at FROM users WHERE uid = $1", uid).
		Scan(&user.UId, &user.Email, &user.Username, &user.Image, &user.EmailVerified, &user.CreatedAt)
	user.Email = helpers.DecryptData(user.Email)
	user.Username = helpers.DecryptData(user.Username)
	user.Image = helpers.DecryptData(user.Image)
	return &user, err
}
func (st *PSQLDatabase) GetUserByEmail(email string) (*types.User, error) {
	user := types.User{}
	err := st.Db.QueryRow("SELECT uid, email, username, image, email_verified, created_at FROM users WHERE email = $1",
		helpers.EncryptData(email)).
		Scan(&user.UId, &user.Email, &user.Username, &user.Image, &user.EmailVerified, &user.CreatedAt)
	user.Email = helpers.DecryptData(user.Email)
	user.Username = helpers.DecryptData(user.Username)
	user.Image = helpers.DecryptData(user.Image)
	return &user, err
}

func (st *PSQLDatabase) GetUserByAuth(email string, password string) (*types.User, error) {
	user := types.User{}
	err := st.Db.QueryRow("SELECT uid, email, username, image, email_verified, created_at FROM users WHERE email = $1 OR username = $1 AND password = $2",
		helpers.EncryptData(email), helpers.EncryptData(password)).
		Scan(&user.UId, &user.Email, &user.Username, &user.Image, &user.EmailVerified, &user.CreatedAt)
	user.Email = helpers.DecryptData(user.Email)
	user.Username = helpers.DecryptData(user.Username)
	user.Image = helpers.DecryptData(user.Image)
	return &user, err
}
