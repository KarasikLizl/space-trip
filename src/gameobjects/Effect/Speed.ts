import { Effect, EffectTarget } from './Effect';

export class Speed extends Effect {
    private speed: number = 100;

    constructor (speed?: number) {
        super();
        this.speed = speed || this.speed;
    }

    start(target: EffectTarget ,now: number) {
        super.start(target, now);
        this.target.setSpeed(this.target.speed + this.speed);
    }
}
