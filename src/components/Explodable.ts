import { Entity } from "../ecs";

export type onExplodeCallback = (entity: Entity) => void;

export type ExplosionStatus = 'ready' | 'explode' | 'exploded';

export class Explodable {
    private _status: ExplosionStatus;
    private _onExplode: onExplodeCallback;

    constructor(onExplode: onExplodeCallback) {
        this._status = 'ready'
        this._onExplode = onExplode;
    }

    explode() {
        if (this._status === 'ready') {
            this._status = 'explode'
        }
    }

    onExplode(entity: Entity) {
        if (this._status !== 'explode') return;
        this._status = "exploded"
        return this._onExplode(entity)
    }

    get status(): ExplosionStatus {
        return this._status;
    }
}