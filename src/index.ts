import Phaser from 'phaser';
import { GamePlugin } from './GamePlugin';
import { ASSETS, ENEMY_IMAGE_KEY, FOOD_IMAGE_KEY, PLAYER_IMAGE_KEY } from './constants';
import { Player } from './gameobjects/Player';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
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
   player = (this.add as any).player(300, 300, 100);
   cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    player.updateInput(cursors);
}

new Phaser.Game(config);