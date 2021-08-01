import Phaser from "phaser";

export interface GameObjectConfig {
    x: number;
    y: number;
    speed: number;
    image: string;
}

export class GameObject extends Phaser.GameObjects.Image {
    speed: number;
    constructor (scene: Phaser.Scene, config: GameObjectConfig) {
        super(scene, config.x, config.y, config.image);
        this.speed = config.speed;
    }
}
