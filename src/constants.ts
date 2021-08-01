import playerMoveRightImage_0 from './assets/player/player_move_right/0.png';
import playerMoveRightImage_5 from './assets/player/player_move_right/5.png';
import playerMoveRightImage_10 from './assets/player/player_move_right/10.png';
import playerMoveLeftImage_0 from './assets/player/player_move_left/0.png';
import playerMoveLeftImage_10 from './assets/player/player_move_left/10.png';

// ENEMY
import enemyMoveLeftImage_0 from './assets/enemy/dragon_move_left/0.png';
import enemyMoveLeftImage_1 from './assets/enemy/dragon_move_left/1.png';
import enemyMoveLeftImage_2 from './assets/enemy/dragon_move_left/2.png';
import enemyMoveLeftImage_3 from './assets/enemy/dragon_move_left/3.png';

import enemyMoveRightImage_0 from './assets/enemy/dragon_move_right/0.gif';
import enemyMoveRightImage_1 from './assets/enemy/dragon_move_right/1.gif';
import enemyMoveRightImage_2 from './assets/enemy/dragon_move_right/2.gif';
import enemyMoveRightImage_3 from './assets/enemy/dragon_move_right/3.gif';

// COMMON
import appleImage from './assets/apple.png';
import spaceImage from './assets/space.jpg';

export const playerMoveRightImages = [
    playerMoveRightImage_0,
    playerMoveRightImage_5,
    playerMoveRightImage_10,
];

export const playerMoveLeftImages = [
    playerMoveLeftImage_0,
    playerMoveLeftImage_10,
];

export const enemyMoveLeftImages = [
    enemyMoveLeftImage_0,
    enemyMoveLeftImage_1,
    enemyMoveLeftImage_2,
    enemyMoveLeftImage_3,
];

export const enemyMoveRightImages = [
    enemyMoveRightImage_0,
    enemyMoveRightImage_1,
    enemyMoveRightImage_2,
    enemyMoveRightImage_3,
]


export const ASSETS = {
    playerMoveRightImgs: playerMoveRightImages,
    playerMoveLeftImgs: playerMoveLeftImages,
    enemyMoveRightImgs: enemyMoveRightImages,
    enemyMoveLeftImgs: enemyMoveLeftImages,
    foodImg: appleImage,
    bgImg: spaceImage,
}

export const ANIMATION_KEYS = {
    PLAYER_MOVE_TOP_RIGHT: 'player_move_top_right',
    PLAYER_MOVE_TOP_LEFT: 'player_move_top_left',
    PLAYER_MOVE_BOTTOM_RIGHT: 'player_move_bottom_right',
    PLAYER_MOVE_BOTTOM_LEFT: 'player_move_bottom_left',
    PLAYER_IDLE: 'player_idle',
}

export const FOOD_IMAGE_KEY = 'food_img';
export const ENEMY_IMAGE_KEY = 'enemy_img';
export const BG_IMAGE_KEY = 'bg_img';

export const PLAYER_OBJECT_KEY = 'player';
export const FOOD_OBJECT_KEY = 'food';
export const ENEMY_OBJECT_KEY = 'enemy';