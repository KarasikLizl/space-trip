import Phaser from 'phaser';
import { FOOD_IMAGE_KEY } from '../constants';
import { GameObject } from "./GameObject";

export class Food extends GameObject {
    saturation: number;
    constructor (scene: Phaser.Scene, x: number, y: number, saturation: number) {
        super(scene, x, y, saturation, FOOD_IMAGE_KEY);

        this.saturation = saturation;
        this.setDisplaySize(50, 50);
    }
}
