package database

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"os"
)

type PSQLDatabase struct { // PSQLDatabase - PostgreSQL Database
	Db *sql.DB
}

var Database PSQLDatabase

func init() {
	Database.createStorage()
	Database.initTables()
}

func (database *PSQLDatabase) createStorage() {
	err := godotenv.Load("environment.env")
	if err != nil {
		panic(err)
	}
	connectionString := fmt.Sprintf("host=localhost port=5432 user=postgres password=%s dbname=%s sslmode=disable",
		os.Getenv("DATABASE_PASSWORD"),
		os.Getenv("DATABASE_NAME"))
	db, err := sql.Open("postgres", connectionString)

	if err != nil {
		panic("could not connect to the database")
	}

	database.Db = db

	err = db.Ping()
	if err != nil {
		panic(fmt.Sprintf("could not ping the database: %v", err))
	}

	database.initTables()
}

func (database *PSQLDatabase) initTables() {
	_, err := database.Db.Exec(`
		CREATE TABLE IF NOT EXISTS public.users
		(
			uid SERIAL NOT NULL,
			email bytea NOT NULL UNIQUE,
			password bytea,
			username bytea NOT NULL,
			image bytea,
			email_verified boolean NOT NULL,
			created_at bigint,
			CONSTRAINT users_pkey PRIMARY KEY (uid)
		);
	`)
	if err != nil {
		panic(fmt.Sprintf("could not create 'users' table: %v", err))
	}
	_, err = database.Db.Exec(`
		CREATE TABLE IF NOT EXISTS public.songs
		(
			id SERIAL NOT NULL,
			author_id VARCHAR(255) NOT NULL,
		    playlist_id VARCHAR(255) NOT NULL,
			title VARCHAR(255) NOT NULL,
			song_path VARCHAR(255) NOT NULL,
		    image_path VARCHAR(2255) NOT NULL,
			created_at bigint,
			CONSTRAINT songs_pkey PRIMARY KEY (id)
		);
	`)
	if err != nil {
		panic(fmt.Sprintf("could not create 'songs' table: %v", err))
	}

}
