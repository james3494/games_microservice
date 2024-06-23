# Stage 1: Install dependencies for base module
FROM node:lts-alpine AS base-builder
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../

# Stage 2: Install dependencies for submodule
FROM base-builder AS submodule-builder

# Set the working directory to the submodule
WORKDIR /usr/src/app/database

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent

# Stage 3: Final image
FROM node:lts-alpine
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/app

# Copy the entire project including node_modules from previous stages
COPY --from=base-builder /usr/src/app /usr/src/app
COPY --from=submodule-builder /usr/src/app/database /usr/src/app/database

COPY . .
EXPOSE 3001
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
