var express = require('express');
var app = express();
var path = require('path');

var rootDir = path.resolve(path.join(__dirname, '..', '..'));
var wwwPublicDir = path.join(rootDir, 'public');
app.use('/', express.static(wwwPublicDir));

module.exports = app;
