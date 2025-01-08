const { Player } = require('./Player');
const { Bow } = require('../weapons/Bow');

class Archer extends Player {
    constructor(position, name) {
        super(position, name);
        this.weapon = new Bow();
    }

    tryAttack(enemy) {
        if (Math.abs(this.position - enemy.position) <= this.weapon.range) {
            enemy.takeDamage(this.weapon.getDamage());
        }
    }
}

module.exports = { Archer };