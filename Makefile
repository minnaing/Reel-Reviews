
create-image:
	@echo "Creating Docker image..."
	podman build -t "reel-review" .


run-image:
	@echo "Running Docker container..."
	podman run -d -p 9999:9999 localhost/reel-review

start-server:
	@echo "Starting server..."
	npm install && node server.js
