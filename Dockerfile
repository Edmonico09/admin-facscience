# Étape 1 : build React
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g vite
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : servir avec nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

