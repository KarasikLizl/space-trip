import Phaser from 'phaser';
import { SCENE_KEYS } from '../constants';
import { gameSettings, uiSettings } from '../settings';
import { logger } from '../utils';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.MENU);
    }

    create() {
        const gameWidth = (Number(gameSettings.width) || 0);
        this.add.text(gameWidth / 2, 230, uiSettings.menu.title.text, {
            fontFamily: uiSettings.font,
            color: uiSettings.menu.title.fontColor,
            align: 'center',
        }).setOrigin(0.5, 0).setFontSize(uiSettings.menu.title.fontSize);

        this.add.text(gameWidth / 2, 470, uiSettings.menu.description.text, {
            fontFamily: uiSettings.font,
            color: uiSettings.menu.description.fontColor,
        }).setOrigin(0.5, 0).setFontSize(uiSettings.menu.description.fontSize)

        this.input.once('pointerdown', () => {
            this.scene.start(SCENE_KEYS.GAME);
        });

        logger('preload', SCENE_KEYS.MENU, 'scene');
    }
}
