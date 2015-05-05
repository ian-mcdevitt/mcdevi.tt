var express = require('express');
var router = express.Router();

router.all('', function(req, res) {
    res.redirect(301, 'http://www.chelsealynphotography.com');
});

module.exports = router;
