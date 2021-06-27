import { ECS, System } from "../ecs";
import { Acceleration, Position, Timer, Velocity } from "../components";
import { RenderingSystem } from "./RaylibSystems";
export { InputSystem, RenderingSystem } from "./RaylibSystems";

export class MovementSystem implements System {
  constructor() {}
  onUpdate(ecs: ECS) {
    const window = ecs.get(RenderingSystem);
    if (!window) return;
    console.log("update bounce");
    for (
      const [_entity, velocity, acceleration] of ecs.getEntities(
        Velocity,
        Acceleration,
      )
    ) {
      velocity.x += acceleration.x;
      velocity.y += acceleration.y;
    }
    for (
      const [_entity, position, velocity] of ecs.getEntities(Position, Velocity)
    ) {
      position.x += velocity.x;
      position.y += velocity.y;
    }
    for (
      const [_entity, position] of ecs.getEntities(Position)
    ) {
      if (position.x > window.width) {
        position.x = 0;
      } else if (position.x < 0) position.x = 0;
      if (position.y > window.height) {
        position.y = 0;
      } else if (position.y < 0) position.y = 0;
    }
  }
}

export class TimerSystem implements System {
  constructor() {}
  onUpdate(ecs: ECS, delta: number) {
    console.log("update timeouts");
    for (const [entity, timer] of ecs.getEntities(Timer)) {
      console.table (timer.timeouts)
      timer.timeouts.forEach((timeout) => {
        timeout.timeout -= delta;
        if (timeout.timeout <= 0) {
          timeout.callback(entity);
        }
      });
      timer.timeouts = timer.timeouts.filter(({ timeout }) => timeout > 0);
    }
  }
}
