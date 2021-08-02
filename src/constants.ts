import {
    player,
    enemy,
    background,
    food,
} from './assets/index';

export const ASSETS_MAP = {
    player,
    enemy,
    background,
    food,
}

type ASSETS_KEYS = keyof typeof ASSETS_MAP;

export const ASSETS_MAP_KEY: Record<ASSETS_KEYS, string> = Object.keys(ASSETS_MAP).reduce((result: Record<ASSETS_KEYS, string>, key: string) => {
    return { ...result, [key]: key };
}, {} as Record<ASSETS_KEYS, string>);

export enum ANIMATION_KEYS {
    IDLE = 'player_idle',
    MOVE_TOP_RIGHT = 'player_move_top_right',
    MOVE_TOP_LEFT = 'player_move_top_left',
    MOVE_BOTTOM_RIGHT = 'player_move_bottom_right',
    MOVE_BOTTOM_LEFT = 'player_move_bottom_left',
}

export enum SCENE_KEYS {
    BOOT = 'boot',
    PRELOAD = 'preload',
    MENU = 'menu',
    GAME = 'game',
    END = 'end',
};
