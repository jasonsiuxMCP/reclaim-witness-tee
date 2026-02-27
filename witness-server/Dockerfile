# Use Node 22 (LTS)
FROM node:22-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package definition
COPY package.json package-lock.json ./

# Install dependencies (rebuilds native modules for the container arch)
# --ignore-scripts might break some native builds, so be careful. 
# attestor-core likely needs scripts.
RUN npm install --omit=dev

# Copy our witness server script
COPY witness-server/server.js ./server.js

# Env variables
ENV PORT=8080
ENV DISABLE_BGP_CHECKS=1

EXPOSE 8080

# Run the witness
CMD ["node", "server.js"]
