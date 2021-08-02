import Phaser from 'phaser';
import { ASSETS_MAP_KEY } from '../assets';
import { ANIMATION_KEYS } from '../constants';
import { enemySettings, gameSettings } from '../settings';
import { randomInteger } from '../utils';
import { Food } from './Food';
import { GameObject, GameObjectConfig } from "./GameObject";

export interface EnemyConfig extends Pick<GameObjectConfig, 'speed'> {};

enum VelocityVector {
    TOP_TO_BOTTOM,
    LEFT_TO_RIGHT,
    BOTTOM_TO_TOP,
    RIGHT_TO_LEFT,
}

export class Enemy extends GameObject {
    private damage: number = 0;
    private velocityVector: VelocityVector = 0;

    constructor (scene: Phaser.Scene, config: EnemyConfig) {
        super(scene, {
            ...config,
            x: -500,
            y: -500,
        });

        this.setDisplaySize(enemySettings.width, enemySettings.height);
        this.reset();
        this.createAnimations();
        this.play(ANIMATION_KEYS.IDLE);
    }

    getDamage() {
        return this.damage;
    }

    update() {
        const gameWidth = Number(gameSettings.width);
        const gameHeight = Number(gameSettings.height);

        if (this.x > gameWidth + enemySettings.edgeOffset) {
            this.reset();
        } else if (this.x < (0 - (gameWidth + enemySettings.edgeOffset))) {
            this.reset();
        } else if (this.y < (0 - (gameHeight + enemySettings.edgeOffset))) {
            this.reset();
        } else if (this.y > gameHeight + enemySettings.edgeOffset) {
            this.reset();
        }
    }

    boost(food: Food) {
        switch(this.velocityVector) {
            case VelocityVector.TOP_TO_BOTTOM: {
                this.setVelocityY(enemySettings.boostSpeed);
                break;
            }
            case VelocityVector.RIGHT_TO_LEFT: {
                this.setVelocityX(-enemySettings.boostSpeed);
                break;
            }
            case VelocityVector.BOTTOM_TO_TOP: {
                this.setVelocityY(-enemySettings.boostSpeed);
                break;
            }
            case VelocityVector.LEFT_TO_RIGHT: {
                this.setVelocityX(enemySettings.boostSpeed);
                break;
            }
        }

        food.reset();
    }

    reset() {
        const coords = this.getStartEnemyCoords();
        this.setX(coords.x);
        this.setY(coords.y);
        this.damage = this.getRandomDamage();
        this.setEnemyVelocity();
    }

    setEnemyVelocity() {
        const isHorizontalVector = this.x < 0 || this.x > Number(gameSettings.width);
        this.setVelocity(0);

        if(isHorizontalVector) {
            if (this.x < 0) {
                this.velocityVector = VelocityVector.LEFT_TO_RIGHT;
                this.setVelocityX(enemySettings.speed);
            } else {
                this.velocityVector = VelocityVector.RIGHT_TO_LEFT;
                this.setVelocityX(-enemySettings.speed);
            }
        } else {
            if (this.y < 0) {
                this.velocityVector = VelocityVector.TOP_TO_BOTTOM;
                this.setVelocityY(enemySettings.speed);
            } else {
                this.velocityVector = VelocityVector.BOTTOM_TO_TOP;
                this.setVelocityY(-enemySettings.speed);
            }
        };
    }

    private getStartEnemyCoords(): Phaser.Math.Vector2 {
        const isHorizontal = Math.random() >= .5;
        const isLeft = Math.random() >= .5;
        const isTop = Math.random() >= .5;
        const gameWidth = Number(gameSettings.width);
        const gameHeight = Number(gameSettings.height);

        if (isHorizontal) {
            if (isLeft) {
                return new Phaser.Math.Vector2({
                    x: -enemySettings.startPositionOffset,
                    y: randomInteger(0, gameHeight)
                });
            } else {
                return new Phaser.Math.Vector2({
                    x: gameWidth + enemySettings.startPositionOffset,
                    y: randomInteger(0, gameHeight)
                });
            }
        } else {
            if (isTop) {
                return new Phaser.Math.Vector2({
                    x: randomInteger(0, gameWidth),
                    y: -enemySettings.startPositionOffset
                });
            } else {
                return new Phaser.Math.Vector2({
                    x: randomInteger(0, gameWidth),
                    y: gameHeight + enemySettings.startPositionOffset
                });
            }
        }
    }

    private getRandomDamage() {
        return randomInteger(enemySettings.minDamage, enemySettings.maxDamage);
    }

    private createAnimations() {
        this.anims.create({
            key: ANIMATION_KEYS.IDLE,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.enemy, { start: 0, end: 18 }),
            frameRate: 19,
            repeat: -1,
        });
    }
}
