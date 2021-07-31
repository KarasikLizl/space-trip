import Phaser from 'phaser'; 
import { GameObject } from "./gameobject"; 
 
export class Food extends GameObject {
    saturation: number;
    constructor (scene: Phaser.Scene, x: number, y: number, saturation: number) {
        super(scene, x, y, saturation, 'food');
        this.saturation = saturation;
    }
}