var express = require('express');
var path = require('path');
var app = express();
var main = require('./index');

var rootDir = path.resolve(path.join(__dirname, '..', '..'));
var wwwPublicDir = path.join(rootDir, 'public');
var wwwJsDir = path.join(rootDir, 'src/www');
var wwwVendorDir = path.join(rootDir, 'bower_components');


app.use(express.logger('dev'));

app.use(main);
app.use('/', express.static(wwwPublicDir));
app.use('/js', express.static(wwwJsDir));
app.use('/vendor', express.static(wwwVendorDir));

// I want to place any static content here
// but I want to define the location of these static content in `grunt-express` options like so:
//
// grunt.initConfig({
//  express: {
//    livereloadServer: {
//      server: path.resolve(__dirname, 'server'),
//      bases: [path.resolve(__dirname, 'public'), path.resolve(__dirname, '.tmp')],
//      livereload: true,
//      serverreload: true
//    },
//    productionServer: {
//      server: path.resolve(__dirname, 'server'),
//      bases: path.resolve(__dirname, 'dist')
//    }
//  }
// });
// Notice the name of the following middleware function
app.use(function staticsPlaceholder(req, res, next) {
  return next();
});


// here is where I want my dynamic middlewares be loaded
app.use(function middlewarePlaceholder(req, res, next) {
  return next();
});

module.exports = app;
