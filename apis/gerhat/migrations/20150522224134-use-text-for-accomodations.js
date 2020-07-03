var dbm = require('db-migrate');
var type = dbm.dataType;
var fs = require('fs');

exports.up = function(db, callback) {
    fs.readFile(__dirname + '/sql/20150522224134-use-text-for-accomodations.sql', function(err, data) {
        if(err) { callback(err); return; }
        db.runSql(data.toString(), callback);
    });
};

exports.down = function(db, callback) {
    db.runSql('TRUNCATE TABLE guests;', callback);
};
