import { SCENE_KEYS } from '../constants';
import { Food } from '../gameobjects/Food/Food';
import { Player, PlayerEvents } from '../gameobjects/Player/Player';
import { logger } from '../utils';
import { ScoreBoard } from '../gameobjects/ScoreBoard/ScoreBoard';
import { ASSETS_MAP_KEY } from '../assets';
import { Enemy } from '../gameobjects/Enemy/Enemy';
import { EnemyGroup } from '../gameobjects/Enemy/EnemyGroup';
import { FoodGroup } from '../gameobjects/Food/FoodGroup';

export class GameScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: Player;
    private foodGroup!: FoodGroup;
    private enemyGroup!: EnemyGroup;
    private scoreBoard!: ScoreBoard;

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

        this.physics.add.overlap(this.player, this.foodGroup, (_, obj2) => this.player.eat(obj2 as Food));
        this.physics.add.overlap(this.player, this.enemyGroup, (_, obj2) => this.player.setDamage(obj2 as Enemy));
        this.physics.add.overlap(this.foodGroup, this.enemyGroup, (obj1, enemy) => (enemy as Enemy).boost(obj1 as Food));
    }

    update(time: number) {
        this.player.update(this.cursors, time);
        this.enemyGroup.update();
        this.scoreBoard.update();
    }

    private createPlayer() {
        this.player = new Player(this);
        this.player.on(PlayerEvents.DIE, () => {
            this.scene.start(SCENE_KEYS.END);
        });
    }

    private createFoods() {
        this.foodGroup = new FoodGroup(this.physics.world, this);
    }

    private createEnemies() {
        this.enemyGroup = new EnemyGroup(this.physics.world, this);
    }
}
