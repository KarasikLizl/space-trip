import Phaser from 'phaser';

export const gameSettings: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
};

export const playerSettings = {
    scaleStep: .01,
    satietyStep: .1,
    width: 75,
    height: 75,
    startX: 300,
    startY: 300,
    startSpeed: 150,
    startHealth: 25,
};
export const foodSettings = {
    minSaturation: 10,
    maxSaturation: 25,
    width: 50,
    height: 50,
};
export const enemySettings = {};