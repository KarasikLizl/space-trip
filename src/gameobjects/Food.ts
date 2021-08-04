import Phaser from 'phaser';
import { ASSETS_MAP_KEY } from '../assets';
import { foodSettings, gameSettings } from '../settings';
import { randomInteger } from '../utils';
import { GameObject, GameObjectConfig } from "./GameObject";

export interface FoodConfig extends Pick<GameObjectConfig, 'speed'> {}

const SPRITESHEET_FRAMES_COUNT = 3;

export class Food extends GameObject {
    private saturation: number = 0;

    constructor (scene: Phaser.Scene, config: FoodConfig) {
        super(scene, {
            ...config,
            x: 0,
            y: 0,
        });

        this.reset();
    }

    getSaturation() {
        return this.saturation
    }

    reset() {
        this.saturation = this.getRandomSaturation();
        this.setX(randomInteger(0, Number(gameSettings.width)));
        this.setY(randomInteger(0, Number(gameSettings.height)));
        this.setTexture(ASSETS_MAP_KEY.food, randomInteger(0, SPRITESHEET_FRAMES_COUNT));
    }

    protected init() {
        super.init();
    }

    private getRandomSaturation() {
        return randomInteger(foodSettings.minSaturation, foodSettings.maxSaturation);
    }
}
