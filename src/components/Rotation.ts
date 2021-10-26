import { Vector } from ".";

export class Rotation {
    value: number;
    constructor(value: number) {
        this.value = value;
    }
    toVector(): Vector {
        return {
            x: Math.cos(this.value),
            y: Math.sin(this.value)
        }
    }
}
