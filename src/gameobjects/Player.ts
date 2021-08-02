import Phaser from "phaser";
import { ANIMATION_KEYS } from '../constants';
import { Food } from "./Food";
import { GameObject, GameObjectConfig } from "./GameObject";
import { playerSettings } from '../settings';
import { Enemy } from './Enemy';
import { ASSETS_MAP_KEY } from '../assets';

export interface PlayerConfig extends GameObjectConfig {
    health: number;
}

/**
 * move direction:
 * 0000;
 * 1000 - вверх
 * 100 - вправо
 * 10 - вниз
 * 1 - влево
 * 1100 - вверх вправо
 * 110 - вправо вниз
 * 11 - вниз влево
 * 1001 - вверх влево
 */

export class Player extends GameObject {
    private health: number;
    private satiety: number;
    private lastEatTime: number;
    private isMoving: boolean;

    constructor (scene: Phaser.Scene, config: PlayerConfig) {
        super(scene, { ...config });

        this.satiety = 1;
        this.health = config.health;
        this.lastEatTime = this.scene.time.now;;
        this.isMoving = false;

        this.setCollideWorldBounds(true);
        this.setDisplaySize(playerSettings.width, playerSettings.height);
        this.setSize(playerSettings.width, playerSettings.height);
        this.createAnimations();
        this.play(ANIMATION_KEYS.IDLE);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number) {
        this.setVelocity(0);
        const shouldMove = (
            cursors.left.isDown ||
            cursors.right.isDown ||
            cursors.up.isDown ||
            cursors.down.isDown
        );

        let directionMove = this.getDirectionMove(cursors);
        this.updateVelicity(directionMove);

        if (this.lastEatTime + playerSettings.hungerTime < time) {
            this.lastEatTime = time;
            this.updateSetiety(playerSettings.hungerQSaturation);
        }

        if (shouldMove) {
            this.toggleMoveAnimations(true, directionMove);
        } else if (!shouldMove && this.isMoving) {
            this.toggleMoveAnimations(false);
        }
    }

    getSpeed() {
        return this.speed * (1 / this.satiety);
    }

    getHealth() {
        return this.health || 0;
    }

    getSatiety() {
        return this.satiety || 0;
    }

    setDamage(enemy: Enemy) {
        this.updateSetiety(-enemy.getDamage());
        enemy.reset();
    }

    eat(food: Food) {
        this.updateSetiety(food.getSaturation());
        this.lastEatTime = this.scene.time.now;

        food.reset();
    }

    private updateSetiety(saturation: number) {
        this.scale += saturation / playerSettings.scaleQ;
        this.satiety += saturation / playerSettings.satietyQ;
        this.health += saturation;
    }

    private toggleMoveAnimations(move: boolean, direction?: number) {
        this.stop();
        if (move) {
            switch(direction) {
                case 1000:
                    this.play(ANIMATION_KEYS.MOVE_TOP);
                    break;
                case 1100:
                    this.play(ANIMATION_KEYS.MOVE_TOP_RIGHT);
                    break;
                case 100:
                    this.play(ANIMATION_KEYS.MOVE_RIGHT);
                    break;
                case 110:
                    this.play(ANIMATION_KEYS.MOVE_BOTTOM_RIGHT);
                    break;
                case 10:
                    this.play(ANIMATION_KEYS.MOVE_BOTTOM);
                    break;
                case 1001:
                    this.play(ANIMATION_KEYS.MOVE_TOP_LEFT);
                    break;
                case 1:
                    this.play(ANIMATION_KEYS.MOVE_LEFT);
                    break;
                case 11:
                    this.play(ANIMATION_KEYS.MOVE_BOTTOM_LEFT);
                    break;
                default: break;
            }
        } else {
            this.play(ANIMATION_KEYS.IDLE);
        }
        this.isMoving = move;
    }

    private updateVelicity(direction: number) {
        this.setVelocity(0);
        const speed = this.getSpeed();
        switch(direction) {
            case 1000:
                this.setVelocity(0, -speed);
                break;
            case 1100:
                this.setVelocity(speed, -speed);
                break;
            case 100:
                this.setVelocity(speed, 0);
                break;
            case 110:
                this.setVelocity(speed, speed);
                break;
            case 1001:
                this.setVelocity(-speed, -speed);
                break;
            case 10:
                this.setVelocity(0, speed);
                break;
            case 11:
                this.setVelocity(-speed, speed);
                break;
            case 1:
                this.setVelocity(-speed, 0);
                break;
            default:
                this.setVelocity(0);
                break;
        }
    }

    private getDirectionMove(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        let directionMove = 0;

        if (cursors.left.isDown) {
            directionMove += 1;
        } else if (cursors.right.isDown) {
            directionMove += 100;
        }

        if (cursors.up.isDown) {
            directionMove += 1000;
        } else if (cursors.down.isDown) {
            directionMove += 10;
        }

        return directionMove;
    }

    private createAnimations() {
        this.anims.create({
            key: ANIMATION_KEYS.IDLE,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.player, { frames: [ 25 ] }),
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.MOVE_TOP_LEFT,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.player, { frames: [ 0 ] }),
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.MOVE_TOP_RIGHT,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.player, { frames: [ 34 ] }),
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.MOVE_BOTTOM_RIGHT,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.player, { frames: [ 36 ] }),
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.MOVE_BOTTOM_LEFT,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.player, { frames: [ 11 ] }),
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.MOVE_BOTTOM,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.player, { frames: [ 9 ] }),
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.MOVE_TOP,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.player, { frames: [ 20 ] }),
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.MOVE_RIGHT,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.player, { frames: [ 58 ] }),
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: ANIMATION_KEYS.MOVE_LEFT,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.player, { frames: [ 26 ] }),
            frameRate: 1,
            repeat: -1,
        });
    }
}
