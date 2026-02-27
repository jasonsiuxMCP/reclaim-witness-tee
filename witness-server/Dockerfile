# Use Node 22 (LTS)
FROM node:22-slim

WORKDIR /app

# Install system dependencies (Reclaim might need build tools for crypto)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy existing node_modules (assuming they are built correctly for linux/amd64)
# In production, we should npm install to ensure architecture compatibility
COPY node_modules ./node_modules
COPY package.json .

# Copy our witness server script
COPY witness-server/server.js ./server.js

# Env variables
ENV PORT=8080
ENV DISABLE_BGP_CHECKS=1

EXPOSE 8080

# Run the witness
CMD ["node", "server.js"]
