import Phaser from 'phaser';
import { foodGroupSettings } from './settings';
import { wait } from '../../utils';
import { Food } from './Food';

export class FoodGroup extends Phaser.Physics.Arcade.Group {
    private foods: Food[] = [];

    constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
        super(world, scene);

        this.classType = Food;
        this.init();
    }

    protected async init() {
        for(let i = 0; i < foodGroupSettings.maxFoodOnScene; i ++) {
            await wait(foodGroupSettings.createDelay);
            if (!this.active) {
                return;
            }
            const food = new Food(this.scene, { speed: 0 });
            this.foods.push(food);
            this.add(food);
            this.createAnimations(food);
            // TODO: почему то добавление врага в группу убирает скорость. Подумать, в чем причина.
            food.reset();
        }
    }

    protected createAnimations(food: Food) {
        this.scene.tweens.add({
            targets: food,
            scale: 1.1,
            props: {
                scale: { value: 1.5, duration: 1000 },
            },
            repeat: -1,
            yoyo: true,
        });
    }

    stop() {
        this.foods.forEach((food) => food.stop());
        this.active = false;
    }
}
