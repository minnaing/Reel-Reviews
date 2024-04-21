#!/bin/bash

nodemon ../server.js
if [ $? -eq 0 ]; then
    echo -e "\Nodemon server started successfully.\n"


    if [ $? -ne 0 ]; then
        echo -e "\nError starting Nodemon server. Did you install your node_modules?\n"
        exit 1
    fi
fi