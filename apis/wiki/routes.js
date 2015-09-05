var express = require('express');
var router = express.Router();
var http = require('http-request');

router.get('/*', function(req, res, next) {
    // Pick either get or post, but not GET or POST
    var method = req.method.toLowerCase()
    http[method]({ url: 'http://mcdevi.tt:4567' + req.url }, function(error, result) {
        if(req.url.indexOf('.css') !== -1) {
            res.set('Content-Type', 'text/css');
        } else {
            res.set('Content-Type', 'text/html');
        }
        res.send(result.buffer);
    });
});

module.exports = router;
