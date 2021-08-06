import Phaser from 'phaser';
import { ASSETS_MAP_KEY } from '../../assets';
import { SCENE_KEYS } from '../../constants';
import { globalSettings, uiSettings } from '../../settings';
import { createBackground, createWandingObject, infinityRotate, logger, randomInteger } from '../../utils';
import { endSettings } from './settings';

export class EndScene extends Phaser.Scene {
    private backgroundPlayer!: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super(SCENE_KEYS.END);
    }

    preload() {
        logger('preload', SCENE_KEYS.END, 'scene');
    }

    update() {
        infinityRotate(this.backgroundPlayer, 1);
    }

    create() {
        createBackground(this);
        this.backgroundPlayer = createWandingObject(this, {
            ...endSettings.player,
            image: ASSETS_MAP_KEY.food,
            frame: randomInteger(0, 23),
        });

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