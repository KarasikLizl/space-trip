import Phaser from 'phaser';
import { ASSETS_MAP_KEY } from '../../assets';
import { SCENE_KEYS } from '../../constants';
import { globalSettings, uiSettings } from '../../settings';
import { logger, randomInteger } from '../../utils';
import { winSettings } from './winsettings';

export class WinScene extends Phaser.Scene {
    private backgroundPlayer!: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super(SCENE_KEYS.WIN);

    }

    preload() {
        logger('preload', SCENE_KEYS.WIN, 'scene');
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

        this.createBackgroundPlayerAnimation();

        const gameWidth = (Number(globalSettings.width) || 0);
        this.add.text(gameWidth / 2, 350, winSettings.ui.title.text, {
            fontFamily: uiSettings.font,
            color: winSettings.ui.title.fontColor,
        }).setOrigin(0.5, 0).setFontSize(winSettings.ui.title.fontSize);

        this.add.text(gameWidth / 2, 470, winSettings.ui.description.text, {
            fontFamily: uiSettings.font,
            color: winSettings.ui.description.fontColor,
        }).setOrigin(0.5, 0).setFontSize(winSettings.ui.description.fontSize)

        this.input.once('pointerdown', () => {
            this.scene.start(SCENE_KEYS.MENU);
        });
    }

    update() {
        if (this.backgroundPlayer.angle === 359) {
            this.backgroundPlayer.angle = 0;
        } else {
            this.backgroundPlayer.setAngle(this.backgroundPlayer.angle + 1);
        }
    }

    private createBackgroundPlayerAnimation() {
        this.backgroundPlayer = this.physics.add.sprite(
            winSettings.player.startPositionX,
            winSettings.player.startPositionY,
            ASSETS_MAP_KEY.player, 0
        );
        this.backgroundPlayer
            .setScale(2)
            .setBounceX(1)
            .setBounceY(1)
            .setCollideWorldBounds(true)
            .setVelocity(
                randomInteger(winSettings.player.minSpeed, winSettings.player.maxSpeed),
                randomInteger(winSettings.player.minSpeed, winSettings.player.maxSpeed),
            );
    }
}

