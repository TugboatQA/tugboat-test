package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
)

func largeHeaderHandler(w http.ResponseWriter, r *http.Request) {
	// Parse the path to extract the size parameter
	// Expected format: /large-header/:size
	path := r.URL.Path
	parts := strings.Split(path, "/")
	
	// Check if the path matches /large-header/:size
	if len(parts) != 3 || parts[1] != "large-header" {
		http.NotFound(w, r)
		return
	}
	
	// Extract and parse the size parameter
	sizeStr := parts[2]
	size, err := strconv.Atoi(sizeStr)
	if err != nil {
		http.Error(w, "Invalid size parameter. Must be a number.", http.StatusBadRequest)
		return
	}
	
	// Set content type to HTML
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	
	// Generate HTML with a header of the specified size
	html := fmt.Sprintf(`<!DOCTYPE html>
<html>
  <head>
    <title>Large Header - Size %d</title>
    <link href="/style.css" rel="stylesheet" type="text/css" />
    <style>
      h1 {
        font-size: %dpx;
      }
    </style>
  </head>
  <body>
    <h1>Large Header (Size: %dpx)</h1>
  </body>
</html>`, size, size, size)
	
	fmt.Fprint(w, html)
}

func main() {
	
	
	// Serve static files (HTML, CSS, images) from the public directory
	// http.StripPrefix removes the "/" prefix before looking for files
	// http.FileServer serves files from the "public" directory
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("public"))))

	// Register the large-header route handler
	http.HandleFunc("/large-header/", largeHeaderHandler)

	// Print a message indicating the server is starting
	fmt.Println("Server starting on port 8080")

	// Start the HTTP server on port 8080
	if err := http.ListenAndServe("0.0.0.0:8080", nil); err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}