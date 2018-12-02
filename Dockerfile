FROM golang

RUN go get github.com/gorilla/handlers
RUN go get github.com/gorilla/mux
RUN go get github.com/lib/pq
