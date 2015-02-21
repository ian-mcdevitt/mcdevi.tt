var dbconfig = require('../database.json');
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

    return {
        spells: spells,
        creatures: creatures
    };
};

exports['@singleton'] = true;

