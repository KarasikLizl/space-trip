import Phaser from 'phaser';
import { ANIMATION_KEYS, ASSETS_MAP, GLOBAL_KEYS, SCENE_KEYS } from '../constants';
import { uiSettings } from '../settings';
import { logger } from '../utils';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.PRELOAD);
    }

    preload() {
        this.load.image(GLOBAL_KEYS.BG_IMAGE_KEY, ASSETS_MAP.bgImg);
        this.load.image(ANIMATION_KEYS.PLAYER_IDLE, ASSETS_MAP.playerMoveRightImgs[1]);
        this.load.image(ANIMATION_KEYS.PLAYER_MOVE_TOP_RIGHT, ASSETS_MAP.playerMoveRightImgs[0]);
        this.load.image(ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_RIGHT, ASSETS_MAP.playerMoveRightImgs[2]);
        this.load.image(ANIMATION_KEYS.PLAYER_MOVE_TOP_LEFT, ASSETS_MAP.playerMoveLeftImgs[0]);
        this.load.image(ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_LEFT, ASSETS_MAP.playerMoveLeftImgs[1]);

        logger('preload', SCENE_KEYS.PRELOAD, 'scene');
    }

    create() {
        this.createPlayerAnimations();
        this.createEnemyAnimations();

        // @ts-ignore-next-line
        window.WebFont.load({
            google: {
                families: [ uiSettings.font ],
            },
            active: () => {
                this.scene.start(SCENE_KEYS.MENU);
            },
        });
    }

    createPlayerAnimations() {
        this.anims.create({
            key: ANIMATION_KEYS.PLAYER_IDLE,
            frames: [
                { key: ANIMATION_KEYS.PLAYER_IDLE }
            ],
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.PLAYER_MOVE_TOP_LEFT,
            frames: [
                { key: ANIMATION_KEYS.PLAYER_MOVE_TOP_LEFT }
            ],
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.PLAYER_MOVE_TOP_RIGHT,
            frames: [
                { key: ANIMATION_KEYS.PLAYER_MOVE_TOP_RIGHT }
            ],
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_RIGHT,
            frames: [
                { key: ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_RIGHT }
            ],
            frameRate: 1,
            repeat: -1,
        });


        this.anims.create({
            key: ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_LEFT,
            frames: [
                { key: ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_LEFT }
            ],
            frameRate: 1,
            repeat: -1,
        });
    }

    createEnemyAnimations() {
        // TODO
    }
}
