var path            = require('path');

var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var methodOverride  = require('method-override');
var session         = require('express-session');
var flash           = require('connect-flash');
var passport        = require('passport');

var config          = require('../config');

var api     = require('../api/app');
var users   = config.users;


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
    .use(session({
            resave: false, // don't save session if unmodified
            saveUninitialized: false, // don't create session until something stored
            secret: 'shhhh, very secret'
        }))
    // setup flash
    .use(flash())
    // add passport
    .use(passport.initialize())
    .use(passport.session());

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

app
    .use(express.static('public'))
    .use(users)
    .use('/api', users.requireAuthentication(), api);

module.exports = app;

if (!module.parent) {
    var port = app.get('port') || process.env.PORT || 8080;
    app.listen(port);
    console.log('Express started on port '+port);
}
