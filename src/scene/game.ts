import { SCENE_KEYS } from '../constants';
import { Food } from '../gameobjects/Food/Food';
import { Player, PlayerEvents } from '../gameobjects/Player/Player';
import { logger } from '../utils';
import { ScoreBoard } from '../gameobjects/ScoreBoard/ScoreBoard';
import { ASSETS_MAP_KEY } from '../assets';
import { Enemy } from '../gameobjects/Enemy/Enemy';
import { EnemyGroup } from '../gameobjects/Enemy/EnemyGroup';
import { FoodGroup } from '../gameobjects/Food/FoodGroup';
import { Speed } from '../gameobjects/Effect/Speed';

enum GameState {
    RUN = 'run',
    END = 'end',
}

export class GameScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: Player;
    private foodGroup!: FoodGroup;
    private enemyGroup!: EnemyGroup;
    private scoreBoard!: ScoreBoard;
    private gameState: GameState = GameState.RUN;

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

        this.physics.add.overlap(this.player, this.foodGroup, (obj1, obj2) => {
            const player = obj1 as Player;
            const food = obj2 as Food;
            const saturationEffect = food.getSaturationEffect();

            player.addEffect(saturationEffect);
            food.reset();
        });
        this.physics.add.overlap(this.player, this.enemyGroup, (obj1, obj2) => {
            const player = obj1 as Player;
            const enemy = obj2 as Enemy;
            const damageEffect = enemy.getDamageEffect();
            player.addEffect(damageEffect);
            enemy.reset();
        });
        this.physics.add.overlap(this.foodGroup, this.enemyGroup, (obj1, obj2) => {
            const food = obj1 as Food;
            const enemy = obj2 as Enemy;
            const speedEffect = new Speed();
            enemy.addEffect(speedEffect);
            food.reset();
        });
    }

    update(time: number) {
        if (this.gameState === GameState.END) {
            return;
        }

        this.player.update(this.cursors);
        this.enemyGroup.update();
        this.scoreBoard.update();
    }

    private createPlayer() {
        this.player = new Player(this);
        this.player.on(PlayerEvents.DIE, () => {
            this.gameState = GameState.END;
            setTimeout(() => {
                this.scene.start(SCENE_KEYS.END);
            }, 1000);
        });
    }

    private createFoods() {
        this.foodGroup = new FoodGroup(this.physics.world, this);
    }

    private createEnemies() {
        this.enemyGroup = new EnemyGroup(this.physics.world, this);
    }
}
