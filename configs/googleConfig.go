package configs

import (
	"golang.org/x/oauth2/google"
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

type Config struct {
	GoogleLoginConfig oauth2.Config
	GitHubLoginConfig oauth2.Config
}

var AppConfig Config

func init() {
	AppConfig.GoogleLoginConfig = oauth2.Config{
		RedirectURL:  "http://localhost:8080/google_callback",
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes: []string{"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint: google.Endpoint,
	}
}
func GoogleConfig() oauth2.Config {

	return AppConfig.GoogleLoginConfig
}

func GithubConfig() oauth2.Config {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}

	AppConfig.GitHubLoginConfig = oauth2.Config{
		RedirectURL: "http://localhost:8080/github_callback",
		ClientID:    os.Getenv("GITHUB_CLIENT_ID"),
		//RedirectURL: fmt.Sprintf(
		//	"https://github.com/login/oauth/authorize?scope=user:repo&client_id=%s&redirect_uri=%s", os.Getenv("GITHUB_CLIENT_ID"), "http://localhost:8080/github_callback"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		Scopes:       []string{"user", "repo"},
		Endpoint:     github.Endpoint,
	}

	return AppConfig.GitHubLoginConfig
}
