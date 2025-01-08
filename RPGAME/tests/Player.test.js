const { Player } = require('../src/players/Player');

test('Player cannot have negative life', () => {
    const player = new Player(0, 'Hero');
    player.takeDamage(200);
    expect(player.life).toBe(0);
});