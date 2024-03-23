#!/bin/bash

# Build the React app
echo "\nBuilding the React app...\n"
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
  echo "\nBuild successful.\n"

  # Add build changes to git
  git add .

  # Commit changes
  echo "\nCommitting changes to Git...\n"
  git commit -m "Deploying to Heroku"

  # Push to the main branch on GitHub
  echo "\nPushing to GitHub...\n"
  git push origin development 

  # Push to Heroku
  echo "\nDeploying to Heroku...\n"
  git push origin development:main

  echo "\nDeployment successful.\n"
else
  echo "\nBuild failed. Fix the errors and try again.\n"
fi
