import Phaser from 'phaser';
import { ASSETS_MAP_KEY } from '../../assets';
import { SCENE_KEYS } from '../../constants';
import { globalSettings, uiSettings } from '../../settings';
import { createBackground, createWandingObject, infinityRotate, logger } from '../../utils';
import { mobileErrorSettings } from './settings';

export class MobileError extends Phaser.Scene {
    private backgroundPlayer!: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super(SCENE_KEYS.MOBILE_ERROR);
    }

    create() {
        createBackground(this);

        this.backgroundPlayer = createWandingObject(this, {
            ...mobileErrorSettings.player,
            image: ASSETS_MAP_KEY.player,
            frame: 0,
        });

        const gameWidth = (Number(globalSettings.width) || 0);
        const gameHeight = (Number(globalSettings.height) || 0);
        this.add.text(0, 0, mobileErrorSettings.ui.title.text, {
            fontFamily: uiSettings.font,
            color: mobileErrorSettings.ui.title.fontColor,
            align: 'center',
        }).setOrigin(0.5, 0.5)
            .setX(gameWidth / 2)
            .setY(gameHeight / 2)
            .setFontSize(mobileErrorSettings.ui.title.fontSize);

        logger('preload', SCENE_KEYS.MOBILE_ERROR, 'scene');
    }

    update() {
        infinityRotate(this.backgroundPlayer, 1);
    }
}
