import Phaser from "phaser";

export interface GameObjectConfig {
    x: number;
    y: number;
    speed: number;
}

export class GameObject extends Phaser.Physics.Arcade.Sprite {
    speed: number;

    constructor (scene: Phaser.Scene, config: GameObjectConfig) {
        super(scene, config.x, config.y, '');
        this.speed = config.speed;

        this.init();
    }

    protected init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    protected createAnimations() {}
}
