/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    http = require('http'),
    path = require('path');

var subdomains = [
    {
        name: 'dnd',
        router: require('./routes/dnd')
    }
];

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
    app.use(errorHandler());
}

// production only
if (env === 'production') {
    // TODO
}


/**
 * Homebrewed Subdomain Middleware
 */
app.use(function(req, res, next) {
    // get host & protocol
    var host = req.headers.host,
        protocol = req.socket.encrypted ? 'https' : 'http';

    // test for subdomain
    var matches = host.match(new RegExp('(.*).mcdevi.(?:dev|tt)'));
    // subdomain
    if (matches && matches.length === 2) {
        req.url = '/' + matches[1] + req.url;
        next();
    } else {
        req.url = '/www' + req.url;
        next();
    }
});

/**
 * Routes
 */

subdomains.forEach(function(subdomain) {
    app.use('/' + subdomain.name + '/', subdomain.router);
});

// Serve domain-specific index (views/:subdomain/index.jade)
app.get('/:subdomain/', function(req, res) {
    // TODO: Check to see if index actually exists, next() if not
    res.sendfile('index/' + req.params.subdomain.replace('.', '') + '.html');
});

app.get('/:subdomain/public/*', function(req, res) {
    res.sendfile('public/' + req.params.subdomain + '/' + req.params[0].replace('../', ''));
});


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
