var express = require('express');
var _ = require('lodash');
module.exports = crud;

module.exports.idToObject = idToObject;
module.exports.bodyToObject = bodyToObject;

var pathReg = /(\/+)$/;

function crud(options) {
    var middlewares = options.middlewares || [];
    var repository = options.repository;
    var validator = options.validator;
    var PATH = options.path || '/';
    var ID_PATH = removeTrailingSlash(PATH) + '/:id';
    var app = express();

    // Register POST route.
    //
    // Validates data and insert a new object.
    // @returns 201
    app.post(
        PATH,
        middlewares,
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
        PATH,
        requestToCriteria(),
        middlewares,
        function listModels(req, res, next) {
            if (req)
            repository
                .findAll(req.where)
                .then(sendCollection(req, res, next, 200))
                .catch(error500(req, res, next));
        }
    );

    app.get(
        ID_PATH,
        middlewares,
        idToObject(repository),
        function getModel(req, res, next) {
            sendDocument(req, res, next, 200)(req.model);
        }
    );
    app.put(
        ID_PATH,
        middlewares,
        idToObject(repository),
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
        middlewares,
        idToObject(repository),
        function deleteModel(req, res, next) {
            repository
                .delete(req.model)
                .then(function () {
                    res.status(204).send(null);
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
//     idToObject(repository),
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
//     idToObject(repository, 'user_id', 'user'),
//     function (req, res, next) {
//         res.send(req.user);
//     });
// ```
function idToObject(repository, param, label) {
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

// Middleware used to transform request parameters into a nedb query.
function requestToCriteria() {
    return function (req, res, next) {
        req.where = req.where || {};
        if (req.query.filter) {
            _.each(req.query.filter, function validateKey(value, field) {
                if (_.isObject(value)) {
                    // this is an operator.
                    // See https://github.com/louischatriot/nedb#operators-lt-lte-gt-gte-in-nin-ne-exists-regex
                    // Only accepts the following operators
                    var valid = [
                        '$lt', '$lte',
                        '$gt', '$gte',
                        '$in',
                        '$ne', '$nin',
                        '$exists',
                        '$regex'
                    ];
                    _.each(value, function validateOperator(val, operator) {
                        if (valid.indexOf(operator) < 0) {
                            return ;
                        }
                        req.where[field] = req.where[field] || {};
                        try {
                            req.where[field][operator] = JSON.parse(val);
                        } catch (e) {
                            req.where[field][operator] = val;
                        }
                    });

                } else if (_.isString(value)) {
                    try {
                        req.where[field] = JSON.parse(value);
                    } catch (e) {
                        req.where[field] = value;
                    }
                } else {
                    // do nothing
                }
            });
        }
        next();
    };
}

// fromat and send a collection of documents.
// Up to now, only json is supported.
function sendCollection(req, res, next, status) {
    return function (docs) {
        res.status(status).send(docs);
    };
}

// format and send a single document.
// Up to now, only json is supported.
function sendDocument(req, res, next, status) {
    return function (doc) {
        res.status(status).send(doc);
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

function removeTrailingSlash(url) {
    return url.replace(pathReg, '');
}

if (!module.parent) {
    // Testing.

    [
    {value: '', expected: ''},
    {value: '/', expected: ''},
    {value: '////', expected: ''},
    {value: 'a/', expected: 'a'},
    {value: '/a', expected: '/a'},
    {value: '/a//', expected: '/a'},
    {value: '/a/b', expected: '/a/b'},
    {value: '/a/b//', expected: '/a/b'},
    ].forEach(function testRemoveTrailingSlashes(test) {
        var result = removeTrailingSlash(test.value);
        if (result === test.expected) {
            return console.log('OK  Parsed %s', test.value);
        } else {
            console.log(result);
            return console.error('KO  Wrong answer for %s. received %s, expected %s', test.value, result, test.expected);
        }
    });
}
