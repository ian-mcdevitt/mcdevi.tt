var dbconfig = require('../database.json');
var knex = require('knex')(dbconfig[process.env.NODE_ENV || 'development'].knex);

exports = module.exports = function( ) {

    function protect(req, res, next) {
        knex('password').select('password').then(function(results) {
            if(results[0].password === req.query.password) {
                next();
            } else {
                res.send(401);
            }
        });
    }
    return {
        protect: protect
    };
};

exports['@singleton'] = true;

