var path = require('path');
var root = path.resolve(__dirname, '..', 'data');
console.log('-------------------->');
console.log('Data store: "%s"', root);
console.log('-------------------->');

module.exports = {
    "data": {
        "dir": root,
        "screenshots": root+"/screenshots",
        "databases": root+"/databases"
    }
};
