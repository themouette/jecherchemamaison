var path = require('path')
var root = path.resolve(__dirname, '..', 'data');
module.exports = {
    "data": {
        "dir": root,
        "screenshots": root+"/screenshots",
        "databases": root+"/databases"
    }
};
