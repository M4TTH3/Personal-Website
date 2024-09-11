# Stage 1: Build the C++ executable
FROM node:20-bookworm-slim AS build

# Install required libraries and g++-11 for building C++ code
RUN apt-get update && \
    apt-get install -y \
    g++-11 \
    make \
    libx11-dev 

# Set the working directory
WORKDIR /app/chess

# Copy the Makefile and source code to the build context
COPY chess .

# Build the C++ executable
RUN make
RUN mv chess /app/chessExec

# Stage 2: Prepare the final image
FROM node:20-bookworm-slim AS final

# Set working directory for the final image
WORKDIR /app

# Install required libraries for the C++ executable to run
RUN apt-get update && \
    apt-get install -y \
    libx11-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy Node.js dependencies and code
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the C++ executable from the build stage
COPY --from=build /app/chessExec /app/chessExec
RUN chmod +x /app/chessExec

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Set environment variables if needed
ENV NODE_ENV=production
ENV PORT=3001

# Start the application
CMD ["node", "server.mjs"]

