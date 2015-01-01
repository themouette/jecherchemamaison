from node:0.10

ADD . /usr/local/recherche.immo
WORKDIR /usr/local/recherche.immo

RUN npm install --production

ENV PORT 1337

ENTRYPOINT 
CMD [ "./node_modules/.bin/forever", "src/server/index.js" ]
