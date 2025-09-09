FROM nginx

# Copier les fichiers de dépendances
COPY ./dist/ /usr/share/nginx/html

EXPOSE 8000


