import Phaser from 'phaser';
import { FOOD_IMAGE_KEY } from '../constants';
import { GameObject, GameObjectConfig } from "./GameObject";

export interface FoodConfig extends GameObjectConfig {
    saturation: number;
}

export class Food extends GameObject {
    saturation: number;
    constructor (scene: Phaser.Scene, config: FoodConfig) {
        super(scene, { ...config, image: FOOD_IMAGE_KEY });

        this.saturation = config.saturation;
        this.setDisplaySize(50, 50);
    }
}
