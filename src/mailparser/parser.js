var repository = require('../server/api/classifieds/repository');
var urlRe = /(https?:\/\/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&//=]*))/gi;

var parse = module.exports.parse = function parse(fields, files, next) {
    var body = fields.plain;
    var urls = [];
    var myResults;

    // extract urls
    while((myResults = urlRe.exec(body)) !== null) {
        urls.push(myResults[0]);
    }
    console.log('Urls found: ' + urls);

    repository
        .findByLink(urls)
        .then(function (relatedClassifieds) {
            var newMessage = { "inserted": "doc" };
            next(null, newMessage, relatedClassifieds);
        }, next)
        .catch(next);

    // get a classified with the same link
};

if (!module.parent) {
    parse({
            plain: "Hello http://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url \
                    http://www.leboncoin.fr/ventes_immobilieres/598475011.htm?ca=3_s \
                    http://www.leboncoin.fr/ventes_immobilieres/598475011.htm?ca=3_s"
        },
        {},
        function (err, newDoc, related) {
            if (err) { console.error("ERROR !!! \n", err); }
            console.log(newDoc, related);
        }
    );
}
