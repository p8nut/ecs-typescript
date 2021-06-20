import { ECS, System } from "../ecs.ts";
import { Drawable, Transformable } from "../components/index.ts";

export class GraphicalSystem implements System {
  _width: number;
  _height: number;

  constructor(width: number, height: number) {
    console.log(width, height);
    this._width = width;
    this._height = height;
  }
  onCreate() {}
  onDelete() {}
  onPause() {}
  onResume() {}
  onUpdate(ecs: ECS) {
    console.table(ecs.find(Transformable, Drawable));
    console.log("update gui");
  }
  resize(width: number, height: number) {
    this._width = width;
    this._height = height;
  }
}
