var path = require('path');
var root = path.resolve(__dirname, '..', 'data');

var expressUsers    = require('express-users');

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

config.users   = expressUsers({
    store: 'nedb',
    nedb: {
        filename: path.join(config.data.databases, 'users.db')
    },
    data: [
        {username: 'julien', pwd: 'pwd', email: 'mail@domain.ext'}
    ]
});

