import Phaser from 'phaser';
import { GLOBAL_KEYS } from '../constants';
import { foodSettings, gameSettings } from '../settings';
import { randomInteger } from '../utils';
import { GameObject, GameObjectConfig } from "./GameObject";

export interface FoodConfig extends Pick<GameObjectConfig, 'speed'> {
    saturation: number;
}

export class Food extends GameObject {
    private saturation: number;
    constructor (scene: Phaser.Scene, config: FoodConfig) {
        super(scene, {
            ...config,
            x: randomInteger(0, Number(gameSettings.width)),
            y: randomInteger(0, Number(gameSettings.height)),
            image: GLOBAL_KEYS.FOOD_IMAGE_KEY
        });

        this.saturation = config.saturation;
        this.setDisplaySize(foodSettings.width, foodSettings.height);
    }

    getSaturation() {
        return this.saturation
    }

    reset() {
        this.setX(randomInteger(0, Number(gameSettings.width)));
        this.setY(randomInteger(0, Number(gameSettings.height)));
        this.saturation = getRandomSaturation();
    }
}

export const getRandomSaturation = () => randomInteger(foodSettings.minSaturation, foodSettings.maxSaturation);