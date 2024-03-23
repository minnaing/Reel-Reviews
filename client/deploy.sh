#!/bin/bash

# Build the React app
echo -e "\nBuilding the React app...\n"
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
  echo -e "\nBuild successful.\n"

  # Add build changes to git
  git add .

  # Commit changes
  echo -e "\nCommitting changes to Git...\n"
  git commit -m "Deploying to Heroku"

  # Push to the main branch on GitHub
  echo -e "\nPushing to GitHub...\n"
  git push origin development 

  # Push to Heroku
  echo -e "\nDeploying to Heroku...\n"
  git push origin development:main

  echo -e "\nDeployment successful.\n"
else
  echo -e "\nBuild failed. Fix the errors and try again.\n"
fi
