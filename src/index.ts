import Phaser from 'phaser';
import { MenuScene } from './scene/Menu/menu';
import { GameScene} from './scene/Game/game';
import { EndScene } from './scene/End/end';
import { BootScene } from './scene/Boot/boot';
import { PreloadScene } from './scene/Preload/preload';
import { MobileError } from './scene/MobileError/mobileError';
import { globalSettings } from './settings';

const config: Phaser.Types.Core.GameConfig = {
    ...globalSettings,
    scene: [BootScene, PreloadScene, MenuScene, GameScene, EndScene, MobileError],
};

new Phaser.Game(config);