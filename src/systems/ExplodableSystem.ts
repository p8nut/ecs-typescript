import { Explodable } from "../components";
import { ECS, System } from "../ecs";

export class ExplodableSystem implements System {
  constructor() { }
  onUpdate(ecs: ECS) {
    for (const [entity, explodable] of ecs.getEntities(Explodable)) {
      if (explodable.status === 'explode') {
        explodable.onExplode(entity);
      }
    }
  }
}
