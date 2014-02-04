var config = require('../../config');
var Datastore = require('nedb'),
    db = new Datastore({ filename: config.data.databases + '/classified.db', autoload: true });

module.exports = db;
