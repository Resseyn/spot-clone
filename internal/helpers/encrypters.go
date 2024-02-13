package helpers

import (
	"crypto/aes"
	"crypto/cipher"
	"os"
)

func EncryptData(data string) string {
	key := os.Getenv("API_KEY")

	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		panic(err)
	}

	ciphertext := make([]byte, len(data))
	stream := cipher.NewCFBEncrypter(block, []byte(key))
	stream.XORKeyStream(ciphertext, []byte(data))

	return string(ciphertext)
}

func DecryptData(data string) string {
	key := os.Getenv("API_KEY")

	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		panic(err)
	}

	plaintext := make([]byte, len(data))
	stream := cipher.NewCFBDecrypter(block, []byte(key))
	stream.XORKeyStream(plaintext, []byte(data))

	return string(plaintext)
}
