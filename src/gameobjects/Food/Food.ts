import Phaser from 'phaser';
import { ASSETS_MAP_KEY } from '../../assets';
import { foodSettings } from './settings';
import { globalSettings } from '../../settings';
import { randomInteger } from '../../utils';
import { GameObject, GameObjectConfig } from "../GameObject/GameObject";
import { Saturation } from '../Effect/Saturation';

export interface FoodConfig extends Pick<GameObjectConfig, 'speed'> {}

const SPRITESHEET_FRAMES_COUNT = 3;

export class Food extends GameObject {
    private saturation: number = 0;
    private outer: Phaser.Geom.Rectangle = new Phaser.Geom.Rectangle(
        0 + foodSettings.startPositionOffset,
        0 + foodSettings.startPositionOffset,
        Number(globalSettings.width) - foodSettings.startPositionOffset,
        Number(globalSettings.height) - foodSettings.startPositionOffset,
    );
    private target: Phaser.Geom.Point = new Phaser.Geom.Point();

    constructor (scene: Phaser.Scene, config: FoodConfig) {
        super(scene, {
            ...config,
            x: 0,
            y: 0,
        });

        this.reset();
    }

    getSaturationEffect(): Saturation {
        return new Saturation(this.saturation);
    }

    reset() {
        this.saturation = this.getRandomSaturation();
        this.outer.getRandomPoint(this.target);
        this.body.reset(this.target.x, this.target.y);
        this.setTexture(ASSETS_MAP_KEY.food, randomInteger(0, SPRITESHEET_FRAMES_COUNT));
    }

    protected init() {
        super.init();
    }

    private getRandomSaturation() {
        return randomInteger(foodSettings.minSaturation, foodSettings.maxSaturation);
    }
}
