var path            = require('path');

var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var methodOverride  = require('method-override');
var flash           = require('connect-flash');
var nunjucks        = require('nunjucks');

var config          = require('../config');

var users       = config.users;
var api         = require('../api/app');
var landing     = require('../landing/app');
var dashboard   = require('../dashboard/app');


app
    // configure app to use bodyParser()
    // this will let us get the data from a POST
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    // method override from body AND query string
    .use(methodOverride('_method'))
    .use(methodOverride(function(req, res){
            if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                // look in urlencoded POST bodies and delete it
                var method = req.body._method;
                delete req.body._method;
                return method;
            }
        }))
    // use cookie parser
    .use(cookieParser())
    // setup session
    .use(config.session)
    // setup flash
    .use(flash())
    // add passport
    .use(users.passport.initialize())
    .use(users.passport.session());

nunjucks.configure(path.resolve(path.join(__dirname, '..', 'views')), {
  autoescape: true,
  express   : app
});

// A simple middleware adding
// flash messages to template context.
// Simply access flash messages as `flash` variable
app
    .use(function (req, res, next) {
        var messages = {
            error: req.flash('error'),
            success: req.flash('success'),
            info: req.flash('info')
        };
        res.locals.flash  = messages;
        next();
    });

// Set statistics
app.locals.analytics = config.analytics;

if (config.express.serveVendors) {
    app.use('/vendors', express.static('bower_components'));
}

app
    .use(users)
    .use(landing)
    .use('/app', dashboard)
    .use('/api', api)
    // Then compiled assets if exists
    .use('/', express.static('public'))
    ;

if (config.express.serveSrc) {
    app.use('/js', express.static('src/www'));
}

module.exports = app;

if (!module.parent) {
    var port = app.get('port') || process.env.PORT || 8080;
    app.listen(port);
    console.log('Express started on port '+port);
}
