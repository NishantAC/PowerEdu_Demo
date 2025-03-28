# Stage 1: Build the React app
FROM node:20.15.1-alpine AS build

# Set the working directory
WORKDIR /app

# Build arguments for environment variables
ARG REACT_APP_API_KEY
ARG REACT_APP_AUTH_DOMAIN
ARG REACT_APP_DATABASE_URL
ARG REACT_APP_PROJECT_ID
ARG REACT_APP_STORAGE_BUCKET
ARG REACT_APP_MESSAGING_SENDER_ID
ARG REACT_APP_APP_ID
ARG REACT_APP_MEASUREMENT_ID
ARG VITE_API_BASE_URL
ARG VITE_API_BASE_NEW_URL
ARG VITE_CLIENT_ID
ARG VITE_CLIENT_SECRET

# Set environment variables
ENV REACT_APP_API_KEY=$REACT_APP_API_KEY
ENV REACT_APP_AUTH_DOMAIN=$REACT_APP_AUTH_DOMAIN
ENV REACT_APP_DATABASE_URL=$REACT_APP_DATABASE_URL
ENV REACT_APP_PROJECT_ID=$REACT_APP_PROJECT_ID
ENV REACT_APP_STORAGE_BUCKET=$REACT_APP_STORAGE_BUCKET
ENV REACT_APP_MESSAGING_SENDER_ID=$REACT_APP_MESSAGING_SENDER_ID
ENV REACT_APP_APP_ID=$REACT_APP_APP_ID
ENV REACT_APP_MEASUREMENT_ID=$REACT_APP_MEASUREMENT_ID
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_BASE_NEW_URL=$VITE_API_BASE_NEW_URL
ENV VITE_CLIENT_ID = $VITE_CLIENT_ID
ENV VITE_CLIENT_SECRET = $VITE_CLIENT_SECRET

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using a Node.js server
FROM node:20.15.1-alpine

# Set the working directory for the Node.js server
WORKDIR /app

# Copy the build output from the previous stage to the current stage
COPY --from=build /app/build ./build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Command to run the server
CMD ["serve", "-s", "build"]