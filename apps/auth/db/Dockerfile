FROM node:18-alpine

# Set working directory to authApi
WORKDIR /app/apps/auth

# Copy application code
COPY ./apps/auth .

# Switch to root directory
WORKDIR /app

# Copy root-level package.json, tsconfig.json and nest-cli.json
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install all dependencies
RUN npm install

# Expose port
EXPOSE ${PORT_AUTH_API}

# Run migrations
CMD ["npm", "run", "migration:run:auth"]