var path = require('path');
var root = path.resolve(__dirname, '..', 'data');

console.log('-------------------->');
console.log('Data store: "%s"', root);
console.log('-------------------->');

var config = module.exports = {
    "data": {
        "dir": root,
        "screenshots": root+"/screenshots",
        "databases": root+"/databases"
    }
};

var expressUsers    = require('express-users');
config.users   = expressUsers({
    store: 'nedb',
    nedb: {
        fileName: path.join(config.data.databases, 'users')
    }
});

