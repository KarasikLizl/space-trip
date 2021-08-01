import Phaser from 'phaser';
import { ENEMY_IMAGE_KEY } from '../constants';
import { enemySettings, gameSettings } from '../settings';
import { randomInteger } from '../utils';
import { GameObject, GameObjectConfig } from "./GameObject";

export interface EnemyConfig extends GameObjectConfig {
    damage: number;
}

export class Enemy extends GameObject {
    damage: number;
    constructor (scene: Phaser.Scene, config: EnemyConfig) {
        super(scene, { ...config, image: ENEMY_IMAGE_KEY });

        this.damage = config.damage;
        this.setDisplaySize(125, 125);
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

    reset() {
        const coords = getStartEnemyCoords();
        console.log(coords);
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
            enemy.setVelocityX(enemySettings.speed);
        } else {
            enemy.setVelocityX(-enemySettings.speed);
        }
    } else {
        if (enemy.y < 0) {
            enemy.setVelocityY(enemySettings.speed);
        } else {
            enemy.setVelocityY(-enemySettings.speed);
        }
    };
}
