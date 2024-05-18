# #!/bin/bash

# node server.mjs
# if [ $? -eq 0 ]; then
#     echo -e "\Nodemon server started successfully on Port:9999 \n"
# else
#     echo -e "\nError starting Nodemon server. Did you install your node_modules?\n"
#     exit 1
# fi


#!/bin/bash

cd "$(dirname "$0")"  # Change to the directory where this script is located
node server.mjs
if [ $? -eq 0 ]; then
    echo -e "\nServer started successfully on Port:9999 \n"
else
    echo -e "\nError starting server. Did you install your node_modules?\n"
    exit 1
fi
