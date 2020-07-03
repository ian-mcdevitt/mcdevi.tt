var dbm = require('db-migrate');
var type = dbm.dataType;
var fs = require('fs');

exports.up = function(db, callback) {
    fs.readFile(__dirname + '/sql/20150225222728-add-invitation-data.sql', function(err, data) {
        if(err) { callback(err); return; }
        db.runSql(data.toString(), callback);
    });
};

exports.down = function(db, callback) {
    db.runSql('TRUNCATE TABLE invitations;', callback);
};
