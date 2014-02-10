var express = require('express');
var path = require('path');
var app = express();


var main = require('./index');
app.use(main);


module.exports = app;
if (!module.parent) {
    var port = app.get('port') || process.env.PORT || 8080;
    app.listen(port);
    console.log('Express started on port '+port);
}
