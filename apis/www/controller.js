var dbconfig = require('./database.json')[process.env.NODE_ENV || 'development'];
var knex = require('knex')({client: dbconfig.driver, connection: dbconfig});
var _ = require('underscore');
var q = require('q');
var nodemailer = require('nodemailer');

var mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports = module.exports = function() {

    return {};
};

exports['@singleton'] = true;

