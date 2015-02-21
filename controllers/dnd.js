exports = module.exports = function( ) {

    function spells(req, res, next) {
        return res.send([{'name': 'Magic Missile'}]);
    }

    function creatures(req, res, next) {
        return res.send([{'name': 'Beholder'}]);
    }

    return {
        spells: spells,
        creatures: creatures
    };
};

exports['@singleton'] = true;

