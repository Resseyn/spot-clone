package auth

import (
	"github.com/dgrijalva/jwt-go"
	"os"
	"sputify/internal/database"
	types "sputify/internal/goTypes"
	"time"
)

func BlacklistToken(token *jwt.Token) error {
	err := database.RedisClient.Set(token.Raw, "blacklisted",
		time.Unix(int64(token.Claims.(jwt.MapClaims)["exp"].(float64)), 0).Sub(time.Now())).Err()
	return err
}
func CheckIfTokenBlacklisted(token *jwt.Token) bool {
	return database.RedisClient.Exists(token.Raw).Val() == 1
}

func ParseRefreshToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_REFRESH_SECRET")), nil
	})
	return token, err
}
func ParseAccessToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	return token, err
}
func generateTokenPair(user *types.User) (map[string]string, error) {
	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"uid": user.UId,

		"exp": time.Now().Add(time.Minute * 15).Unix(),
	})
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"uid": user.UId,
		"exp": time.Now().Add(time.Hour * 24 * 7 * 10).Unix(),
	})
	t, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return nil, err
	}
	rt, err := refreshToken.SignedString([]byte(os.Getenv("JWT_REFRESH_SECRET")))
	if err != nil {
		return nil, err
	}
	return map[string]string{
		"accessToken":  t,
		"refreshToken": rt,
	}, nil
}
