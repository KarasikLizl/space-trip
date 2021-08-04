import Phaser from 'phaser';
import { MenuScene } from './scene/menu';
import { GameScene} from './scene/game';
import { EndScene } from './scene/end';
import { BootScene } from './scene/boot';
import { PreloadScene } from './scene/preload';
import { globalSettings } from './settings';

const config: Phaser.Types.Core.GameConfig = {
    ...globalSettings,
    scene: [BootScene, PreloadScene, MenuScene, GameScene, EndScene],
};

new Phaser.Game(config);