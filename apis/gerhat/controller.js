var dbconfig = require('./database.json');
var knex = require('knex')(dbconfig[process.env.NODE_ENV || 'development'].knex);
var _ = require('underscore');
var q = require('q');

exports = module.exports = function( ) {

    function showrsvp(req, res, next) {
        knex('invitations').where('password', req.params.password).limit(1).then(function(invitation) {
            if(invitation.length === 0) {
                return res.send(401);
            }
            invitation = invitation[0];
            knex('guests').where('invitationId', invitation.id).then(function(guests) {
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
        knex('invitations').update(_.pick(invitation, 'accomodations', 'friday', 'saturday', 'sunday', 'comments')).where('password', req.params.password).limit(1).then(function(result) {
            if(!result) return res.send(401);

            q.all(_.map(guests, function(guest) {
                return knex('guests').update(guest).where('id', guest.id);
            })).then(function(result) {
                res.send(200);
            });
        });
    }

    return {
        showrsvp: showrsvp,
        updatersvp: updatersvp
    };
};

exports['@singleton'] = true;

