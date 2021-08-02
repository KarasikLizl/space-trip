import Phaser from 'phaser';
import { SCENE_KEYS } from '../constants';
import { logger } from '../utils';

export class BootScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.BOOT);
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        logger('preload', SCENE_KEYS.BOOT, 'scene');
    }

    create() {
        this.scene.start(SCENE_KEYS.PRELOAD);
    }
}
