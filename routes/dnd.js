/*
 * Serve JSON to our AngularJS client
 */
var dbconfig = require('../database.json');
var knex = require('knex')(dbconfig[process.env.NODE_ENV || 'development'].knex);
var express = require('express');
var router = express.Router();

var dndController = require('../controllers/dnd')();

router.get(
    '/spells',
    dndController.spells
);

router.get(
    '/creatures',
    dndController.creatures
);


module.exports = router;
