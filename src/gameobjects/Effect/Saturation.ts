import { Player } from '../Player/Player';
import { Effect, EffectTarget } from './Effect';

export class Saturation extends Effect {
    private saturation: number;
    protected duration: number = 0;

    constructor(damage: number) {
        super();

        this.saturation = damage;
    }

    start(target: EffectTarget ,now: number) {
        super.start(target, now);
        if (this.target instanceof Player) {
            this.target.updateSetiety(this.saturation);
        }
    }
}
