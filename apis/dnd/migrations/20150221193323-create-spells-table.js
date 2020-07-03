var dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('spells', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
        school: 'string',
        level: 'int',
        action: 'string',
        range: 'string',
        components: 'string',
        duration: 'string',
        classes: 'string',
        description: 'text'
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('spells', callback);
};
