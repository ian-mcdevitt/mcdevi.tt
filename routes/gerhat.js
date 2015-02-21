/*
 * Serve JSON to our AngularJS client
 */
var express = require('express');
var router = express.Router();

var dndController = require('../controllers/dnd')();
var password = require('../controllers/password')();

router.post(
    '/rsvp',
    dndController.spells
);

router.get(
    '/creatures',
    password.protect,
    dndController.creatures
);


module.exports = router;
