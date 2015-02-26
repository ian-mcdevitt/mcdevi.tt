/*
 * Serve JSON to our AngularJS client
 */
var express = require('express');
var router = express.Router();

var weddingController = require('../controllers/gerhat')();

router.get(
    '/rsvp/:password',
    weddingController.showrsvp
);

module.exports = router;
