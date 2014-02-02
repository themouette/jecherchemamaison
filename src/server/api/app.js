var express = require('express');
var app = module.exports = express();

var repository = require('./repository');
var validator = require('./validator');

app.use('/classifieds', crud({
        repository: require('./repository'),
        validator: require('./validator')
    })
);
app.use(
    '/classifieds/:classified_id/messages',
    // validate classified exists
    idToObject('classified_id', 'classified'),
    // force classified_id in body.
    // Note that it does not override existing value.
    function insertClassifiedId(req, res, next) {
        if (req.body && !("classified_id" in req.body)) {
            req.body.classified_id = req.params.classified_id;
        }
        next();
    },
    // and finally the crud middleware.
    crud({
        repository: require('./repository'),
        validator: require('./validator')
    })
);


function crud(options) {
    var repository = options.repository;
    var validator = options.validator;
    var ID_PATH = '/:id';
    var app = express();

    app.use(express.methodOverride());
    app.use(express.bodyParser());

    // Register POST route.
    //
    // Validates data and insert a new object.
    // @returns 201
    app.post(
        '/',
        // parse and validate request body against validator
        // with 'create' strategy.
        bodyToObject(validator, 'create'),
        // Only valid objects lands here
        // so insert and send.
        function createModel(req, res, next) {
            repository
                .insert(req.newModel)
                .then(sendDocument(req, res, next, 201))
                .catch(error500(req, res, next));
        }
    );
    app.get(
        '/',
        function listModels(req, res, next) {
            repository
                .findAll()
                .then(sendCollection(req, res, next, 200))
                .catch(error500(req, res, next));
        }
    );

    app.get(
        ID_PATH,
        idToObject(),
        function getModel(req, res, next) {
            sendDocument(req, res, next, 200)(req.model);
        }
    );
    app.put(
        ID_PATH,
        idToObject(),
        bodyToObject(validator, 'update'),
        function updateModel(req, res, next) {
            repository
                .update(req.model, req.newModel)
                .then(sendDocument(req, res, next, 200), error500(req, res, next))
                .catch(error500(req, res, next));
        }
    );

    app.delete(
        ID_PATH,
        idToObject(),
        function deleteModel(req, res, next) {
            repository
                .delete(req.model)
                .then(function () {
                    res.send(null, 204);
                });
        }
    );

    return app;
}


// Middleware that convert request id into an object.
//
// ```
// app.get(
//     '/:id',
//     idToObject(),
//     function (req, res, next) {
//         res.send(req.model)
//     });
// ```
//
// or
//
// ```
// app.get(
//     '/:user_id',
//     idToObject('user_id', 'user'),
//     function (req, res, next) {
//         res.send(req.user);
//     });
// ```
function idToObject(param, label) {
    param || (param = 'id');
    label || (label = 'model');

    return function (req, res, next) {
        var id = req.params[param];

        if (!id) return error400(req, res, next)("id is mandatory.");

        repository.findOne(id).then(function (doc) {
            if (!doc) return error404(req, res, next)("No macthing classified");
            req[label] = doc;
            next();
        }).catch(error500(req, res, next));
    };
}

// Middleware that convert request body into an object.
//
// ```
// app.get(
//     '/:id',
//     bodyToObject(),
//     function (req, res, next) {
//         res.send(req.newModel)
//     });
// ```
//
// or
//
// ```
// app.get(
//     '/:id',
//     bodyToObject(validator, 'create', 'newUser'),
//     function (req, res, next) {
//         res.send(req.newUser);
//     });
// ```
function bodyToObject(validator, group, label) {
    label || (label = 'newModel');

    return function (req, res, next) {
        if (!req.body) {
            var err = {
                "required": "Please provide a request body."
            };
            return error400(req, res, next)(err);
        }
        var doc = req.body;
        validator
            .validate(doc)
            .then(function (doc) {
                    req[label] = doc;
                    next();
                },
                error400(req, res, next)
            );
    };
}

// fromat and send a collection of documents.
// Up to now, only json is supported.
function sendCollection(req, res, next, status) {
    return function (docs) {
        res.send(docs, status);
    };
}

// format and send a single document.
// Up to now, only json is supported.
function sendDocument(req, res, next, status) {
    return function (doc) {
        res.send(doc, status);
    };
}


function error400(req, res, next) {
    return function (err) {
        next(err);
    };
}
function error404(req, res, next) {
    return function (err) {
        next(err);
    };
}
function error500(req, res, next) {
    return function (err) {
        next(err);
    };
}

if (!module.parent) {
    var port = app.get('port') || 8080;
    app.listen(port);
    console.log('Express started on port '+port);
}
