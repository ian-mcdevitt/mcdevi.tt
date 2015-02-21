var dbconfig = require('../database.json');
var knex = require('knex')(dbconfig[process.env.NODE_ENV || 'development'].knex);

exports = module.exports = function( ) {

    function protect(req, res, next) {
        if(req.session.isAuthenticated) {
            next();
        }
        knex('password').select('password').then(function(results) {
            if(results[0].password === req.query.password) {
                req.session.isAuthenticated = true;
                next();
            } else {
                res.send(401);
            }
        });
    }

    function check(req, res, next) {
        res.send(!!req.session.isAuthenticated);
    }

    return {
        protect: protect,
        check: check
    };
};

exports['@singleton'] = true;

