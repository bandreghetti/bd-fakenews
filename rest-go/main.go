package main

import (
	"crypto/md5"
	"database/sql"
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type User struct {
	name  string
	email string
}

type New struct {
	headline    string
	body        string
	submittedBy string
}

type Publi struct {
	link       string
	author     string
	veicCode   int
	codNoticia int
}

type Media struct {
	md5     string
	file    []byte
	isVideo bool
	link    string
	codNew  int
}

type CandidateNew struct {
	cpf        string
	codNoticia int
}

var db *(sql.DB)
var err error

func main() {
	connStr := "user=postgres dbname=postgres password=bd20182 host=127.0.0.1 sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	r := mux.NewRouter()
	// r.HandleFunc("/", handler which will serve the static page)
	r.HandleFunc("/submit", createNews).Methods("POST")

	corsConf := handlers.CORS(
		handlers.AllowedMethods([]string{"GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowCredentials(),
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
	)
	handler := corsConf(r)

	log.Println("Listening on port 3000...")
	http.ListenAndServe(":3000", handlers.LoggingHandler(os.Stdout, handler))
	if err != nil {
		log.Fatal(err)
	}
}

func createNews(w http.ResponseWriter, r *http.Request) {
	user := User{name: "vivi", email: "vivie@ieee.org"}
	_, err := createUser(db, user)
	if err != nil {
		errMsg := fmt.Sprintf("error inserting user tuple: %s", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(errMsg))
	}
	new, err := createNew(db, New{headline: "Bolobiro é bobão", body: "lalalala", submittedBy: user.email})
	if err != nil {
		errMsg := fmt.Sprintf("error inserting news tuple: %s", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(errMsg))
	}
	publi, err := createPubli(db, Publi{codNoticia: new, link: "goog", author: "Janaína Paschoal", veicCode: 1})
	if err != nil {
		errMsg := fmt.Sprintf("error inserting publication tuple: %s", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(errMsg))
	}
	fileArray := []byte{41, 31, 11, 42, 10, 42}
	hasher := md5.New()
	hasher.Write([]byte(fileArray))
	md5hashed := hex.EncodeToString(hasher.Sum(nil))
	_, err = createMedia(db, Media{md5: md5hashed, link: publi, file: fileArray, isVideo: false})
	if err != nil {
		errMsg := fmt.Sprintf("error inserting media tuple: %s", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(errMsg))
	}
	err = createCandidateNewRelation(db, CandidateNew{cpf: "82045696022", codNoticia: new})
	if err != nil {
		errMsg := fmt.Sprintf("error inserting candidate-to-news relationship tuple: %s", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(errMsg))
	}
	w.WriteHeader(http.StatusOK)
}

func createUser(db *sql.DB, user User) (string, error) {
	var userID string
	userCreateQuery := fmt.Sprintf("INSERT INTO t_usuario(nome, email) VALUES ('%s', '%s') RETURNING email", user.name, user.email)
	err := db.QueryRow(userCreateQuery).Scan(&userID)
	if userID != "" {
		return userID, err
	}

	return userID, nil
}

func createNew(db *sql.DB, new New) (int, error) {
	var newID int
	newCreateQuery := fmt.Sprintf("INSERT INTO t_noticia(manchete, corpo, submetidaPor) VALUES ('%s', '%s', '%s') RETURNING codigo", new.headline, new.body, new.submittedBy)
	err := db.QueryRow(newCreateQuery).Scan(&newID)
	if err != nil {
		return -1, err
	}
	return newID, nil
}

func createPubli(db *sql.DB, pub Publi) (string, error) {
	var newPub string
	publiCreateQuery := fmt.Sprintf("INSERT INTO t_publicacao(link, autor, codVeiculo, codNoticia) VALUES ('%s', '%s', %d, %d) RETURNING link", pub.link, pub.author, pub.veicCode, pub.codNoticia)
	err := db.QueryRow(publiCreateQuery).Scan(&newPub)
	if err != nil {
		return newPub, err
	}
	return newPub, nil
}

func createMedia(db *sql.DB, media Media) (string, error) {
	var newMedia string
	var createMediaForPub string
	if media.link != "" {
		createMediaForPub = fmt.Sprintf("INSERT INTO t_midia(md5, arquivo, fotoVideo, linkPublicacao) VALUES ('%s', '%s', %t, '%s') RETURNING md5", media.md5, string(media.file[:]), media.isVideo, media.link)
	} else {
		createMediaForPub = fmt.Sprintf("INSERT INTO t_midia(md5, arquivo, fotoVideo, linkPublicacao) VALUES ('%s', '%s', %t, %d) RETURNING md5", media.md5, string(media.file[:]), media.isVideo, media.codNew)
	}
	err := db.QueryRow(createMediaForPub).Scan(&newMedia)
	if err != nil {
		return newMedia, err
	}

	return "", nil
}

func createCandidateNewRelation(db *sql.DB, candiNew CandidateNew) error {
	createRelation := fmt.Sprintf("INSERT INTO r_candidato_noticia(cpfCandidato, codNoticia) VALUES ('%s', '%d')", candiNew.cpf, candiNew.codNoticia)
	err := db.QueryRow(createRelation).Scan(nil)
	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil
		default:
			return err
		}
	}
	return nil
}
