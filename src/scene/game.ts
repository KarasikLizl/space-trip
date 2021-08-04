import { SCENE_KEYS } from '../constants';
import { Food } from '../gameobjects/Food';
import { Player, PlayerEvents } from '../gameobjects/Player';
import { playerSettings } from '../settings';
import { logger } from '../utils';
import { ScoreBoard } from '../gameobjects/ScoreBoard';
import { ASSETS_MAP_KEY } from '../assets';
import { Enemy } from '../gameobjects/Enemy';
import { EnemyGroup } from '../gameobjects/EnemyGroup';

export class GameScene extends Phaser.Scene {
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    player!: Player;
    food!: Food;
    enemyGroup!: EnemyGroup;
    scoreBoard!: ScoreBoard;

    constructor() {
        super(SCENE_KEYS.GAME);
    }

    preload() {
        logger('preload', SCENE_KEYS.GAME, 'scene');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(0, 0, ASSETS_MAP_KEY.background).setScale(2);

        this.createPlayer();
        this.createFoods();
        this.createEnemies();
        this.scoreBoard = new ScoreBoard(this);

        this.physics.add.overlap(this.player, this.food, (_, obj2) => this.player.eat(obj2 as Food));
        this.physics.add.overlap(this.player, this.enemyGroup, (_, obj2) => this.player.setDamage(obj2 as Enemy));
        this.physics.add.overlap(this.enemyGroup, this.food, (obj1, enemy) => (enemy as Enemy).boost(obj1 as Food));
    }

    update(time: number) {
        this.player.update(this.cursors, time);
        this.enemyGroup.update();
        this.scoreBoard.update();
    }

    private createPlayer() {
        this.player = new Player(this, {
            x: playerSettings.startX,
            y: playerSettings.startY,
            health: playerSettings.startHealth,
            speed: playerSettings.startSpeed,
            satiety: playerSettings.baseSatiety,
        });
        this.player.on(PlayerEvents.DIE, () => {
            this.scene.start(SCENE_KEYS.END);
        });
    }

    private createFoods() {
        this.food = new Food(this, { speed: 0 });
    }

    private createEnemies() {
        this.enemyGroup = new EnemyGroup(this.physics.world, this);
    }
}
