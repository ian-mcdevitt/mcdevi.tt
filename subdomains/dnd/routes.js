/*
 * Serve JSON to our AngularJS client
 */
var express = require('express');
var router = express.Router();

var dndController = require('./controller')();

router.get(
    '/spells',
    dndController.requirePassword,
    dndController.spells
);

router.get(
    '/creatures',
    dndController.requirePassword,
    dndController.creatures
);

router.get(
    '/check-session',
    dndController.checkSession
);

module.exports = router;
