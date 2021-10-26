import { Entity } from "../ecs";

export type KeyCallbacks = {
    onKeyPressed?: (entity: Entity) => void
    onKeyReleased?: (entity: Entity) => void
}

export type KeyboardActions = { [key: number]: KeyCallbacks }

export class KeyboardInput {
    actions: KeyboardActions

    constructor(actions: KeyCallbacks) {
        this.actions = { ...actions };
    }

    add(key: number, action: KeyCallbacks) {
        if (this.actions[key]) {
            throw Error('key already defined');
        }

        this.actions[key] = action;
        return this;
    }

    remove(key: number) {
        delete this.actions[key];
        return this;
    }

    get(key: number) {
        return this.actions[key];
    }
}
