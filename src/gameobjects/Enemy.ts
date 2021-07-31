import Phaser from 'phaser';
import { ENEMY_IMAGE_KEY } from '../constants';
import { GameObject } from "./GameObject";

export class Enemy extends GameObject {
    damage: number;
    constructor (scene: Phaser.Scene, x: number, y: number, damage: number) {
        super(scene, x, y, damage, ENEMY_IMAGE_KEY);

        this.damage = damage;
        this.setDisplaySize(125, 125);
    }
}
