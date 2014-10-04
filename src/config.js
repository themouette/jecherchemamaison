var path = require('path');
var root = path.resolve(__dirname, '..', 'data');

console.log('-------------------->');
console.log('Data stores: "%s"', root);
console.log('-------------------->');

var config = module.exports = {
    "data": {
        "dir": root,
        "screenshots": root+"/screenshots",
        "databases": root+"/databases",
        "views": path.join(__dirname, 'views')
    }
};



var expressUsers    = require('express-users');
config.users   = expressUsers({
    store: 'nedb',
    nedb: {
        filename: path.join(config.data.databases, 'users.db')
    },
    data: [
        {username: 'julien', pwd: 'pwd', email: 'mail@domain.ext'}
    ],
    views: [config.data.views, path.join(config.data.views, 'users')]
});

var session         = require('express-session');
var NedbStore       = require('connect-nedb-session')(session);
config.session = session({ secret: 'shhhh, very secret',
                    key: 'jccm_sess',
                    resave: false, // don't save session if unmodified
                    saveUninitialized: false, // don't create session until something stored
                    cookie: { path: '/',
                             httpOnly: true,
                             maxAge: 365 * 24 * 3600 * 1000,   // One year for example
                             },
                    store: new NedbStore({ filename: path.join(config.data.databases, 'sessions.db') })
                });
