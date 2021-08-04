import Phaser from 'phaser';
import { Enemy } from './Enemy';
import { enemyGroupSettings } from '../settings';
import { wait } from '../utils';

export class EnemyGroup extends Phaser.Physics.Arcade.Group {
    private enemies: Enemy[] = [];

    constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
        super(world, scene);

        this.classType = Enemy;
        this.init();
    }

    protected async init() {
        for(let i = 0; i < enemyGroupSettings.count; i ++) {
            await wait(enemyGroupSettings.createDelay);
            const enemy = new Enemy(this.scene, { speed: 0 });
            this.enemies.push(enemy);
            this.add(enemy);
            // TODO: почему то добавление врага в группу убирает скорость. Подумать, в чем причина.
            enemy.reset();
        }
    }

    update() {
        this.enemies.forEach((enemy) => enemy.update());
    }
}
