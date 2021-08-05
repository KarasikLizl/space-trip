import Phaser from 'phaser';
import { ASSETS_MAP_KEY } from '../../assets';
import { SCENE_KEYS } from '../../constants';
import { globalSettings, uiSettings } from '../../settings';
import { logger } from '../../utils';
import { endSettings } from './settings';

export class EndScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.END);

    }

    preload() {
        logger('preload', SCENE_KEYS.END, 'scene');
    }

    create() {
        // TODO: вынести в отдельную функцию/метод, что бы использовать везде.
        const globalWidth = Number(globalSettings.width);
        const globalHeight = Number(globalSettings.height);
        const background = this.add.image(globalWidth / 2, globalHeight / 2, ASSETS_MAP_KEY.background)
            .setOrigin(.5, .5);
        // Based on your game size, it may "stretch" and distort.
        background.displayWidth = Number(globalSettings.width);
        background.displayHeight = Number(globalSettings.height);

        const gameWidth = (Number(globalSettings.width) || 0);
        this.add.text(gameWidth / 2, 350, endSettings.ui.title.text, {
            fontFamily: uiSettings.font,
            color: endSettings.ui.title.fontColor,
        }).setOrigin(0.5, 0).setFontSize(endSettings.ui.title.fontSize);

        this.add.text(gameWidth / 2, 470, endSettings.ui.description.text, {
            fontFamily: uiSettings.font,
            color: endSettings.ui.description.fontColor,
        }).setOrigin(0.5, 0).setFontSize(endSettings.ui.description.fontSize)

        this.input.once('pointerdown', () => {
            this.scene.start(SCENE_KEYS.MENU);
        });
    }
}