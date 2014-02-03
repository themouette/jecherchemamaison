var express = require('express');
var app = express();
var path = require('path');
var api = require('./api/app');

var rootDir = path.resolve(path.join(__dirname, '..', '..'));
var wwwPublicDir = path.join(rootDir, 'public');

app.use('/', express.static(wwwPublicDir));
app.use('/api', api);

module.exports = app;

if (!module.parent) {
    var port = app.get('port') || process.env.PORT || 8080;
    app.listen(port);
    console.log('Express started on port '+port);
}
