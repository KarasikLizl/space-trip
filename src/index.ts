import Phaser from 'phaser';
import { ExtendedGameFactory, GamePlugin } from './GamePlugin';
import { ASSETS, ENEMY_IMAGE_KEY, FOOD_IMAGE_KEY, PLAYER_IMAGE_KEY } from './constants';
import { Player } from './gameobjects/Player';
import { gameSettings } from './settings';

const config: Phaser.Types.Core.GameConfig = {
    ...gameSettings,
    scene: {
        preload,
        create,
        update,
    },
    plugins: {
        global: [
            { key: 'GamePlugin', plugin: GamePlugin, start: true}
        ]
    }
};

let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let player: Player;

function preload(this: Phaser.Scene) {
    this.load.image(PLAYER_IMAGE_KEY, ASSETS.playerImg);
    this.load.image(ENEMY_IMAGE_KEY, ASSETS.enemyImg);
    this.load.image(FOOD_IMAGE_KEY, ASSETS.foodImg);
}

function create(this: Phaser.Scene) {
   player = (this.add as ExtendedGameFactory).player({ x: 300, y: 300, health: 100, speed: 25, image: PLAYER_IMAGE_KEY }) as Player;
   cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    player.updateInput(cursors);
}

new Phaser.Game(config);