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
                mailer.sendMail(rsvpEmail(req.body));
                return res.send(200);
            });
        })
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
            mailer.sendMail(contributionEmail(req.body));
            return res.send(200);
        });
    }

    function getStats(req, res, next) {
        var friday = 0;
        var saturday = 0;
        var sunday = 0;
        var food = {
            beef: 0,
            chicken: 0,
            seafood: 0
        };
        knex.select('*').from('invitations')
        .then(function(results) {
            var string = '              Name              |    RSVP    |   Friday   |  Saturday  |   Sunday   ' + '\n';
            results.forEach(function(invitation) {
                if(invitation.id == 999) return;
                friday += +invitation.friday;
                saturday += +invitation.saturday;
                sunday += +invitation.sunday;
                string += padLength(invitation.name, 32) + '|' + (invitation.friday !== null ? '      Y     ' : '            ') + '|' + (invitation.friday ? '      Y     ' : '            ') + '|' + (invitation.saturday ? '      Y     ' : '            ') + '|' + (invitation.sunday ? '      Y     ' : '            ') + '\n';
            });
            string += '\n\nTotals:';
            string += '\nFriday: ' + friday;
            string += '\nSaturday: ' + saturday;
            string += '\nSunday: ' + sunday;
            knex.select('*').from('guests')
            .then(function(results) {
                results.forEach(function(guest) {
                    if(guest.entree) {
                        food[guest.entree]++;
                    }
                });
                string += '\n';
                string += '\nBeef: ' + food.beef;
                string += '\nChicken: ' + food.chicken;
                string += '\nSeafood: ' + food.seafood;
                res.send(string);
            });
        });
    }

    function padLength(string, targetLength) {
        return (string + Array(targetLength).join(' ')).substring(0, targetLength);
    }

    function rsvpEmail(invitation) {
        var accomodations = {
            'group_rates': 'Would like help with group rates',
            'own_accomodations': 'Will be securing own accomodations',
            'same_day': 'Will be traveling same day'
        };
        var email = baseEmail();
        email.subject = invitation.name + ' just RSVP\'d!';
        email.html = invitation.name + ' just RSVP\'d!<p><b>Accomodations:</b> ' + accomodations[invitation.accomodations] + '</p>';
        if(invitation.accomodations == 'group_rates') {
            email.html += ''
                + '<p><b>Staying Friday night?</b> ' + (invitation.friday ? 'Yes' : 'No') + '</p>'
                + '<p><b>Staying Saturday night?</b> ' + (invitation.saturday ? 'Yes' : 'No') + '</p>'
                + '<p><b>Staying Sunday night?</b> ' + (invitation.sunday ? 'Yes' : 'No') + '</p>';

        }
        invitation.guests.forEach(function(guest) {
            var attendance;
            if(guest.attending == null) {
                attendance = 'has not specified if they are'
            } else if(guest.attending == "1") {
                attendance = 'is'
            } else {
                attendance = 'is not'
            }
            email.html += '<hr><p><b>' + guest.name + '</b> ' + attendance + ' attending' + (guest.attending ? ' and requests the ' + guest.entree : '') + '.</p>';
        });
        if( invitation.comments ) {
            email.html += '<hr><p><b>Comments:</b> ' + invitation.comments + '</p>';
        }
        return email;
    }

    function contributionEmail(contribution) {
        var email = baseEmail();
        email.subject = contribution.name + ' just offered to contribute!'
        email.html = contribution.name + ' just offered to contribute!<p><b>Their message:</b> ' + contribution.contribution + '</b></p>';
        return email;
    }

    function baseEmail() {
        return {
            from:    'gerhat@mcdevi.tt',
            to:      'ian@mcdevi.tt, stephanie.gerhat@gmail.com',
        };
    }

    return {
        showrsvp: showrsvp,
        updatersvp: updatersvp,
        getContributions: getContributions,
        saveContribution: saveContribution,
        getStats: getStats
    };
};

exports['@singleton'] = true;

