function play(players) {
    while (players.filter(player => !player.isDead()).length > 1) {
        for (let player of players) {
            if (player.isDead()) continue;
            const enemies = players.filter(p => p !== player && !p.isDead());
            if (enemies.length === 0) break;

            const enemy = enemies[0];
            player.tryAttack(enemy);
        }
    }

    return players.find(player => !player.isDead());
}

module.exports = { play };