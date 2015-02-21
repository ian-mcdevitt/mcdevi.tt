var dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('creatures', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        data: 'text', // It's JSON, MySQL doesn't do JSON, it's getting stringified.
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('creatures', callback);
};
