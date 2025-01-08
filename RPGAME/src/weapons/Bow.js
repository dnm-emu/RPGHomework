const { Weapon } = require('./Weapon');

class Bow extends Weapon {
    constructor() {
        super('Bow', 10, 100, 3);
    }
}

module.exports = { Bow };