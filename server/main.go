package main

import (
	"fmt"
	"log"
	"net/http"

	"golang.org/x/net/webdav"
)

func main() {
	mux := http.NewServeMux()

	// WebDAV endpoint for e2e verb testing (PUT, PROPFIND, MKCOL, COPY, MOVE, LOCK, etc.)
	mux.Handle("/webdav/", &webdav.Handler{
		Prefix:     "/webdav/",
		FileSystem: webdav.Dir("webdav"),
		LockSystem: webdav.NewMemLS(),
	})

	// Serve static files (HTML, CSS, images) from the public directory
	mux.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("public"))))

	fmt.Println("Server starting on port 8080")

	if err := http.ListenAndServe("0.0.0.0:8080", mux); err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}
