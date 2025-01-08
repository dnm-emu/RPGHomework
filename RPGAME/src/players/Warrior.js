const { Player } = require('./Player');
const { Sword } = require('../weapons/Sword');

class Warrior extends Player {
    constructor(position, name) {
        super(position, name);
        this.weapon = new Sword();
    }

    tryAttack(enemy) {
        if (Math.abs(this.position - enemy.position) <= this.weapon.range) {
            enemy.takeDamage(this.weapon.getDamage());
        }
    }
}

module.exports = { Warrior };