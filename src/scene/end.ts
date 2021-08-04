import Phaser from 'phaser';
import { SCENE_KEYS } from '../constants';
import { globalSettings, uiSettings } from '../settings';
import { logger } from '../utils';

export class EndScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.END);

    }

    preload() {
        logger('preload', SCENE_KEYS.END, 'scene');
    }

    create() {
        const gameWidth = (Number(globalSettings.width) || 0);
        this.add.text(gameWidth / 2, 350, uiSettings.end.title.text, {
            fontFamily: uiSettings.font,
            color: uiSettings.end.title.fontColor,
        }).setOrigin(0.5, 0).setFontSize(uiSettings.end.title.fontSize);

        this.add.text(gameWidth / 2, 470, uiSettings.end.description.text, {
            fontFamily: uiSettings.font,
            color: uiSettings.end.description.fontColor,
        }).setOrigin(0.5, 0).setFontSize(uiSettings.end.description.fontSize)

        this.input.once('pointerdown', () => {
            this.scene.start(SCENE_KEYS.MENU);
        });
    }
}