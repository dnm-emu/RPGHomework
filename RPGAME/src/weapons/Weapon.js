class Weapon {
    constructor(name, attack, durability, range) {
        this.name = name;
        this.attack = attack;
        this.durability = durability;
        this.range = range;
    }

    takeDamage(amount) {
        this.durability = Math.max(this.durability - amount, 0);
    }

    getDamage() {
        return this.durability > 30 ? this.attack : this.attack / 2;
    }

    isBroken() {
        return this.durability === 0;
    }
}

module.exports = { Weapon };