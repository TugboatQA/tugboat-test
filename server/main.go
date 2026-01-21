package main

import (
	"fmt"
	"log"
	"net/http"
)


func main() {
	// Serve static files (HTML, CSS, images) from the public directory
	// http.StripPrefix removes the "/" prefix before looking for files
	// http.FileServer serves files from the "public" directory
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("public"))))

	// Print a message indicating the server is starting
	fmt.Println("Server starting on port 8080")

	// Start the HTTP server on port 8080
	if err := http.ListenAndServe("0.0.0.0:8080", nil); err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}