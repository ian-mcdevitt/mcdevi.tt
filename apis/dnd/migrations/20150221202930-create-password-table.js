var dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('password', {
        password: 'string',
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('password', callback);
};
