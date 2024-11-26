# Stage 1: Build the Angular app using Node.js
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the Angular app
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the Angular build output to Nginx’s default directory
COPY --from=build /app/dist/ash-blog/browser /usr/share/nginx/html

# Expose port 80 to allow external traffic
EXPOSE 80

# Command to run Nginx in the foreground (keep it running)
CMD ["nginx", "-g", "daemon off;"]