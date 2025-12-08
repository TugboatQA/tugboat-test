package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// upgrader is used to upgrade HTTP connections to WebSocket connections
// It has default settings that allow connections from any origin
var upgrader = websocket.Upgrader{
	// CheckOrigin allows connections from any origin (useful for development)
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// handleWebSocket handles incoming WebSocket connections
func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	// Upgrade the HTTP connection to a WebSocket connection
	// This transforms the standard HTTP request into a persistent WebSocket connection
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		// If upgrade fails, log the error and return
		log.Printf("Error upgrading connection: %v", err)
		return
	}
	// Ensure the connection is closed when this function exits
	defer conn.Close()

	// Log when a client connects
	log.Println("Client connected")

	// Infinite loop to continuously read messages from the client
	for {
		// ReadMessage reads the next message from the WebSocket connection
		// It returns the message type (text, binary, etc.), the message content, and any error
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			// If there's an error reading (e.g., client disconnected), log and break the loop
			log.Printf("Error reading message: %v", err)
			break
		}

		// Log the received message for debugging
		log.Printf("Received: %s", message)

		// Prepend the parrot emoji to the message
		// The parrot emoji is 🦜 (Unicode)
		parrotMessage := "🦜 " + string(message)

		// WriteMessage sends a message back to the client
		// We use the same messageType that was received (usually TextMessage)
		err = conn.WriteMessage(messageType, []byte(parrotMessage))
		if err != nil {
			// If writing fails, log the error and break the loop
			log.Printf("Error writing message: %v", err)
			break
		}

		// Log the sent message for debugging
		log.Printf("Sent: %s", parrotMessage)
	}

	// Log when a client disconnects
	log.Println("Client disconnected")
}

func main() {
	// Serve static files (HTML, CSS, images) from the public directory
	// http.StripPrefix removes the "/" prefix before looking for files
	// http.FileServer serves files from the "public" directory
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("public"))))

	// Serve the chat.html client file
	http.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "public/chat.html")
	})

	// Register the WebSocket handler at the /ws endpoint
	// When a client connects to ws://localhost:8080/ws, handleWebSocket will be called
	http.HandleFunc("/ws", handleWebSocket)


	// Print a message indicating the server is starting
	fmt.Println("Server starting on port 8080")
	fmt.Println("WebSocket endpoint available at: ws://0.0.0.0:8080/ws")

	// Start the HTTP server on port 8080
	if err := http.ListenAndServe("0.0.0.0:8080", nil); err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}