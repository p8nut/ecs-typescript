import { ECS } from "./ecs.ts";

import { Drawable, Transformable } from "./components/index.ts";
import { AiSystem, GraphicalSystem, InputSystem } from "./systems/index.ts";

const ecs = new ECS();

ecs.createEntity()
  .add(Transformable, 1, 1)
  .add(Drawable);
ecs.createEntity()
  .add(Transformable, 1, 1)
  .add(Drawable);

ecs.add(InputSystem);
ecs.add(AiSystem);
ecs.add(GraphicalSystem, 10, 10);

// setInterval(() => {
//   if (ecs.paused(GraphicalSystem)) {
//     ecs.resume(GraphicalSystem);
//   } else {
//     ecs.pause(GraphicalSystem);
//   }
// }, 500);

setInterval(() => {
  ecs.update();
}, 100);
