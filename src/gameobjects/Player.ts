import Phaser from "phaser";
import { PLAYER_IMAGE_KEY } from '../constants';
import { GameObject } from "./GameObject";

const defaultSpeed = 10;

export class Player extends GameObject {
    health: number;
    constructor (scene: Phaser.Scene, x: number, y: number, health: number) {
        super(scene, x, y, defaultSpeed, PLAYER_IMAGE_KEY);

        this.health = health;
        this.setDisplaySize(75, 75);
    }

    updateInput(cursor: Phaser.Types.Input.Keyboard.CursorKeys) {
        /**
         * TODO: здесь нужно будет реализовать обработку нажатия клавиш.
         * Функция будет вызываться каждый тик игрового цикла.
         * Пример тут: http://labs.phaser.io/edit.html?src=src\input\keyboard\cursor%20keys.js.
         * Нужно сделать так, что бы игрок двигался.
         */
    }
}
