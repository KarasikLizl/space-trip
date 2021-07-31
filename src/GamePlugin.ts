import Phaser from "phaser";

function createPlayer (x: number, y: number) {
    return this.displayList.add(new Player(this.scene, x, y));
}
export class GamePlugin extends Phaser.Plugins.BasePlugin {
    constructor (pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('player', createPlayer);
        
        console.log(this);
    }
}
