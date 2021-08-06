import Phaser from 'phaser';
import { ASSETS_MAP_KEY } from '../../assets';
import { SCENE_KEYS } from '../../constants';
import { globalSettings, uiSettings } from '../../settings';
import { createBackground, createWandingObject, infinityRotate, logger } from '../../utils';
import { menuSettings } from './settings';

export class MenuScene extends Phaser.Scene {
    private backgroundPlayer!: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super(SCENE_KEYS.MENU);
    }

    create() {
        createBackground(this);

        this.backgroundPlayer = createWandingObject(this, {
            ...menuSettings.player,
            image: ASSETS_MAP_KEY.player,
            frame: 0,
        });

        const gameWidth = (Number(globalSettings.width) || 0);
        this.add.text(gameWidth / 2, 230, menuSettings.ui.title.text, {
            fontFamily: uiSettings.font,
            color: menuSettings.ui.title.fontColor,
            align: 'center',
        }).setOrigin(0.5, 0).setFontSize(menuSettings.ui.title.fontSize);

        this.add.text(gameWidth / 2, 470, menuSettings.ui.description.text, {
            fontFamily: uiSettings.font,
            color: menuSettings.ui.description.fontColor,
        }).setOrigin(0.5, 0).setFontSize(menuSettings.ui.description.fontSize)

        this.input.once('pointerdown', () => {
            this.scene.start(SCENE_KEYS.GAME);
        });

        logger('preload', SCENE_KEYS.MENU, 'scene');
    }

    update() {
        infinityRotate(this.backgroundPlayer, 1);
    }
}
