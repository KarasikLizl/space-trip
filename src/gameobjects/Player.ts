import Phaser from "phaser";
import { GameObject } from "./gameobject";

const defaultSpeed = 10;

export class Player extends GameObject {
    health = 10;
    constructor (scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, defaultSpeed, 'player');
    }
}