var Datastore = require('nedb'),
    db = new Datastore({ filename: __dirname + '/data/classified.db', autoload: true });

module.exports = db;
