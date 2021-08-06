import Phaser from 'phaser';

const body = document.querySelector('body');
const bodyRect = body?.getBoundingClientRect();

const isDev = process.env.NODE_ENV === 'development';

export const globalSettings: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: bodyRect?.width || 0,
    height: bodyRect?.height || 0,
    physics: {
        default: 'arcade',
        arcade: {
            debug: isDev,
            gravity: { y: 0 },
        }
    },
};

export const uiSettings = {
    font: 'Roboto',
}
