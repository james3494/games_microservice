FROM node:lts-alpine
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
WORKDIR /games_microservice
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
COPY . .
RUN chown -R node /games_microservice
USER node
CMD ["npm", "start"]
