import player from './sprites/player.png';
import enemy from './sprites/enemy.png';
import background from './background.png';
import food from './sprites/food.png';

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