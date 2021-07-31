import Phaser from "phaser";
import { ENEMY_OBJECT_KEY, FOOD_OBJECT_KEY, PLAYER_OBJECT_KEY } from './constants';
import { Enemy } from './gameobjects/Enemy';
import { Food } from './gameobjects/Food';
import { Player } from './gameobjects/Player';

function createPlayer (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, health: number) {
    return this.displayList.add(new Player(this.scene, x, y, health));
}

function createFood (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, saturation: number) {
    return this.displayList.add(new Food(this.scene, x, y, saturation));
}

function createEnemy (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, damage: number) {
    return this.displayList.add(new Enemy(this.scene, x, y, damage));
}

export class GamePlugin extends Phaser.Plugins.BasePlugin {
    constructor (pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject(PLAYER_OBJECT_KEY, createPlayer);
        pluginManager.registerGameObject(FOOD_OBJECT_KEY, createFood);
        pluginManager.registerGameObject(ENEMY_OBJECT_KEY, createEnemy);
    }
}
