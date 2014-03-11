var Promise = require('es6-promise').Promise;
var db = require('../db').classifieds;


var repository = module.exports = {
    findOne: function (id) {
        return new Promise(function(resolve, reject) {
            db.findOne({_id: ensureId(id)}, function (err, doc) {
                if (err) return reject(err);
                resolve(doc);
            });
        });
    },

    findAll: function (filter) {
        return new Promise(function(resolve, reject) {
            db.find(filter || {}).sort({updated_at: -1}).exec(function (err, docs) {
                if (err) return reject(err);
                resolve(docs);
            });
        });
    },

    update: function (doc, newValues) {
        return new Promise(function (resolve, reject) {
            if (!doc.created_at) newValues.created_at = new Date();
            newValues.updated_at = new Date();
            db.update({_id: ensureId(doc)}, { $set: newValues }, {}, function (err, nbInsert) {
                if (err) return reject(err);
                resolve();
            });
        })
        .then(function () {
            return repository.findOne(doc);
        });
    },

    insert: function(doc) {
        return new Promise(function (resolve, reject) {
            doc.created_at = new Date();
            doc.updated_at = new Date();
            db.insert(doc, function (err, newDoc) {
                if (err) return reject(err);
                resolve(newDoc);
            });
        });
    },

    delete: function (doc) {
        var self = this;
        return this
            .findOne(doc)
            .then(function (dbDoc) {
                if (!dbDoc.deleted_at) {
                    return self.softDelete(doc);
                } else {
                    return self.hardDelete(doc);
                }
            });
    },

    softDelete: function (doc) {
        return this.update(doc, {deleted_at: new Date()});
    },

    hardDelete: function (doc) {
        return new Promise(function (resolve, reject) {
            db.remove({_id: ensureId(doc)}, {multi: false}, function (err, newDoc) {
                if (err) return reject(err);
                resolve(newDoc);
            });
        });
    },

    findByLink: function (links) {
        if (!links.forEach) {
            links = [links];
        }
        return new Promise(function (resolve, reject) {
            db.find({ link: {$in: links} }, function (err, docs) {
                if (err) return reject(err);
                resolve(docs);
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
