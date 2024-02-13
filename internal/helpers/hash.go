package helpers

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func HashBcryptHash(bcryptHash string) string {
	hash := sha256.Sum256([]byte(bcryptHash))
	return hex.EncodeToString(hash[:])
}

func CheckPassword(hashedPassword, bcryptHash string) error {
	sha256Hash := HashBcryptHash(bcryptHash)
	if sha256Hash != hashedPassword {
		return fmt.Errorf("неверный пароль")
	}
	return nil
}
func HashPassword(password string) string {
	hasher := sha256.New()
	hasher.Write([]byte(password))
	return hex.EncodeToString(hasher.Sum(nil))
}

func CheckPasswordHash(password, hash string) bool {
	return HashPassword(password) == hash
}
