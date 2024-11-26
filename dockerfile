# Use Alpine version of Node.js as the base image, selecting a stable LTS version (e.g., Node.js 16)
FROM node:20-alpine AS build

# Set working directory for the application
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install application dependencies using npm
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular application for production
RUN npm run build

# Use Nginx as the web server for serving production build
FROM nginx:alpine

# Set the working directory for Nginx to the default directory for serving static files
WORKDIR /usr/share/nginx/html

# Copy the built Angular application from the build stage to the Nginx server directory
COPY --from=build /app/dist/ash-blog/browser /usr/share/nginx/html

# Clean up unnecessary source map files
RUN rm -rf /usr/share/nginx/html/*.map

# Expose the port where Nginx will be serving the app (default HTTP port 80)
EXPOSE 80

# Start Nginx in the foreground (daemon off)
CMD ["nginx", "-g", "daemon off;"]