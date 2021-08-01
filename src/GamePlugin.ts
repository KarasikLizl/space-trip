import Phaser from "phaser";
import { ENEMY_OBJECT_KEY, FOOD_OBJECT_KEY, PLAYER_OBJECT_KEY } from './constants';
import { Enemy, EnemyConfig } from './gameobjects/Enemy';
import { Food, FoodConfig } from './gameobjects/Food';
import { Player, PlayerConfig } from './gameobjects/Player';

function createPlayer(this: Phaser.GameObjects.GameObjectFactory, config: PlayerConfig) {
    return this.displayList.add(new Player(this.scene, config));
}

function createFood(this: Phaser.GameObjects.GameObjectFactory, config: FoodConfig) {
    return this.displayList.add(new Food(this.scene, config));
}

function createEnemy(this: Phaser.GameObjects.GameObjectFactory, config: EnemyConfig) {
    return this.displayList.add(new Enemy(this.scene, config));
}

export class GamePlugin extends Phaser.Plugins.BasePlugin {
    constructor (pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);

        // Register our new Game Object type
        pluginManager.registerGameObject(PLAYER_OBJECT_KEY, createPlayer);
        pluginManager.registerGameObject(FOOD_OBJECT_KEY, createFood);
        pluginManager.registerGameObject(ENEMY_OBJECT_KEY, createEnemy);
    }
}

export interface ExtendedGameFactory extends Phaser.GameObjects.GameObjectFactory {
    player: typeof createPlayer,
    food: typeof createFood,
    enemy: typeof createEnemy,
}
