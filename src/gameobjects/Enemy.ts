import Phaser from 'phaser'; 
import { GameObject } from "./gameobject";

export class Enemy extends GameObject {
    damage: number;
    constructor (scene: Phaser.Scene, x: number, y: number, damage: number) {
        super(scene, x, y, damage, 'enemy');
        this.damage = damage;
    }
}
