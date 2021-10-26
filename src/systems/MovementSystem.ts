import { RenderSystem } from ".";
import { Acceleration, Position, Velocity } from "../components";
import { ECS, System } from "../ecs";

export class MovementSystem implements System {
  loop: boolean;
  constructor(config?: { loop?: boolean }) {
    this.loop = config?.loop || false;
  }
  onUpdate(ecs: ECS) {
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
    if (!this.loop) return;
    const window = ecs.getSystem(RenderSystem);
    if (!window) return;

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