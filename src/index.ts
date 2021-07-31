import Phaser from 'phaser';
import { GamePlugin } from './GamePlugin';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    },
    plugins: {
        global: [
            { key: 'GamePlugin', plugin: GamePlugin, start: true}
        ]
    }
};

function preload(this: Phaser.Scene) {
    
}

function create(this: Phaser.Scene) {
   
}

new Phaser.Game(config);