#!/bin/bash

# Check if a commit message is provided
if [ -z "$1" ]; then
    echo "Error: Please provide a commit message."
    exit 1
fi

# Build the React app
echo -e "\nBuilding the React app...\n"
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo -e "\nBuild successful.\n"

    # Pull the latest changes from the remote branch
    echo -e "\nPulling latest changes from GitHub...\n"
    # git pull origin fakebranch --rebase
    if [ $? -ne 0 ]; then
        echo -e "\nError pulling changes from GitHub. Please resolve conflicts or pull errors and try again.\n"
        exit 1
    fi

    # Add build changes to git
    git add .

    # Commit changes with the provided commit message
    echo -e "\nCommitting changes to Git...\n"
    echo -e "$1"
    git commit -m "$1"

    # Push to the main branch on GitHub
    echo -e "\nPushing to GitHub...\n"
    git push origin fakebranch

    # Push to Heroku
    echo -e "\nDeploying to Heroku...\n"
    git push origin fakebranch:main

    echo -e "\nDeployment successful.\n"
else
    echo -e "\nBuild failed. Fix the errors and try again.\n"
fi































# # Build the React app
# echo -e "\nBuilding the React app...\n"
# npm run build

# # Check if the build was successful
# if [ $? -eq 0 ]; then
#   echo -e "\nBuild successful.\n"

#   # Pull the latest changes from the remote branch
#   echo -e "\nPulling latest changes from GitHub...\n"
#   git pull origin development --rebase
#   if [ $? -ne 0 ]; then
#     echo -e "\nError pulling changes from GitHub. Please resolve conflicts or pull errors and try again.\n"
#     exit 1
#   fi

#   # Add build changes to git
#   git add .

#   # Commit changes
#   echo -e "\nCommitting changes to Git...\n"
#   git commit -m "Deploying to Heroku"

#   # Push to the main branch on GitHub
#   echo -e "\nPushing to GitHub...\n"
#   git push origin development 

#   # Push to Heroku
#   echo -e "\nDeploying to Heroku...\n"
#   git push origin development:main

#   echo -e "\nDeployment successful.\n"
# else
#   echo -e "\nBuild failed. Fix the errors and try again.\n"
# fi
