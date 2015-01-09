from nginx:1.7.9

RUN mkdir -p /var/www/recherche.immo/public

COPY ./etc/ /etc/
RUN mv /etc/nginx/nginx.conf.production /etc/nginx/nginx.conf
COPY ./public/ /var/www/recherche.immo/public
