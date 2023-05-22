FROM node:16.16-alpine as builder

# Prepare a directory and enter it
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY --chown=node:node ./package*.json ./

# Install dependencies
USER node
RUN npm install

# Copy & chown all the other files
COPY --chown=node:node . .

# Override api port env variable (optional)
ARG VITE_FILES_API_PORT

# Build the project
RUN npm run build


FROM nginx:alpine

# Copy the nginx config
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built project to the directory served by nginx
COPY --from=builder /home/node/app/dist /usr/share/nginx/html
