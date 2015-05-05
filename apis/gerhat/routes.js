/*
 * Serve JSON to our AngularJS client
 */
var express = require('express');
var router = express.Router();

var weddingController = require('./controller')();

router.get(
    '/rsvp/:password',
    weddingController.showrsvp
);

module.exports = router;
