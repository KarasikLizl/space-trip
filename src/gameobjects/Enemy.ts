import Phaser from 'phaser';
import { ENEMY_IMAGE_KEY } from '../constants';
import { enemySettings, gameSettings } from '../settings';
import { randomInteger } from '../utils';
import { Food } from './Food';
import { GameObject, GameObjectConfig } from "./GameObject";

export interface EnemyConfig extends GameObjectConfig {
    damage: number;
}

enum VelocityVector {
    TOP_TO_BOTTOM,
    LEFT_TO_RIGHT,
    BOTTOM_TO_TOP,
    RIGHT_TO_LEFT,
}

export class Enemy extends GameObject {
    damage: number;
    velocityVector: VelocityVector;
    constructor (scene: Phaser.Scene, config: EnemyConfig) {
        super(scene, { ...config, image: ENEMY_IMAGE_KEY });

        this.damage = config.damage;
        this.setDisplaySize(125, 125);
        this.velocityVector = 0;
        this.setScale(1.2);
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
        const coords = getStartEnemyCoords();
        this.setX(coords.x);
        this.setY(coords.y);
        setEnemyVelocity(this);
    }
}

export const getStartEnemyCoords = (): { x: number, y: number } => {
    const isHorizontal = Math.random() >= .5;
    const isLeft = Math.random() >= .5;
    const isTop = Math.random() >= .5;
    const gameWidth = Number(gameSettings.width);
    const gameHeight = Number(gameSettings.height);

    if (isHorizontal) {
        if (isLeft) {
            return {
                x: -enemySettings.startPositionOffset,
                y: randomInteger(0, gameHeight)
            };
        } else {
            return {
                x: gameWidth + enemySettings.startPositionOffset,
                y: randomInteger(0, gameHeight)
            }
        }
    } else {
        if (isTop) {
            return {
                x: randomInteger(0, gameWidth),
                y: -enemySettings.startPositionOffset
            };
        } else {
            return {
                x: randomInteger(0, gameWidth),
                y: gameHeight + enemySettings.startPositionOffset
            };
        }
    }
}

export const setEnemyVelocity = (enemy: Enemy) => {
    const isHorizontalVector = enemy.x < 0 || enemy.x > Number(gameSettings.width);
    enemy.setVelocity(0);

    if(isHorizontalVector) {
        if (enemy.x < 0) {
            enemy.velocityVector = VelocityVector.LEFT_TO_RIGHT;
            enemy.setVelocityX(enemySettings.speed);
        } else {
            enemy.velocityVector = VelocityVector.RIGHT_TO_LEFT;
            enemy.setVelocityX(-enemySettings.speed);
        }
    } else {
        if (enemy.y < 0) {
            enemy.velocityVector = VelocityVector.TOP_TO_BOTTOM;
            enemy.setVelocityY(enemySettings.speed);
        } else {
            enemy.velocityVector = VelocityVector.BOTTOM_TO_TOP;
            enemy.setVelocityY(-enemySettings.speed);
        }
    };
}

export const getRandomDamage = () => randomInteger(enemySettings.minDamage, enemySettings.maxDamage);