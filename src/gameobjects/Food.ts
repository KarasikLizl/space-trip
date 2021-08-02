import Phaser from 'phaser';
import { ANIMATION_KEYS, ASSETS_MAP_KEY } from '../constants';
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
        });

        this.saturation = config.saturation;
        this.setDisplaySize(foodSettings.width, foodSettings.height);

        this.createAnimations();
        this.play(ANIMATION_KEYS.IDLE);
    }

    getSaturation() {
        return this.saturation
    }

    reset() {
        this.setX(randomInteger(0, Number(gameSettings.width)));
        this.setY(randomInteger(0, Number(gameSettings.height)));
        this.saturation = getRandomSaturation();
    }

    private createAnimations() {
        this.anims.create({
            key: ANIMATION_KEYS.IDLE,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.food, { frames: [ 0 ] }),
            frameRate: 1,
            repeat: -1,
        });
    }
}

export const getRandomSaturation = () => randomInteger(foodSettings.minSaturation, foodSettings.maxSaturation);