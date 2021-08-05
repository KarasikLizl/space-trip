import { Player } from '../Player/Player';
import { Effect, EffectTarget } from './Effect';

export class Damage extends Effect {
    private damage: number;

    constructor(damage: number) {
        super();

        this.damage = damage;
    }

    start(target: EffectTarget ,now: number) {
        super.start(target, now);
        const player = this.target as Player;
        player.updateSetiety(-this.damage);
    }
}
