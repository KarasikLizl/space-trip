import {
    appleImage,
    spaceImage,
    playerMoveRightImages,
    playerMoveLeftImages,
    enemyMoveLeftImages,
    enemyMoveRightImages,
} from './assets/index';

export const ASSETS_MAP = {
    playerMoveRightImgs: playerMoveRightImages,
    playerMoveLeftImgs: playerMoveLeftImages,
    enemyMoveRightImgs: enemyMoveRightImages,
    enemyMoveLeftImgs: enemyMoveLeftImages,
    foodImg: appleImage,
    bgImg: spaceImage,
}

export enum ANIMATION_KEYS {
    PLAYER_MOVE_TOP_RIGHT = 'player_move_top_right',
    PLAYER_MOVE_TOP_LEFT = 'player_move_top_left',
    PLAYER_MOVE_BOTTOM_RIGHT = 'player_move_bottom_right',
    PLAYER_MOVE_BOTTOM_LEFT = 'player_move_bottom_left',
    PLAYER_IDLE = 'player_idle',
}

export enum SCENE_KEYS {
    BOOT = 'boot',
    PRELOAD = 'preload',
    MENU = 'menu',
    GAME = 'game',
    END = 'end',
};

export enum GLOBAL_KEYS {
    FOOD_IMAGE_KEY = 'food_img',
    ENEMY_IMAGE_KEY = 'enemy_img',
    BG_IMAGE_KEY = 'bg_img',
}
