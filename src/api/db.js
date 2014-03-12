var config = require('../config');
var Datastore = require('nedb'),
    db = {
        classifieds: new Datastore({ filename: config.data.databases + '/classified.db', autoload: true }),
        messages: new Datastore({ filename: config.data.databases + '/messages.db', autoload: true })
    };

module.exports = db;
