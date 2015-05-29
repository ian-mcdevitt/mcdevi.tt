var express = require('express');
var router = express.Router();

router.all('*', function(req, res) {
    res.redirect(301, 'http://www.chelsealynphotography.com' + req.url);
});

module.exports = router;
