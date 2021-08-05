import Phaser from 'phaser';
import { scoreBoardSettings } from './settings';
import { uiSettings } from '../../settings';
import { Player } from '../Player/Player';

export class ScoreBoard extends Phaser.GameObjects.Layer {
    scoreBoard: Phaser.GameObjects.Text;
    startTime: number = 0;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.scene.add.existing(this);
        this.startTime = this.scene.time.now;

        this.scoreBoard = this.add(scene.make.text({
            text: this.getInfoText(0, 0, 0),
        })) as Phaser.GameObjects.Text;
        this.scoreBoard.setOrigin(0, 0)
            .setX(scoreBoardSettings.offsetX)
            .setY(scoreBoardSettings.offsetY);
    }

    update(player: Player) {
        let time = this.scene.time.now - this.startTime;
        this.scoreBoard.setText(this.getInfoText(time, player.getHealth(), player.getSatiety()));
    }

    private getInfoText(time: number, health: number, satiety: number) {
        return `
${uiSettings.scoreBoard.timeText}${this.getTimeText(time)}
${uiSettings.scoreBoard.healthText}${health}
${uiSettings.scoreBoard.satietyText}${satiety.toFixed(2)}
        `;
    }

    private getTimeText(ms: number) {
        let seconds = Math.floor(ms / 1000);
        if (seconds < 60) {
            return `${seconds} сек.`;
        } else if (seconds < 3600) {
            return `${Math.floor(seconds / 60)} мин. ${seconds % 60} сек.`;
        } 
        let hours = Math.floor(seconds / 3600);
        let substractedSeconds = seconds % 3600;
        return `${hours} час. ${Math.floor(substractedSeconds / 60)} мин. ${substractedSeconds % 60} сек.`;
    }
}
