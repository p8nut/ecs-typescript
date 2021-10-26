import { isNumber } from "util";

export interface Vector {
  x: number;
  y: number;
}


export function add(a: Vector, b: Vector | number): Vector {
  if (isNumber(b)) {
    return add(a, { x: b, y: b });
  }
  return { x: a.x + b.x, y: a.y + b.y };
}
export function sub(a: Vector, b: Vector | number): Vector {
  if (isNumber(b)) {
    return sub(a, { x: b, y: b });
  }
  return { x: a.x - b.x, y: a.y - b.y };
}
export function div(a: Vector, b: Vector | number): Vector {
  if (isNumber(b)) {
    return div(a, { x: b, y: b });
  }
  return { x: a.x / b.x, y: a.y / b.y };
}
export function mod(a: Vector, b: Vector | number): Vector {
  if (isNumber(b)) {
    return mod(a, { x: b, y: b });
  }
  return { x: a.x % b.x, y: a.y % b.y };
}
export function mul(a: Vector, b: Vector | number): Vector {
  if (isNumber(b)) {
    return mul(a, { x: b, y: b });
  }
  return { x: a.x * b.x, y: a.y * b.y };
}
export function equal(a: Vector, b: Vector | number): boolean {
  if (isNumber(b)) {
    return equal(a, { x: b, y: b });
  }
  return a.x === b.x && a.y === b.y;
}

export function round(v: Vector): Vector {
  return {
    x: Math.round(v.x),
    y: Math.round(v.y)
  }
}

export function floor(v: Vector): Vector {
  return {
    x: Math.floor(v.x),
    y: Math.floor(v.y)
  }
}

export function set(a: Vector, b: Vector) {
  a.x = b.x;
  a.y = b.y;
}

export function grid(a: Vector, b: Vector) {
  return mul(floor(div(a, b)), b)
}

export function left() {
  return { x: -50, y: 0 };
}

export function right() {
  return { x: 50, y: 0 };
}


export function up() {
  return { x: 0, y: -50 };
}

export function down() {
  return { x: 0, y: 50 };
}

