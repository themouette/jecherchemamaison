var express = require('express');
var path = require('path');
var app = express();


// FIXME ther should bea way to read grunt/config.json

// serve bower components if exists
app.use('/vendors', express.static('bower_components'));
// Then application
var main = require('./index');
app.use(main);
// Finally, js www sources
app.use('/js', express.static('src/www'));


module.exports = app;
if (!module.parent) {
    var port = app.get('port') || process.env.PORT || 8080;
    app.listen(port);
    console.log('Express started on port '+port);
}
