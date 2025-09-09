# Usa una imagen base con herramientas de compilación
FROM node:18-alpine

# aws-sdk puede necesitar python y g++ para compilar algunas dependencias
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
# Instala todas las dependencias, incluyendo las de desarrollo que podrían ser necesarias para compilar
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]