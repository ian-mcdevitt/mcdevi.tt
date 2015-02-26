var dbconfig = require('./database.json');
var knex = require('knex')(dbconfig[process.env.NODE_ENV || 'development'].knex);

exports = module.exports = function( ) {

    function spells(req, res, next) {
        knex('spells').select('*').then(function(results) {
            return res.send(results);
        });
    }

    function creatures(req, res, next) {
        knex('creatures').select('*').then(function(results) {
            return res.send(results);
        });
    }

    function requirePassword(req, res, next) {
        if(req.session.isAuthenticated) {
            return next();
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

    function checkSession(req, res, next) {
        res.send(!!req.session.isAuthenticated);
    }

    return {
        spells: spells,
        creatures: creatures,
        requirePassword: requirePassword,
        checkSession: checkSession
    };
};

exports['@singleton'] = true;

