FROM node:18-alpine

# Set working directory to clientApi
WORKDIR /app/apps/client

# Copy application code
COPY ./apps/client .

# Set working directory to shared library
WORKDIR /app/libs/shared

# Copy shared library
COPY ./libs/shared .

# Switch to root directory
WORKDIR /app

# Copy root-level package.json, tsconfig.json and nest-cli.json
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install all dependencies
RUN npm install

# Expose port
EXPOSE ${PORT_CLIENT_API}

# Run migrations
CMD ["npm", "run", "migration:run:client"]