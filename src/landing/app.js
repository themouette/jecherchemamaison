var Router          = require('express').Router;
var config          = require('../config');

var router = module.exports = new Router();

router.get('/', function index(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/app');
    }

    res.render('landing/index.html');
});

router.get('/cookie-optout', function cookieOptout(req, res, next) {
    res.render('landing/cookieOptout.html');
});
