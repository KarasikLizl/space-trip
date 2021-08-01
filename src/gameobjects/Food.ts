import Phaser from 'phaser';
import { FOOD_IMAGE_KEY } from '../constants';
import { foodSettings, gameSettings } from '../settings';
import { randomInteger } from '../utils';
import { GameObject, GameObjectConfig } from "./GameObject";

export interface FoodConfig extends GameObjectConfig {
    saturation: number;
}

export class Food extends GameObject {
    saturation: number;
    constructor (scene: Phaser.Scene, config: FoodConfig) {
        super(scene, { ...config, image: FOOD_IMAGE_KEY });

        this.saturation = config.saturation;
        this.setDisplaySize(foodSettings.width, foodSettings.height);
    }

    reset() {
        this.setX(randomInteger(0, Number(gameSettings.width)));
        this.setY(randomInteger(0, Number(gameSettings.height)));
        this.saturation = getRandomSaturation();
    }
}

export const getRandomSaturation = () => randomInteger(foodSettings.minSaturation, foodSettings.maxSaturation);