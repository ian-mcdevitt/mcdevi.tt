var dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('invitations', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
        accomodations: 'string',
        password: 'string'
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('invitations', callback);
};
