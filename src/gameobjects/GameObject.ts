import Phaser from "phaser";

export class GameObject extends Phaser.GameObjects.Image {
    speed: number;
    constructor (scene: Phaser.Scene, x: number, y: number, speed: number, name: string) {
        super(scene, x, y, name);
        this.speed = speed;
    }
}