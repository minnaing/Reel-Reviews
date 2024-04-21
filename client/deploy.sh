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

    # Add current directory(client) build changes to git
    git add .
 # Add parent directory(server) build changes to git
    git add ../

    # Commit changes with the provided commit message
    echo -e "\nCommitting the following to git...\n"
    echo -e "Commit: $1 \n"
    git commit -m "$1"

    # Push to the main branch on GitHub
    echo -e "\nPushing to Development...\n"
    git push origin development
    # Check if push to Development was successful
     if [ $? -ne 0 ]; then
        echo -e "\nError pushing changes to Development\n"
        exit 1
    fi
    # Push to Heroku
    echo -e "\nDeploying Development to Heroku the following...\n"
    echo -e "Commit: $1 \n"
    git push origin developmentw:main
if [ $? -ne 0 ]; then
        echo -e "\nError pushing Development to Heroku after Development was deployed successfully. Please perform a manual deployment to Heroku.\n"
        echo -e "Please run the following command to perform a manual deployment of Development to Heroku.\n
        \t git push origin development:main\n"

        echo -e "If push fails try adding --force to the end of the command\n"
        exit 1
    fi
    echo -e "\nDeployment successful.\n"
else
    echo -e "\nBuild failed. Fix the errors and try again.\n"
fi