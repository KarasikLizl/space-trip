import Phaser from 'phaser';
import { ASSETS, ENEMY_IMAGE_KEY, FOOD_IMAGE_KEY, PLAYER_IMAGE_KEY } from './constants';
import { Food, getRandomSaturation } from './gameobjects/Food';
import { Player } from './gameobjects/Player';
import { gameSettings, playerSettings } from './settings';
import { randomInteger } from './utils';

const config: Phaser.Types.Core.GameConfig = {
    ...gameSettings,
    scene: {
        preload,
        create,
        update,
    },
};

let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let player: Player;
let food: Food;

function preload(this: Phaser.Scene) {
    this.load.image(PLAYER_IMAGE_KEY, ASSETS.playerImg);
    this.load.image(ENEMY_IMAGE_KEY, ASSETS.enemyImg);
    this.load.image(FOOD_IMAGE_KEY, ASSETS.foodImg);
}

function create(this: Phaser.Scene) {
    cursors = this.input.keyboard.createCursorKeys();
    player = new Player(this, {
        x: playerSettings.startX,
        y: playerSettings.startY,
        health: playerSettings.startHealth,
        speed: playerSettings.startSpeed,
        image: PLAYER_IMAGE_KEY
    });
    food = new Food(this, {
        x: randomInteger(0, Number(gameSettings.width)),
        y: randomInteger(0, Number(gameSettings.height)),
        saturation: getRandomSaturation(),
        speed: 0,
        image: FOOD_IMAGE_KEY
    });

    this.physics.add.overlap(player, food, (_, obj2) => player.eat(obj2 as Food));
}

function update() {
    player.update(cursors);
}

new Phaser.Game(config);