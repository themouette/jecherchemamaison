var Promise = require('es6-promise').Promise;
var db = require('./db').classifieds;


module.exports = {
    findOne: function (id) {
        return new Promise(function(resolve, reject) {
            db.findOne({_id: id}, function (err, doc) {
                if (err) return reject(err);
                resolve(doc);
            });
        });
    },

    findAll: function () {
        return new Promise(function(resolve, reject) {
            db.find({}, function (err, docs) {
                if (err) return reject(err);
                resolve(docs);
            });
        });
    },

    update: function (doc, newValues) {
        return new Promise(function (resolve, reject) {
            db.update({_id: ensureId(doc)}, newValues, {}, function (err, newDoc) {
                if (err) return reject(err);
                resolve(newDoc);
            });
        });
    },

    insert: function(doc) {
        return new Promise(function (resolve, reject) {
            db.insert(doc, function (err, newDoc) {
                if (err) return reject(err);
                resolve(newDoc);
            });
        });
    },

    delete: function (doc) {
        return new Promise(function (resolve, reject) {
            db.remove({_id: ensureId(doc)}, {multi: false}, function (err, newDoc) {
                if (err) return reject(err);
                console.log('inserted');
                resolve(newDoc);
            });
        });
    }
};

function ensureId(doc) {
    if (typeof doc === "object" && "_id" in doc) {
        return doc._id;
    }
    return doc;
}
