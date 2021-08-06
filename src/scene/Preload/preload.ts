import Phaser from 'phaser';
import { ASSETS_MAP, ASSETS_MAP_KEY } from '../../assets';
import { SCENE_KEYS } from '../../constants';
import { globalSettings, uiSettings } from '../../settings';
import { logger } from '../../utils';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super(SCENE_KEYS.PRELOAD);
    }

    preload() {
        // NOTE: все спрайты должны загружаться с одинаковым размером фрейма.
        this.load.spritesheet(ASSETS_MAP_KEY.player, ASSETS_MAP.player, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(ASSETS_MAP_KEY.enemy, ASSETS_MAP.enemy, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(ASSETS_MAP_KEY.food, ASSETS_MAP.food, { frameWidth: 32, frameHeight: 32 });
        this.load.image(ASSETS_MAP_KEY.background, ASSETS_MAP.background);

        logger('preload', SCENE_KEYS.PRELOAD, 'scene');
    }

    create() {
        // @ts-ignore-next-line
        window.WebFont.load({
            google: {
                families: [ uiSettings.font ],
            },
            active: () => {
                if (Number(globalSettings.width) < 1000 || Number(globalSettings.height) < 500) {
                    this.scene.start(SCENE_KEYS.MOBILE_ERROR);
                } else {
                    this.scene.start(SCENE_KEYS.MENU);
                }
            },
        });
    }
}
