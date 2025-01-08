const { Weapon } = require('../src/weapons/Weapon');

test('Weapon durability cannot go below zero', () => {
    const weapon = new Weapon('Sword', 25, 10, 1);
    weapon.takeDamage(20);
    expect(weapon.durability).toBe(0);
});