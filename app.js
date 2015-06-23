/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    session = require('express-session'),
    morgan = require('morgan'),
    http = require('http'),
    path = require('path');

var apis = [
    'ian',
    'dnd',
    'gerhat',
    'chelsea'
];

var app = module.exports = express();

/**
 * Configuration
 */

// Sessions
app.use(session({ secret: 'oFdZVFwCMsRlNKXbrZr4PC7XZI1QRHRbXcFFMLmu', cookie: {maxAge: 1000 * 60 * 60 * 24 * 30 }}));

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
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
 * Homebrewed Subdomain API Middleware
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

apis.forEach(function(api) {
    app.use('/' + api + '/', require('./apis/' + api + '/routes'));
});

// Serve domain-specific index (views/:api/index.jade)
app.get('/:api/', function(req, res) {
    // TODO: Check to see if index actually exists, next() if not
    res.sendfile('public/' + req.params.api.replace('.', '') + '/index.html');
});

app.get('/:api/public/vendor/*', function(req, res) {
    res.sendfile('public/vendor/' + req.params[0].replace('../', ''));
});

app.get('/:api/public/*', function(req, res) {
    res.sendfile('public/' + req.params.api + '/' + req.params[0].replace('../', ''));
});

app.get('/:api/*', function(req, res) {
    res.redirect((req.socket.encrypted ? 'https' : 'http') + '://' + req.headers.host);
});

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
