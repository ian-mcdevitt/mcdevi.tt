var dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('guests', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        invitationId: 'int',
        isGuest: 'boolean',
        name: 'string',
        attending: 'boolean',
        entree: 'string'
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('guests', callback);
};
