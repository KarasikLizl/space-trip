import Phaser from 'phaser';
import { ANIMATION_KEYS, ASSETS, BG_IMAGE_KEY, FOOD_IMAGE_KEY, ENEMY_IMAGE_KEY } from './constants';
import { Enemy, getStartEnemyCoords, setEnemyVelocity } from './gameobjects/Enemy';
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
let enemy: Enemy;

function preload(this: Phaser.Scene) {
    this.load.image(ENEMY_IMAGE_KEY, ASSETS.enemyMoveRightImgs[0]);
    this.load.image(FOOD_IMAGE_KEY, ASSETS.foodImg);
    this.load.image(BG_IMAGE_KEY, ASSETS.bgImg);

    this.load.image(ANIMATION_KEYS.PLAYER_IDLE, ASSETS.playerMoveRightImgs[1]);
    this.load.image(ANIMATION_KEYS.PLAYER_MOVE_TOP_RIGHT, ASSETS.playerMoveRightImgs[0]);
    this.load.image(ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_RIGHT, ASSETS.playerMoveRightImgs[2]);
    this.load.image(ANIMATION_KEYS.PLAYER_MOVE_TOP_LEFT, ASSETS.playerMoveLeftImgs[0]);
    this.load.image(ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_LEFT, ASSETS.playerMoveLeftImgs[1]);
}

function create(this: Phaser.Scene) {
    cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, BG_IMAGE_KEY).setScale(1.5);
    createPlayerAnimations.call(this);

    player = new Player(this, {
        x: playerSettings.startX,
        y: playerSettings.startY,
        health: playerSettings.startHealth,
        speed: playerSettings.startSpeed,
        image: ANIMATION_KEYS.PLAYER_IDLE,
    });
    food = new Food(this, {
        x: randomInteger(0, Number(gameSettings.width)),
        y: randomInteger(0, Number(gameSettings.height)),
        saturation: getRandomSaturation(),
        speed: 0,
        image: FOOD_IMAGE_KEY,
    });
    enemy = new Enemy(this, {
        ...getStartEnemyCoords(),
        damage: getRandomSaturation(),
        speed: 0,
        image: ENEMY_IMAGE_KEY,
    });
    setEnemyVelocity(enemy);

    this.physics.add.overlap(player, food, (_, obj2) => player.eat(obj2 as Food));
    this.physics.add.overlap(player, enemy, (_, obj2) => player.getDamage(obj2 as Enemy));
    this.physics.add.overlap(enemy, food, (_, obj2) => enemy.boost(obj2 as Food));
}

function createPlayerAnimations(this: Phaser.Scene) {
    this.anims.create({
        key: ANIMATION_KEYS.PLAYER_IDLE,
        frames: [
            { key: ANIMATION_KEYS.PLAYER_IDLE }
        ],
        frameRate: 1,
        repeat: -1,
    });

    this.anims.create({
        key: ANIMATION_KEYS.PLAYER_MOVE_TOP_LEFT,
        frames: [
            { key: ANIMATION_KEYS.PLAYER_MOVE_TOP_LEFT }
        ],
        frameRate: 1,
        repeat: -1,
    });

    this.anims.create({
        key: ANIMATION_KEYS.PLAYER_MOVE_TOP_RIGHT,
        frames: [
            { key: ANIMATION_KEYS.PLAYER_MOVE_TOP_RIGHT }
        ],
        frameRate: 1,
        repeat: -1,
    });

    this.anims.create({
        key: ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_RIGHT,
        frames: [
            { key: ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_RIGHT }
        ],
        frameRate: 1,
        repeat: -1,
    });


    this.anims.create({
        key: ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_LEFT,
        frames: [
            { key: ANIMATION_KEYS.PLAYER_MOVE_BOTTOM_LEFT }
        ],
        frameRate: 1,
        repeat: -1,
    });
}

function update() {
    player.update(cursors);
    enemy.update();
}

new Phaser.Game(config);