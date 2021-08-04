import Phaser from 'phaser';
import { foodGroupSettings } from '../settings';
import { wait } from '../utils';
import { Food } from './Food';

export class FoodGroup extends Phaser.Physics.Arcade.Group {
    private foods: Food[] = [];

    constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
        super(world, scene);

        this.classType = Food;
        this.init();
    }

    protected async init() {
        for(let i = 0; i < foodGroupSettings.count; i ++) {
            await wait(foodGroupSettings.createDelay);
            const food = new Food(this.scene, { speed: 0 });
            this.foods.push(food);
            this.add(food);
            // TODO: почему то добавление врага в группу убирает скорость. Подумать, в чем причина.
            food.reset();
        }
    }
}
