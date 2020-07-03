var dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.changeColumn('spells', 'components', { type: 'text' }, callback);
};

exports.down = function(db, callback) {
    db.changeColumn('spells', 'components', { type: 'varchar', length: 255 }, callback);
};
