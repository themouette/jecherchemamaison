from node:0.10

ADD . /usr/local/recherche.immo
WORKDIR /usr/local/recherche.immo

ENV PORT 1337

ENTRYPOINT ./node_modules/.bin/forever
CMD ["src/server/index.js"]
