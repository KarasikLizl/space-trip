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
    lastEatTime: number;

    constructor (scene: Phaser.Scene, config: PlayerConfig) {
        super(scene, { ...config, image: PLAYER_IMAGE_KEY });

        this.satiety = 1;
        this.health = config.health;
        this.lastEatTime = Date.now();
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

        if (this.lastEatTime + playerSettings.hungerTime < Date.now()) {
            this.lastEatTime = Date.now();
            this.updateSetiety(playerSettings.hungerQSaturation);
        }
    }

    getSpeed() {
        return this.speed * (1 / this.satiety);
    }

    eat(food: Food) {
        this.updateSetiety(food.saturation);
        this.lastEatTime = Date.now();

        food.setX(randomInteger(0, Number(gameSettings.width)));
        food.setY(randomInteger(0, Number(gameSettings.height)));
        food.saturation = getRandomSaturation();
    }

    updateSetiety(saturation: number) {
        this.scale += saturation / playerSettings.scaleQ;
        this.satiety += saturation / playerSettings.satietyQ;
        this.health += saturation;
    }
}
