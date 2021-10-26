import { ECS, Entity } from "../ecs";

export interface TimeoutCallback {
    timeout: number;
    callback: (ecs: ECS, entity: Entity) => void;
}

export class Timer {
    timeouts: TimeoutCallback[] = [];
    constructor(...timeouts: TimeoutCallback[]) {
        this.timeouts = timeouts;
    }
}
