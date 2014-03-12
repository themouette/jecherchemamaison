var express = require('express');
var app = express();

app.use(express.static('public'));

var api = require('../api/app');
app.use('/api', api);

module.exports = app;

if (!module.parent) {
    var port = app.get('port') || process.env.PORT || 8080;
    app.listen(port);
    console.log('Express started on port '+port);
}
