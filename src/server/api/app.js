var express = require('express');
var app = module.exports = express();

var crud = require('./crud-generator');

var cloudinmail = require('./cloudmailin');

app.use('/cloudmailin', cloudinmail);

app.post('/classifieds/from-url',
    express.bodyParser(),
    express.methodOverride(),
    function (req, res, next) {
        var crawl = require('../../crawler/crawler');
        var url = req.body.url;
        if (!url) {
            return res.send('url parameter is mandatory', 400);
        }
        crawl(url, function (err, classified) {
            if (err) return res.send(err.message, 500);
            res.send(classified);
        });
    }
);
app.use('/classifieds', crud({
        repository: require('./classifieds/repository'),
        validator: require('./classifieds/validator')
    })
);
app.use(
    '/classifieds',
    // and finally the crud middleware.
    crud({
        repository: require('./messages/repository'),
        validator: require('./messages/validator'),
        path: '/:classified_id/messages',
        middlewares: [
            // validate classified exists
            crud.idToObject(require('./classifieds/repository'), 'classified_id', 'classified'),
            // force classified_id in body.
            // Note that it does not override existing value.
            function insertClassifiedId(req, res, next) {
                if (req.body && !("classified_id" in req.body)) {
                    req.body.classified_id = req.params.classified_id;
                }
                next();
            }
        ]
    })
);


if (!module.parent) {
    var port = app.get('port') || 8080;
    app.listen(port);
    console.log('Express started on port '+port);
}
