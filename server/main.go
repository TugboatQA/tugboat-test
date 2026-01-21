package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

func main() {
	// Custom handler that serves files from public/ regardless of path prefix
	// This allows the server to work with Tugboat's subpath routing
	// It extracts the actual filename from any path (e.g., /subpath/logo.svg -> logo.svg)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		
		// Clean the path and extract the filename
		path = strings.Trim(path, "/")
		parts := strings.Split(path, "/")
		
		// Get the last part (the actual filename)
		var filename string
		if len(parts) > 0 && parts[len(parts)-1] != "" {
			filename = parts[len(parts)-1]
		} else {
			// If path is empty or ends with slash, serve index.html
			filename = "index.html"
		}
		
		// Serve the file from public directory
		http.ServeFile(w, r, "public/"+filename)
	})

	// Print a message indicating the server is starting
	fmt.Println("Server starting on port 8080")

	// Start the HTTP server on port 8080
	if err := http.ListenAndServe("0.0.0.0:8080", nil); err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}