package main

import (
	"github.com/joho/godotenv"
	"log"
	"sputify/internal/api"
)

func main() {
	err := godotenv.Load("environment.env")
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}
	serv := api.APIServer{Addr: ":8080"}
	serv.Run()
}
