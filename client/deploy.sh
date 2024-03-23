#!/bin/bash

# Build the React app
echo "Building the React app..."
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
  echo "Build successful."

  # Add build changes to git
  git add .

  # Commit changes
  echo "Committing changes to Git..."
  git commit -m "Deploying to Heroku"

  # Push to the main branch on GitHub
  echo "Pushing to GitHub..."
  git push origin main

  # Push to Heroku
  echo "Deploying to Heroku..."
  git push origin heroku

  echo "Deployment successful."
else
  echo "Build failed. Fix the errors and try again."
fi
