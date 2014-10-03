var express = require('express');

var app = module.exports = express();

var crud = require('./crud-generator');
var cloudinmail = require('./cloudmailin');
var users  = require('../config').users;

var debug  = require('debug')('jcmm:api:app');

var securityMiddlewares = [
        // User must be authenticated
        users.requireAuthentication(),
        // On criteria requests, add a filter by owner
        function filterForUser(req, res, next) {
            if (!req.where || "deleted_at" in req.where) {
                return next();
            }
            req.where.owner_id = req.user.id;
            next();
        },
        // Update form data with a owner_id property
        // This property will be saved
        function isModelProperty(req, res, next) {
            if (req.body) {
                req.body.owner_id = req.user.id;
            }
            next();
        }
    ];

app.use('/cloudmailin', cloudinmail);

app.post('/classifieds/from-url',
    function (req, res, next) {
        var crawl = require('../crawler/crawler');
        var url = req.body.url;
        if (!url) {
            return res.status(400).send('url parameter is mandatory');
        }
        crawl(url, function (err, classified) {
            if (err) {
                debug(err);
                return res.status(500).send(err.message);
            }
            res.send(classified);
        });
    }
);
app.use('/classifieds', crud({
        repository: require('./classifieds/repository'),
        validator: require('./classifieds/validator'),
        middlewares: securityMiddlewares.concat([
            // Add a filter to exclude active or deleted classifieds.
            //
            // Just pass `exclude_deleted` or `exclude_active` query string paramter.
            function (req, res, next) {
                if (!req.where || "deleted_at" in req.where) {
                    return next();
                }
                var exclude_active = 'exclude_active' in req.query;
                var exclude_deleted = 'exclude_deleted' in req.query;

                if (!exclude_deleted && !exclude_active) {
                    return next();
                }
                if (exclude_deleted) {
                    req.where.$or = req.where.$or || [];
                    req.where.$or.push({ deleted_at: { $exists: false } });
                    req.where.$or.push({ deleted_at: { $gte: new Date() } });
                }
                if (exclude_active) {
                    req.where.$and = req.where.$and || [];
                    req.where.$and.push({ deleted_at: { $exists: true } });
                    req.where.$and.push({ deleted_at: { $lte: new Date() } });
                }
                next();
            }
        ])
    })
);
app.use(
    '/classifieds',
    // and finally the crud middleware.
    crud({
        repository: require('./messages/repository'),
        validator: require('./messages/validator'),
        path: '/:classified_id/messages',
        middlewares: securityMiddlewares.concat([
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
        ])
    })
);
app.use(
    '/classifieds',
    // and finally the crud middleware.
    crud({
        repository: require('./visits/repository'),
        validator: require('./visits/validator'),
        path: '/:classified_id/visits',
        middlewares: securityMiddlewares.concat([
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
        ])
    })
);
app.use(
    '/visits',
    // and finally the crud middleware.
    crud({
        repository: require('./visits/repository'),
        validator: require('./visits/validator'),
        middlewares: securityMiddlewares
    })
);

app.use(function handleError(err, req, res, next) {
    if (!err) next();
    debug(err);
    res.status(500).send(err.message || 'unknown error');
});


if (!module.parent) {
    var port = app.get('port') || 8080;
    app.listen(port);
    console.log('Express started on port '+port);
}
