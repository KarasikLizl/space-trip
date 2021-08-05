import { Player } from '../Player/Player';
import { Enemy } from '../Enemy/Enemy';

export type EffectTarget = Player | Enemy;

export class Effect {
    isEnded: boolean = false;

    protected target!: EffectTarget;
    protected startTime!: number;
    protected duration: number = 0;

    start(target: EffectTarget, now: number) {
        this.target = target;
        this.startTime = now;
    }

    update(now: number) {
        if (this.isEnded) {
            return;
        }

        if (now > this.startTime + this.duration) {
            this.isEnded = true;
        }
    }

    end(now: number) {}
}
