FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]