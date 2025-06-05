
create-image:
	@echo "Creating Docker image..."
	docker build -t "reel-review" .


run-image:
	@echo "Running Docker container..."
	docker run -d -p 9999:9999 localhost/reel-review

start-server:
	@echo "Starting server..."
	npm install && node server.js
