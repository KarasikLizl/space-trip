import Phaser from "phaser";
import { ANIMATION_KEYS } from '../../constants';
import { GameObject } from "../GameObject/GameObject";
import { playerSettings } from './settings';
import { ASSETS_MAP_KEY } from '../../assets';
import { Hungry } from '../Effect/Hungry';
import { Effect } from '../Effect/Effect';
import { Saturation } from '../Effect/Saturation';

/**
 * move direction:
 * 0000 - idle
 * 1000 - вверх
 * 100 - вправо
 * 10 - вниз
 * 1 - влево
 * 1100 - вверх вправо
 * 110 - вправо вниз
 * 11 - вниз влево
 * 1001 - вверх влево
 */

enum PlayerGameState {
    IDLE = 'idle',
    MOVING = 'moving',
    DIE = 'die'
}

export enum PlayerEvents {
    DIE = 'die',
}

export class Player extends GameObject {
    private health: number = 0;
    private satiety: number;
    private gameState: PlayerGameState = PlayerGameState.IDLE;

    constructor (scene: Phaser.Scene) {
        super(scene, {
            x: playerSettings.startX,
            y: playerSettings.startY,
            speed: playerSettings.startSpeed,
        });

        this.satiety = playerSettings.startSatiety;
        this.health = playerSettings.startHealth;
        const hungryEffect = new Hungry();
        hungryEffect.start(this, this.scene.time.now);
        this.effects.push(hungryEffect);

        this.playAnimation(ANIMATION_KEYS.IDLE);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        if (this.isDead()) {
            return;
        }

        this.checkEffects();
        this.updateEffects();

        this.setVelocity(0);
        const shouldMove = (
            cursors.left.isDown ||
            cursors.right.isDown ||
            cursors.up.isDown ||
            cursors.down.isDown
        );

        let directionMove = this.getDirectionMove(cursors);
        this.updateVelocity(directionMove);

        if (shouldMove) {
            this.toggleMoveAnimations(true, directionMove);
        } else if (!shouldMove && this.isMoving()) {
            this.toggleMoveAnimations(false);
        }

        this.checkDieStatus();
    }

    getSpeed() {
        return this.speed * (1 / this.satiety);
    }

    getHealth() {
        return this.health;
    }

    getSatiety() {
        return this.satiety || 0;
    }

    die() {
        this.setVelocity(0);
        this.playAnimation(ANIMATION_KEYS.DIE);
        this.emit(PlayerEvents.DIE);
    }

    updateSetiety(saturation: number) {
        this.setScale(this.scale + saturation / playerSettings.scaleQ);
        this.satiety += saturation / playerSettings.satietyQ;
        this.health += saturation;
    }

    addEffect(effect: Effect) {
        super.addEffect(effect);

        if (effect instanceof Saturation) {
            (this.effects[0] as Hungry).lasEatTime = this.scene.time.now;
        }
    }

    private playAnimation(key: ANIMATION_KEYS, ignoreIfPlaying?: boolean) {
        super.play(key as string, ignoreIfPlaying);

        switch(key) {
            case ANIMATION_KEYS.IDLE:
                this.gameState = PlayerGameState.IDLE;
                break;
            case ANIMATION_KEYS.DIE:
                this.gameState = PlayerGameState.DIE;
                break;
            default:
                this.gameState = PlayerGameState.MOVING;
                break;
        }

        return this;
    }

    protected init() {
        super.init();

        this.setCollideWorldBounds(true);
        this.createAnimations();
    }

    private isDead() {
        return this.gameState === PlayerGameState.DIE;
    }

    private isMoving() {
        return this.gameState !== PlayerGameState.DIE &&
            this.gameState !== PlayerGameState.IDLE;
    }

    private updateVelocity(direction: number) {
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

    // TODO: сделать общим методом в GameObject.ts
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

    private toggleMoveAnimations(move: boolean, direction?: number) {
        this.stop();
        if (move) {
            switch(direction) {
                case 1000:
                    this.playAnimation(ANIMATION_KEYS.MOVE_TOP);
                    break;
                case 1100:
                    this.playAnimation(ANIMATION_KEYS.MOVE_TOP_RIGHT);
                    break;
                case 100:
                    this.playAnimation(ANIMATION_KEYS.MOVE_RIGHT);
                    break;
                case 110:
                    this.playAnimation(ANIMATION_KEYS.MOVE_BOTTOM_RIGHT);
                    break;
                case 10:
                    this.playAnimation(ANIMATION_KEYS.MOVE_BOTTOM);
                    break;
                case 1001:
                    this.playAnimation(ANIMATION_KEYS.MOVE_TOP_LEFT);
                    break;
                case 1:
                    this.playAnimation(ANIMATION_KEYS.MOVE_LEFT);
                    break;
                case 11:
                    this.playAnimation(ANIMATION_KEYS.MOVE_BOTTOM_LEFT);
                    break;
                default: break;
            }
        } else {
            this.playAnimation(ANIMATION_KEYS.IDLE);
        }
    }

    protected createAnimations() {
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

        this.anims.create({
            key: ANIMATION_KEYS.DIE,
            frames: this.anims.generateFrameNumbers(ASSETS_MAP_KEY.player, { frames: [15] }),
            frameRate: 1,
            repeat: 0,
        });
    }

    private checkDieStatus() {
        const isEnd = this.getHealth() < playerSettings.minHealth ||
        this.getSatiety() < playerSettings.minSatiety;

        if (isEnd) {
            this.die();
        }
    }
}
