class Player {
    constructor(position, name) {
        this.position = position;
        this.name = name;
        this.life = 100;
        this.weapon = null;
    }

    takeDamage(amount) {
        this.life = Math.max(this.life - amount, 0);
    }

    isDead() {
        return this.life === 0;
    }

    moveRight(distance) {
        this.position += distance;
    }

    moveLeft(distance) {
        this.position -= distance;
    }

    getLuck() {
        return Math.random();
    }
}

module.exports = { Player };