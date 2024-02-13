package test

import (
	"github.com/joho/godotenv"
	"log"
	"sputify/internal/helpers"
	"testing"
)

func TestEncryptDecrypt(t *testing.T) {
	err := godotenv.Load("environment.env")
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}

	text := "your data"

	encrypted := helpers.EncryptData(text)

	decrypted := helpers.DecryptData(encrypted)

	if decrypted != text {
		t.Fatalf("Decrypted text doesn't match original text: got %v, want %v", decrypted, text)
	}
}
