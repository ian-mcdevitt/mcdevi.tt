/*
 * Serve JSON to our AngularJS client
 */
var dbconfig = require('../database.json');
var knex = require('knex')(dbconfig[process.env.NODE_ENV || 'development'].knex);


exports.name = function (req, res) {
    res.json({
        name: 'Bob'
    });
};
