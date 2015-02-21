/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

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

    if (/^www/.test(host)) {
        return res.redirect(protocol + '://' + host.replace(/^www\./, '') + req.url);
    }

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

// Serve domain-specific index (views/:domain/index.jade)
app.get('/:domain/', function(req, res){
    res.render(req.params.domain + '/index');
});
// Serve domain-specific partials
app.get('/:domain/partials/:name', function (req, res) {
    res.render(req.params.domain + '/partials/' + req.params.name);
});

// JSON API
app.get('/:domain/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res) {
    // TODO: Serve a friendly list of subdomains
    res.send(200);
});


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
