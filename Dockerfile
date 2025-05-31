FROM node:lts-alpine3.22
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY . .
COPY --chown=node:node . .
USER node
RUN cd /home/node/app && npm install
EXPOSE 9999
CMD [ "node", "server.js" ]
