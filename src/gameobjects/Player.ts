import Phaser from "phaser";
import { PLAYER_IMAGE_KEY } from '../constants';
import { Food } from "./Food";
import { GameObject, GameObjectConfig } from "./GameObject";

export interface PlayerConfig extends GameObjectConfig {
    health: number;
}

export class Player extends GameObject {
    health: number;
    constructor (scene: Phaser.Scene, config: PlayerConfig) {
        super(scene, { ...config, image: PLAYER_IMAGE_KEY });

        this.health = config.health;
        this.setDisplaySize(75, 75);
        this.setCollideWorldBounds(true);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.setVelocity(0);

        if (cursors.left.isDown) {
            this.setVelocityX(-this.speed);
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.speed);
        } 
        if (cursors.up.isDown) {
            this.setVelocityY(-this.speed);
        } else if (cursors.down.isDown) {
            this.setVelocityY(this.speed);
        }
    }

    eat(player: Player, food: Food ) {
        this.health = food.saturation;
        
    }
}