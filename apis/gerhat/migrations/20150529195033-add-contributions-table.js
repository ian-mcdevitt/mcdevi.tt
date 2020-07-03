var dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('contributions', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'text',
        contribution: 'text'
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('contributions', callback);
};
