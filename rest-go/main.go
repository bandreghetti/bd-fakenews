package main

import (
	"crypto/md5"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type User struct {
	Name  string `json:name`
	Email string `json:email`
}

type New struct {
	Headline    string `json:headline`
	Body        string `json:body`
	SubmittedBy string `json:submittedBy`
}

type Publi struct {
	Link       string `json:link`
	Author     string `json:author`
	CodVeiculo int    `json:codVeiculo`
	CodNoticia int    `json:codNoticia`
}

type Media struct {
	MD5        string `json:md5`
	File       []byte `json:file`
	IsVideo    bool   `json:isVideo`
	Link       string `json:link`
	CodNoticia int    `json:codNoticia`
}

type CandidateNew struct {
	CPF        string
	CodNoticia int
}

var db *(sql.DB)
var err error

func main() {
	connStr := "user=postgres dbname=postgres password=bd20182 host=postgres_database sslmode=disable"
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

type FakeNews struct {
	User       User     `json:user`
	New        New      `json:new`
	Publi      Publi    `json:publi`
	Media      Media    `json:media`
	Candidates []string `json:candidates`
}

func createNews(w http.ResponseWriter, r *http.Request) {
	// Get the request body
	value, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("{\"error\":\"couldn't read request body\"}"))
		return
	}

	var fnews FakeNews

	// Unmarshal the JSON
	err = json.Unmarshal([]byte(value), &fnews)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("{\"error\":\"invalid JSON format\"}"))
		return
	}

	log.Println(fnews)

	_, err = createUser(db, fnews.User)
	if err != nil {
		errMsg := fmt.Sprintf("error inserting user tuple: %s", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(errMsg))
		return
	}

	new, err := createNew(db, fnews.New)
	if err != nil {
		errMsg := fmt.Sprintf("error inserting news tuple: %s", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(errMsg))
		return
	}
	fnews.Publi.CodNoticia = new

	_, err = createPubli(db, fnews.Publi)
	if err != nil {
		errMsg := fmt.Sprintf("error inserting publication tuple: %s", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(errMsg))
		return
	}

	fileArray := fnews.Media.File
	hasher := md5.New()
	hasher.Write(fileArray)
	md5hashed := hex.EncodeToString(hasher.Sum(nil))
	fnews.Media.MD5 = md5hashed
	_, err = createMedia(db, fnews.Media)
	if err != nil {
		errMsg := fmt.Sprintf("error inserting media tuple: %s", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(errMsg))
		return
	}

	for _, candidate := range fnews.Candidates {
		err = createCandidateNewRelation(db, CandidateNew{CPF: candidate, CodNoticia: new})
		if err != nil {
			errMsg := fmt.Sprintf("error inserting candidate-to-news relationship tuple: %s", err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(errMsg))
			return
		}
	}
	w.WriteHeader(http.StatusOK)
}

func createUser(db *sql.DB, user User) (string, error) {
	var userID string
	userCreateQuery := fmt.Sprintf("INSERT INTO t_usuario(nome, email) VALUES ('%s', '%s') RETURNING email", user.Name, user.Email)
	err := db.QueryRow(userCreateQuery).Scan(&userID)
	if userID != "" {
		return userID, err
	}

	return userID, nil
}

func createNew(db *sql.DB, new New) (int, error) {
	var newID int
	newCreateQuery := fmt.Sprintf("INSERT INTO t_noticia(manchete, corpo, submetidaPor) VALUES ('%s', '%s', '%s') RETURNING codigo", new.Headline, new.Body, new.SubmittedBy)
	err := db.QueryRow(newCreateQuery).Scan(&newID)
	if err != nil {
		return -1, err
	}
	return newID, nil
}

func createPubli(db *sql.DB, pub Publi) (string, error) {
	var newPub string
	publiCreateQuery := fmt.Sprintf("INSERT INTO t_publicacao(link, autor, codVeiculo, codNoticia) VALUES ('%s', '%s', %d, %d) RETURNING link", pub.Link, pub.Author, pub.CodVeiculo, pub.CodNoticia)
	err := db.QueryRow(publiCreateQuery).Scan(&newPub)
	if err != nil {
		return newPub, err
	}
	return newPub, nil
}

func createMedia(db *sql.DB, media Media) (string, error) {
	var newMedia string
	var createMediaForPub string
	if media.Link != "" {
		createMediaForPub = fmt.Sprintf("INSERT INTO t_midia(md5, arquivo, fotoVideo, linkPublicacao) VALUES ('%s', '%s', %t, '%s') RETURNING md5", media.MD5, string(media.File[:]), media.IsVideo, media.Link)
	} else {
		createMediaForPub = fmt.Sprintf("INSERT INTO t_midia(md5, arquivo, fotoVideo, linkPublicacao) VALUES ('%s', '%s', %t, %d) RETURNING md5", media.MD5, string(media.File[:]), media.IsVideo, media.CodNoticia)
	}
	err := db.QueryRow(createMediaForPub).Scan(&newMedia)
	if err != nil {
		return newMedia, err
	}

	return "", nil
}

func createCandidateNewRelation(db *sql.DB, candiNew CandidateNew) error {
	createRelation := fmt.Sprintf("INSERT INTO r_candidato_noticia(cpfCandidato, codNoticia) VALUES ('%s', '%d')", candiNew.CPF, candiNew.CodNoticia)
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
