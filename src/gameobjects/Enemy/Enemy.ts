import Phaser from 'phaser';
import { ASSETS_MAP_KEY } from '../../assets';
import { ANIMATION_KEYS } from '../../constants';
import { enemySettings } from './settings';
import { globalSettings } from '../../settings';
import { randomInteger } from '../../utils';
import { GameObject, GameObjectConfig } from "../GameObject/GameObject";
import { Damage } from '../Effect/Damage';

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

        this.setSize(enemySettings.width, enemySettings.height);
        this.body.setSize(enemySettings.width, enemySettings.height);
        this.play(ANIMATION_KEYS.IDLE);
    }

    setSpeed(speed: number) {
        super.setSpeed(speed);

        switch(this.velocityVector) {
            case VelocityVector.TOP_TO_BOTTOM: {
                this.setVelocityY(this.speed);
                break;
            }
            case VelocityVector.RIGHT_TO_LEFT: {
                this.setVelocityX(-this.speed);
                break;
            }
            case VelocityVector.BOTTOM_TO_TOP: {
                this.setVelocityY(-this.speed);
                break;
            }
            case VelocityVector.LEFT_TO_RIGHT: {
                this.setVelocityX(this.speed);
                break;
            }
        }
    }

    getDamageEffect(): Damage {
        return new Damage(this.damage);
    }

    update() {
        const gameWidth = Number(globalSettings.width);
        const gameHeight = Number(globalSettings.height);

        if (this.x > gameWidth + enemySettings.resetPositionOffset) {
            this.reset();
        } else if (this.x < (0 - (gameWidth + enemySettings.resetPositionOffset))) {
            this.reset();
        } else if (this.y < (0 - (gameHeight + enemySettings.resetPositionOffset))) {
            this.reset();
        } else if (this.y > gameHeight + enemySettings.resetPositionOffset) {
            this.reset();
        }
    }

    reset() {
        const coords = this.getStartEnemyCoords();
        this.setX(coords.x);
        this.setY(coords.y);
        this.damage = this.getRandomDamage();
        this.initMovement();
    }

    protected init() {
        super.init();

        this.createAnimations();
    }

    private initMovement() {
        const isHorizontalVector = this.x < 0 || this.x > Number(globalSettings.width);
        this.setVelocity(0);

        if(isHorizontalVector) {
            if (this.x < 0) {
                this.velocityVector = VelocityVector.LEFT_TO_RIGHT;
            } else {
                this.velocityVector = VelocityVector.RIGHT_TO_LEFT;
            }
        } else {
            if (this.y < 0) {
                this.velocityVector = VelocityVector.TOP_TO_BOTTOM;
            } else {
                this.velocityVector = VelocityVector.BOTTOM_TO_TOP;
            }
        };

        this.setSpeed(enemySettings.speed);
    }

    private getStartEnemyCoords(): Phaser.Math.Vector2 {
        const isHorizontal = Math.random() >= .5;
        const isLeft = Math.random() >= .5;
        const isTop = Math.random() >= .5;
        const gameWidth = Number(globalSettings.width);
        const gameHeight = Number(globalSettings.height);

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

    protected createAnimations() {
        this.anims.create({
            key: ANIMATION_KEYS.IDLE,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.enemy, { frames: [randomInteger(0, 3)] }),
            frameRate: 19,
            repeat: -1,
        });
    }
}
