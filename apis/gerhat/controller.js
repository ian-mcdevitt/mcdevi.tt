var dbconfig = require('./database.json');
var knex = require('knex')(dbconfig[process.env.NODE_ENV || 'development'].knex);
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

exports = module.exports = function( ) {

    function showrsvp(req, res, next) {
        knex('invitations').where('password', req.params.password).limit(1)
        .then(function(invitation) {
            if(invitation.length === 0) {
                return res.send(401);
            }
            invitation = invitation[0];
            knex('guests').where('invitationId', invitation.id)
            .then(function(guests) {
                if(guests.length === 0) {
                    return res.send(500);
                }
                invitation.guests = guests;
                return res.send(invitation);
            });
        });
    }

    function updatersvp(req, res, next) {
        var guests = req.body.guests;
        var invitation = _.omit(req.body, 'guests');
        knex('invitations').update(_.pick(invitation, 'accomodations', 'friday', 'saturday', 'sunday', 'comments')).where('password', req.params.password).limit(1)
        .then(function(result) {
            if(!result) return res.send(401);
            q.all(_.map(guests, function(guest) {
                return knex('guests').update(guest).where('id', guest.id);
            })).then(function(result) {
                mailer.sendMail(rsvpMessage(req.body));
                return res.send(200);
            });
        })
    }

    function rsvpMessage(invitation) {
        var accomodations = {
            'group_rates': 'Would like help with group rates',
            'own_accomodations': 'Will be securing own accomodations',
            'same_day': 'Will be traveling same day'
        }
        var email = {
            from:    'gerhat@mcdevi.tt',
            to:      'ian@mcdevi.tt, stephanie.gerhat@gmail.com',
            subject: invitation.name + ' just RSVP\'d!',
            html:    invitation.name + ' just RSVP\'d!'
        };
        email.html += '<p><b>Accomodations:</b> ' + accomodations[invitation.accomodations] + '</p>';
        if(invitation.accomodations == 'group_rates') {
            email.html += ''
                + '<p><b>Staying Friday night?</b> ' + (invitation.friday ? 'Yes' : 'No') + '</p>'
                + '<p><b>Staying Saturday night?</b> ' + (invitation.saturday ? 'Yes' : 'No') + '</p>'
                + '<p><b>Staying Sunday night?</b> ' + (invitation.sunday ? 'Yes' : 'No') + '</p>';

        }
        invitation.guests.forEach(function(guest) {
            email.html += '<hr><p><b>' + guest.name + '</b> is ' + (guest.attending ? '' : 'not ') + 'attending' + (guest.attending ? ' and requests the ' + guest.entree : '') + '.</p>';
        });
        if( invitation.comments ) {
            email.html += '<hr><p><b>Comments:</b> ' + invitation.comments + '</p>';
        }
        return email;
    }

    function getContributions(req, res, next) {
        knex.select('*').from('contributions')
        .then(function(result) {
            res.send(200, result);
        });
    }

    function saveContribution(req, res, next) {
        knex('contributions').insert(_.pick(req.body, 'name', 'contribution'))
        .then(function(result) {
            if(!result) return res.send(500);
            return res.send(200);
        });
    }

    return {
        showrsvp: showrsvp,
        updatersvp: updatersvp,
        getContributions: getContributions,
        saveContribution: saveContribution
    };
};

exports['@singleton'] = true;

