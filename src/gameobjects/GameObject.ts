import Phaser from "phaser";

export interface GameObjectConfig {
    x: number;
    y: number;
    speed: number;
    image?: string;
}

export class GameObject extends Phaser.Physics.Arcade.Sprite {
    speed: number;
    constructor (scene: Phaser.Scene, config: GameObjectConfig) {
        super(scene, config.x, config.y, config.image || '');
        this.speed = config.speed;
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}
