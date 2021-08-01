import Phaser from 'phaser';

const body = document.querySelector('body');
const bodyRect = body?.getBoundingClientRect();
export const gameSettings: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: bodyRect?.width || 0,
    height: bodyRect?.height || 0,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
};

export const playerSettings = {
    scaleQ: 1000,
    satietyQ: 100,
    width: 75,
    height: 75,
    startX: 300,
    startY: 300,
    startSpeed: 150,
    startHealth: 25,
    hungerTime: 5000,
    hungerQSaturation: -10,
};

export const foodSettings = {
    minSaturation: 10,
    maxSaturation: 25,
    width: 50,
    height: 50,
};

export const enemySettings = {
    startPositionOffset: 20,
    edgeOffset: 100,
    speed: 200,
    minDamage: 10,
    maxDamage: 25,
    boostSpeed: 400,
};
