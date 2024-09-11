# Use an official Node.js runtime as the base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the application if needed
# Uncomment if you have a build step
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Set environment variables if needed
ENV NODE_ENV=production
ENV PORT=3001

# Start the application
CMD ["node", "server.mjs"]
