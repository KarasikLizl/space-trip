import Phaser from 'phaser';
import { scoreBoardSettings } from './settings';
import { uiSettings } from '../../settings';
import { Player } from '../Player/Player';

export class ScoreBoard extends Phaser.GameObjects.Layer {
    board: Phaser.GameObjects.Text;
    startTime: number = 0;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.scene.add.existing(this);

        this.board = this.add(scene.make.text({
            text: this.getInfoText(0, 0, 0),
            style: {
                fontFamily: uiSettings.font,
            }
        })) as Phaser.GameObjects.Text;
        this.board.setOrigin(0, 0)
            .setX(scoreBoardSettings.offsetX)
            .setY(scoreBoardSettings.offsetY);

        this.startTime = this.scene.time.now;
    }

    update(player: Player) {
        let time = this.scene.time.now - this.startTime;
        this.board.setText(this.getInfoText(time, player.getHealth(), player.getSatiety()));
    }

    private getInfoText(time: number, health: number, satiety: number) {
        return `
${scoreBoardSettings.ui.timeText}${this.getTimeText(time)}
${scoreBoardSettings.ui.healthText}${health}
${scoreBoardSettings.ui.satietyText}${satiety.toFixed(2)}
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
