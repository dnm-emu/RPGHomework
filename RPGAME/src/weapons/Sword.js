const { Weapon } = require('./Weapon');

class Sword extends Weapon {
    constructor() {
        super('Sword', 25, 100, 1);
    }
}

module.exports = { Sword };