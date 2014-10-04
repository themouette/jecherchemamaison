var Router          = require('express').Router;
var users           = require('../config').users;

var router = module.exports = new Router();

router.get('/',
    users.requireAuthentication(),
    function dashboard(req, res, next) {

        res.render('dashboard/index.html');
    });
