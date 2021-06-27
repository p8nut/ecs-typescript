import { Entity } from "../ecs";

class Vector {
  x: number;
  y: number;
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  static add(a: Vector, b: Vector) {
    return { x: a.x + b.x, y: a.y + b.y };
  }
  static sub(a: Vector, b: Vector) {
    return { x: a.x - b.x, y: a.y - b.y };
  }
  static div(a: Vector, b: Vector) {
    return { x: a.x / b.x, y: a.y / b.y };
  }
  static mod(a: Vector, b: Vector) {
    return { x: a.x % b.x, y: a.y % b.y };
  }
  static mul(a: Vector, b: Vector) {
    return { x: a.x * b.x, y: a.y * b.y };
  }
}

export class Position extends Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}

export class Velocity extends Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}

export class Acceleration extends Vector {
  x: number;
  y: number;
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }
}

export class Rotation {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

export class Shape extends Vector {
  color: "red" | "blue" | "green";
  constructor(x: number, y: number, color?: "red" | "blue" | "green") {
    super();
    this.x = x;
    this.y = y;
    this.color = color || "blue";
  }
}

export interface MouseInputOption {
  mousemove?: (entity: Entity, position: { x: number; y: number }) => void;
  mouseclick?: (entity: Entity, position: { x: number; y: number }) => void;
  mouseover?: (entity: Entity, position: { x: number; y: number }) => void;
  mouseout?: (entity: Entity, position: { x: number; y: number }) => void;
  mouseenter?: (entity: Entity, position: { x: number; y: number }) => void;
  mouseleave?: (entity: Entity, position: { x: number; y: number }) => void;
}
export class Input {
  onmousemove?: (entity: Entity, position: { x: number; y: number }) => void;
  onmouseclick?: (entity: Entity, position: { x: number; y: number }) => void;
  onmouseover?: (entity: Entity, position: { x: number; y: number }) => void;
  onmouseout?: (entity: Entity, position: { x: number; y: number }) => void;
  onmouseenter?: (entity: Entity, position: { x: number; y: number }) => void;
  onmouseleave?: (entity: Entity, position: { x: number; y: number }) => void;
  constructor(options?: MouseInputOption) {
    this.onmousemove = options?.mousemove;
    this.onmouseclick = options?.mouseclick;
    this.onmouseover = options?.mouseover;
    this.onmouseout = options?.mouseout;
    this.onmouseenter = options?.mouseenter;
    this.onmouseleave = options?.mouseleave;
  }
}

export { Collider } from "./Collider";
export class Tag {
  tags: string[];
  constructor(...tags: string[]) {
    this.tags = tags;
  }

  add(tag: string) {
    this.tags.push(tag);
    return this;
  }
  remove(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
    return this;
  }
}

export interface TimeoutCallback {
  timeout: number;
  callback: (entity: Entity) => void;
}
export class Timer {
  timeouts: TimeoutCallback[] = [];
  constructor(...timeouts: TimeoutCallback[]) {
    this.timeouts = timeouts;
  }
}
