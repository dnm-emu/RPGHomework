// Weapon class
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

// Player class
class Player {
    constructor(name, life, magic, speed, attack, agility, luck, weapon, elementId) {
        this.name = name;
        this.life = life;
        this.magic = magic;
        this.speed = speed;
        this.attack = attack;
        this.agility = agility;
        this.luck = luck;
        this.weapon = weapon;
        this.elementId = elementId;
    }
    getDamage() {
        return this.weapon ? this.weapon.getDamage() + this.attack : this.attack;
    }
    takeDamage(damage) {
        this.life -= damage;
        document.getElementById(`${this.elementId}-life`).innerText = this.life;
        const playerElement = document.getElementById(this.elementId);
        playerElement.classList.add('damaged');
        setTimeout(() => playerElement.classList.remove('damaged'), 300);
    }
    isDead() {
        return this.life <= 0;
    }
    isAttackBlocked() {
        return Math.random() < this.agility / 100;
    }
    dodged() {
        return Math.random() < this.luck / 100;
    }
    tryAttack(target) {
        if (this.weapon && !this.weapon.isBroken()) {
            target.takeDamage(this.getDamage());
            logBattle(`${this.name} атаковал ${target.name} и нанёс ${this.getDamage()} урона.`);
        } else {
            logBattle(`${this.name} не может атаковать, оружие сломано!`);
        }
    }
}

// Battle log
function logBattle(message) {
    const log = document.getElementById('battle-log');
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight;
}

// Weapons
const weapons = {
    sword: new Weapon('Sword', 10, 100, 1),
    spear: new Weapon('Spear', 12, 80, 2),
    dagger: new Weapon('Dagger', 8, 60, 1),
    axe: new Weapon('Axe', 15, 80, 1),
    hammer: new Weapon('Hammer', 18, 70, 1),
    club: new Weapon('Club', 10, 90, 1)
};

// Battle logic
function play(players) {
    let round = 1;
    const interval = setInterval(() => {
        logBattle(`🔄 **Раунд ${round}**`);
        for (let player of players) {
            if (player.isDead()) continue;
            const enemy = players.find(p => p !== player && !p.isDead());
            if (enemy) {
                player.tryAttack(enemy);
                if (enemy.isDead()) {
                    logBattle(`💀 ${enemy.name} был побеждён!`);
                    clearInterval(interval);
                    logBattle(`🏆 **${player.name} одержал победу!**`);
                    return;
                }
            }
        }
        round++;
    }, 2000);
}

// Start battle
document.getElementById('start-battle').addEventListener('click', () => {
    document.getElementById('battle-log').innerHTML = '';
    const player1Weapon = document.getElementById('player1-weapon').value;
    const player2Weapon = document.getElementById('player2-weapon').value;

    const player1 = new Player('Knight', 100, 50, 10, 15, 8, 5, weapons[player1Weapon], 'player1');
    const player2 = new Player('Barbarian', 120, 30, 8, 20, 5, 3, weapons[player2Weapon], 'player2');

    play([player1, player2]);
});
