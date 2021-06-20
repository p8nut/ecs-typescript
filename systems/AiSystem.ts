import { System } from "../ecs.ts";

export class AiSystem implements System {
  constructor() {
  }
  onCreate() {}
  onDelete() {}
  onPause() {}
  onResume() {}
  onUpdate() {
    console.log("update ai");
  }
}
