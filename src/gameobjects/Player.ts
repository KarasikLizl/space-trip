import Phaser from "phaser";
import { PLAYER_IMAGE_KEY } from '../constants';
import { Food, getRandomSaturation } from "./Food";
import { GameObject, GameObjectConfig } from "./GameObject";
import { randomInteger } from '../utils';
import { gameSettings, playerSettings } from '../settings';

export interface PlayerConfig extends GameObjectConfig {
    health: number;
}

export class Player extends GameObject {
    health: number;
    satiety: number;

    constructor (scene: Phaser.Scene, config: PlayerConfig) {
        super(scene, { ...config, image: PLAYER_IMAGE_KEY });

        this.health = config.health;
        this.satiety = 1;
        this.setDisplaySize(playerSettings.width, playerSettings.height);
        this.setCollideWorldBounds(true);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.setVelocity(0);

        if (cursors.left.isDown) {
            this.setVelocityX(-this.getSpeed());
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.getSpeed());
        }
        if (cursors.up.isDown) {
            this.setVelocityY(-this.getSpeed());
        } else if (cursors.down.isDown) {
            this.setVelocityY(this.getSpeed());
        }
    }

    getSpeed() {
        return this.speed * (1 / this.satiety);
    }

    eat(food: Food ) {
        this.scale += playerSettings.scaleStep;
        this.satiety += playerSettings.satietyStep;
        this.health += food.saturation;

        food.setX(randomInteger(0, Number(gameSettings.width)));
        food.setY(randomInteger(0, Number(gameSettings.height)));
        food.saturation = getRandomSaturation();
    }
}
