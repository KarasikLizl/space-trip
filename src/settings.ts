import Phaser from 'phaser';

const body = document.querySelector('body');
const bodyRect = body?.getBoundingClientRect();

export const globalSettings: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: bodyRect?.width || 0,
    height: bodyRect?.height || 0,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 },
        }
    },
};

export const uiSettings = {
    font: 'Roboto',
}
