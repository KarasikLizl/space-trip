import Phaser from 'phaser';
import { gameSettings, scoreBoardSettings } from '../settings';

export class ScoreBoard extends Phaser.GameObjects.Layer {
    scoreBoard: Phaser.GameObjects.Text;
    score: number = 0;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.scene.add.existing(this);

        this.scoreBoard = this.add(scene.make.text({
            text: this.getScoreText(this.score),
        })) as Phaser.GameObjects.Text;
        this.scoreBoard.setOrigin(1, 0)
            .setX(Number(gameSettings.width) - scoreBoardSettings.offset)
            .setY(scoreBoardSettings.offset);

        // TODO: нужно добавить остальную информацию об игре.
    }

    update() {
        this.score++;
        this.scoreBoard.setText(this.getScoreText(this.score));
    }

    private getScoreText(score: number) {
        return `Score: ${score}`;
    }
}
