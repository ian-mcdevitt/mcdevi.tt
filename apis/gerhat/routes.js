/*
 * Serve JSON to our AngularJS client
 */
var express = require('express');
var router = express.Router();

var weddingController = require('./controller')();

router.get(
    '/rsvp',
    function(req, res) {
        res.send(401);
    }
);
router.get(
    '/rsvp/:password',
    weddingController.showrsvp
);

router.post(
    '/rsvp/:password',
    weddingController.updatersvp
)

module.exports = router;
