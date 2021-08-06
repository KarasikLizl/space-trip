import Phaser from 'phaser';

const body = document.querySelector('body');

const isDev = process.env.NODE_ENV === 'development';

export const globalSettings: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    get width() {
        const bodyRect = body?.getBoundingClientRect();
        return bodyRect?.width || 0;
    },
    get height() {
        const bodyRect = body?.getBoundingClientRect();
        return bodyRect?.height || 0;
    },
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
