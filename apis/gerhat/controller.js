var dbconfig = require('./database.json');
var knex = require('knex')(dbconfig[process.env.NODE_ENV || 'development'].knex);

exports = module.exports = function( ) {

    function showrsvp(req, res, next) {
        knex('invitations').where('password', req.params.password).limit(1).then(function(invitation) {
            if(invitation.length === 0) {
                return res.status(401);
            }
            invitation = invitation[0];
            knex('guests').where('invitationId', invitation.id).then(function(guests) {
                if(guests.length === 0) {
                    return res.status(500);
                }
                invitation.guests = guests;
                return res.send(invitation);
            });
        });
    }

    return {
        showrsvp: showrsvp
    };
};

exports['@singleton'] = true;

