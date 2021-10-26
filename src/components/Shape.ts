import { Vector } from "./Vector";

export type Color = "lightgray" | "gray" | "darkgray" | "yellow" | "gold" | "orange" | "pink" | "red" | "maroon" | "green" | "lime" | "darkgreen" | "skyblue" | "blue" | "darkblue" | "purple" | "violet" | "darkpurple" | "beige" | "brown" | "darkbrown" | "white" | "black" | "blank" | "magenta" | "raywhite";

export class Shape implements Vector {
    x: number;
    y: number;
    color: Color;
    constructor(x: number, y: number, color: Color = 'blue') {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    get w() {
        return this.x;
    }
    get h() {
        return this.y;
    }
    set w(w: number) {
        this.x = w;
    }
    set h(h: number) {
        this.y = h;
    }
}
