var express = require('express');
var router = express.Router();
var http = require('http-request');

router.get('/*', function(req, res, next) {
    // Pick either get or post, but not GET or POST
    var method = req.method.toLowerCase()
    http[method]({ url: 'http://mcdevi.tt:4567' + req.url }, function(error, result) {
        // Set it to text/html, because browsers will know that an image with that content type is an image
        // They won't know that HTML with `application/octet-stream` is HTML
        res.set('Content-Type', 'text/html');
        res.send(result.buffer);
    });

});

module.exports = router;
