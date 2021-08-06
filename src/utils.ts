import { ASSETS_MAP_KEY } from './assets';
import { globalSettings } from './settings';

export const randomInteger = (min: number, max: number) => {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export const logger = (...args: any[]) => {
    if (globalSettings.physics?.arcade?.debug) {
        console.info(...args);
    }
}

export const wait = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface WandingConfig {
    maxSpeed: number;
    minSpeed: number;
    startPositionX: number;
    startPositionY: number;
    image: string;
    frame: number;
}

export const createWandingObject = (scene: Phaser.Scene, config: WandingConfig) => {
    const wandingObject = scene.physics.add.sprite(
        config.startPositionX,
        config.startPositionY,
        config.image,
        config.frame,
    );
    wandingObject
        .setScale(2)
        .setBounceX(1)
        .setBounceY(1)
        .setCollideWorldBounds(true)
        .setVelocity(
            randomInteger(config.minSpeed, config.maxSpeed),
            randomInteger(config.minSpeed, config.maxSpeed),
        );

    return wandingObject;
}

export const createBackground = (scene: Phaser.Scene) => {
    const globalWidth = Number(globalSettings.width);
    const globalHeight = Number(globalSettings.height);
    const background = scene.add.image(globalWidth / 2, globalHeight / 2, ASSETS_MAP_KEY.background)
        .setOrigin(.5, .5);
    // Based on your game size, it may "stretch" and distort.
    background.displayWidth = globalWidth;
    background.displayHeight = globalHeight;
}

export const infinityRotate = (object: Phaser.Physics.Arcade.Sprite, speed: number) => {
    if (object.angle === 359) {
        object.angle = 0;
    } else {
        object.setAngle(object.angle + speed);
    }
}