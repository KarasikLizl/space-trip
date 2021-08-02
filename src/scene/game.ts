import { SCENE_KEYS } from '../constants';
import { Enemy } from '../gameobjects/Enemy';
import { Food } from '../gameobjects/Food';
import { Player } from '../gameobjects/Player';
import { playerSettings } from '../settings';
import { logger } from '../utils';
import { ScoreBoard } from '../gameobjects/ScoreBoard';
import { ASSETS_MAP_KEY } from '../assets';

export class GameScene extends Phaser.Scene {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
    player: Player | null = null;
    food: Food | null = null;
    enemy: Enemy | null = null;
    scoreBoard: ScoreBoard | null = null;

    constructor() {
        super(SCENE_KEYS.GAME);
    }

    preload() {
        logger('preload', SCENE_KEYS.GAME, 'scene');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(0, 0, ASSETS_MAP_KEY.background).setScale(2);

        this.player = new Player(this, {
            x: playerSettings.startX,
            y: playerSettings.startY,
            health: playerSettings.startHealth,
            speed: playerSettings.startSpeed,
        });
        this.food = new Food(this, { speed: 0 });
        this.enemy = new Enemy(this, { speed: 0 });
        this.scoreBoard = new ScoreBoard(this);

        this.physics.add.overlap(this.player, this.food, (_, obj2) => this.player?.eat(obj2 as Food));
        this.physics.add.overlap(this.player, this.enemy, (_, obj2) => this.player?.setDamage(obj2 as Enemy));
        this.physics.add.overlap(this.enemy, this.food, (_, obj2) => this.enemy?.boost(obj2 as Food));
    }

    update(time: number) {
        this.checkPlayerStatus();
        if (this.cursors) {
            this.player?.update(this.cursors, time);
        }
        this.enemy?.update();
        this.scoreBoard?.update();
    }

    private checkPlayerStatus() {
        if (!this.player) {
            return;
        }

        const isEnd = this.player.getHealth() < 0 ||
            this.player.getSatiety() < .7;

        if (isEnd) {
            this.scene.start(SCENE_KEYS.END);
        }
    }
}
