import Phaser from 'phaser';
import { ENEMY_IMAGE_KEY } from '../constants';
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
}
