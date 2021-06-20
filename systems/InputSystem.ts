import { ECS, System } from "../ecs.ts";
import { Controllable } from "../components/Controllable.ts";
export class InputSystem implements System {
  constructor() {
  }
  onCreate() {}
  onDelete() {}
  onPause() {}
  onResume() {}
  onUpdate(ecs: ECS) {
    console.log("update inputs");
    for (const [controllable] of ecs.find(Controllable)) {
      controllable.set(1);
    }
  }
}
