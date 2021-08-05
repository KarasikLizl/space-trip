import Phaser from "phaser";
import { Effect } from '../Effect/Effect';

export interface GameObjectConfig {
    x: number;
    y: number;
    speed: number;
}

export class GameObject extends Phaser.Physics.Arcade.Sprite {
    speed: number;

    protected effects: Effect[] = [];

    constructor (scene: Phaser.Scene, config: GameObjectConfig) {
        super(scene, config.x, config.y, '');
        this.speed = config.speed;

        this.init();
    }

    setSpeed(speed: number) {
        this.speed = speed;
    }

    addEffect(effect: Effect) {
        this.effects.push(effect);
        effect.start(this, this.scene.time.now);
    }

    removeEffect(effect: Effect) {
        effect.isEnded = true;
    }

    protected init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    protected createAnimations() {}

    protected checkEffects() {
        this.effects = this.effects.filter((effect) => {
            if (effect.isEnded) {
                effect.end(this.scene.time.now);
            }
            return !effect.isEnded;
        });
    }

    protected updateEffects() {
        this.effects.forEach((effect) => {
            effect.update(this.scene.time.now);
        })
    }
}
