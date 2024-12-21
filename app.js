class Weapon {
    constructor(name, attack, durability, range) {
        this.name = name;
        this.attack = attack;
        this.durability = durability;
        this.range = range;
    }
    takeDamage(damage) {
        this.durability -= damage;
    }
    getDamage() {
        return this.attack;
    }
    isBroken() {
        return this.durability <= 0;
    }
}

class Player {
    constructor(name, life, attack, luck, weapon, elementId) {
        this.name = name;
        this.maxLife = life; // добавим максимальное здоровье
        this.life = life;
        this.attack = attack;
        this.luck = luck;
        this.weapon = weapon;
        this.elementId = elementId;
        this.position = 0;
    }
    reset() {
        this.life = this.maxLife; // сбрасываем здоровье
        this.weapon.durability = this.weapon.durability; // восстанавливаем оружие
        document.getElementById(`${this.elementId}-life`).innerText = this.life;
    }
    getDamage() {
        return this.weapon ? this.weapon.getDamage() + this.attack : this.attack;
    }
    takeDamage(damage) {
        if (this.isAttackBlocked()) {
            logBattle(`${this.name} blocked the attack!`);
            return;
        }
        if (this.dodged()) {
            logBattle(`${this.name} dodged the attack!`);
            return;
        }
        this.life -= damage;
        document.getElementById(`${this.elementId}-life`).innerText = this.life;
        this.showDamageEffect();
    }
    showDamageEffect() {
        const playerElement = document.getElementById(this.elementId);
        playerElement.classList.add('damaged');
        setTimeout(() => playerElement.classList.remove('damaged'), 500);
    }
    isDead() {
        return this.life <= 0;
    }
    tryAttack(target) {
        if (!this.weapon.isBroken()) {
            logBattle(`${this.name} attacks ${target.name} with ${this.weapon.name}`);
            target.takeDamage(this.getDamage());
        } else {
            logBattle(`${this.name}'s weapon is broken!`);
        }
    }
    isAttackBlocked() {
        return Math.random() < 0.2;
    }
    dodged() {
        return Math.random() < this.luck / 100;
    }
    moveLeft() {
        this.position -= 1;
        logBattle(`${this.name} moved left.`);
    }
    moveRight() {
        this.position += 1;
        logBattle(`${this.name} moved right.`);
    }
    move() {
        Math.random() > 0.5 ? this.moveLeft() : this.moveRight();
    }
    checkWeapon() {
        if (this.weapon.isBroken()) {
            logBattle(`${this.name}'s weapon is broken and cannot attack.`);
        }
    }
    chooseEnemy(players) {
        const aliveEnemies = players.filter(p => !p.isDead() && p !== this);
        return aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    }
    moveToEnemy(enemy) {
        logBattle(`${this.name} moves towards ${enemy.name}`);
    }
    async turn(players) {
        if (this.isDead()) return;
        const enemy = this.chooseEnemy(players);
        this.move();
        this.moveToEnemy(enemy);
        this.checkWeapon();
        this.tryAttack(enemy);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

function logBattle(message) {
    const log = document.getElementById('battle-log');
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight;
}

async function play(players) {
    logBattle('The battle begins!');
    let round = 1;
    while (players.filter(p => !p.isDead()).length > 1) {
        logBattle(`--- Round ${round} ---`);
        for (let player of players) {
            await player.turn(players);
        }
        round++;
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    const winner = players.find(player => !player.isDead());
    logBattle(`🏆 ${winner.name} wins the battle!`);
}

function resetGame() {
    // Сбрасываем здоровье всех игроков и запускаем бой заново
    const players = [
        new Player('Knight', 100, 20, 10, new Weapon('Sword', 15, 5, 1), 'player1'),
        new Player('Barbarian', 120, 25, 5, new Weapon('Axe', 20, 4, 1), 'player2'),
        new Player('Archer', 90, 15, 20, new Weapon('Bow', 10, 6, 3), 'player3'),
        new Player('Mage', 80, 30, 15, new Weapon('Staff', 25, 3, 2), 'player4')
    ];
    
    // Сбрасываем состояния игроков
    players.forEach(player => player.reset());
    // Запускаем новый бой
    play(players);
}

document.getElementById('start-battle').addEventListener('click', resetGame);
