import { Player } from '../Player/Player';
import { Effect, EffectTarget } from './Effect';

export class Hungry extends Effect {
    lasEatTime: number = 0;

    private hungryDelay = 5000;
    private hungryDamage = 10;
    protected duration: number = Infinity;

    start(target: EffectTarget, now: number) {
        super.start(target, now);

        this.lasEatTime = now;
    }

    update(now: number) {
        if (now > this.lasEatTime + this.hungryDelay) {
            if (this.target instanceof Player) {
                this.target.updateSetiety(-this.hungryDamage);
                this.lasEatTime = now;
            }
        }
    }
}
