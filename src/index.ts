import { ECS } from "./ecs";
import {
  Collider,
  Input,
  Position,
  Shape,
  Tag,
  Timer,
  Velocity,
} from "./components";
import {
  InputSystem,
  MovementSystem,
  RenderingSystem,
  TimerSystem,
} from "./systems";

const ecs = new ECS();

function createLava(
  ecs: ECS,
  x: number,
  y: number,
  dir: { x: number; y: number },
  rec: number = 0,
) {
  return ecs.createEntity()
    .add(Tag, "bomb")
    .add(Position, x, y)
    .add(Shape, 50, 50, "red")
    .add(Timer, {
      timeout: 200,
      callback: (entity) => {
        if (rec > 0) {
          createLava(ecs, x + dir.x, y + dir.y, dir, rec - 1);
        }
      },
    }, {
      timeout: 300,
      callback: (entity) => {
        ecs.removeEntity(entity);
      },
    });
}

function createBomb(ecs: ECS, x: number, y: number, rad = 3) {
  return ecs.createEntity()
    .add(Tag, "bomb")
    .add(Position, x, y)
    .add(Shape, 50, 50)
    .add(Timer, {
      timeout: 1000,
      callback: (entity) => {
        // do the explotion
        const [shape] = entity.get(Shape) || [undefined];
        if (!shape) return;
        shape.color = "red";
        const [position] = entity.get(Position) || [undefined];
        if (!position) return;
        createLava(ecs, position.x + 50, position.y, { x: 50, y: 0 }, rad);
        createLava(ecs, position.x, position.y + 50, { x: 0, y: 50 }, rad);
        createLava(ecs, position.x - 50, position.y, { x: -50, y: 0 }, rad);
        createLava(ecs, position.x, position.y - 50, { x: 0, y: -50 }, rad);
      },
    }, {
      timeout: 1500,
      callback: (entity) => {
        ecs.removeEntity(entity);
      },
    });
}
createBomb(ecs, 30, 30);
ecs.createEntity()
  .add(Position, 10, 10)
  //.add(Velocity, 1, 1)
  .add(Shape, 10, 10)
  .add(Input, {
    mouseenter: (entity) => {
      const [shape] = entity.get(Shape) || [undefined];
      if (!shape) return;
      shape.color = "green";
    },
    mouseleave: (entity) => {
      const [shape] = entity.get(Shape) || [undefined];
      if (!shape) return;
      shape.color = "red";
    },
    /*
    mousemove: (entity, mousePosition) => {
      const [position] = entity.get(Position) || [undefined];
      if (!position) return;
      position.x = mousePosition.x;
      position.y = mousePosition.y;
    },
    */
    mouseclick: (entity) => {
      const [shape] = entity.get(Shape) || [undefined];
      if (!shape) return;
      shape.color = "blue" ? "red" : "blue";
    },
  })
  .add(Tag, "player", "plop", "ia");

ecs.createEntity()
  .add(Position, 50, 50)
  .add(Velocity, 10, 1)
  .add(Shape, 10, 10);

ecs.createEntity()
  .add(Tag, "mouse")
  .add(Position, 50, 50)
  .add(Shape, 50, 50, "blue")
  .add(Input, {
    mouseclick: (entity, position) => {
      const gridCubeWidth = 50;
      const gridCubeHeight = 50;

      const x = Math.round(position.x / gridCubeWidth) * gridCubeWidth - 25;
      const y = Math.round(position.y / gridCubeHeight) * gridCubeHeight - 25;
      createBomb(ecs, x, y);
    },
    mousemove: (entity, position) => {
      const gridCubeWidth = 50;
      const gridCubeHeight = 50;

      const x = Math.round(position.x / gridCubeWidth) * gridCubeWidth - 25;
      const y = Math.round(position.y / gridCubeHeight) * gridCubeHeight - 25;
      const [cursor_position] = entity.get(Position) || [undefined];
      if (cursor_position) {
        cursor_position.x = x;
        cursor_position.y = y;
      }
    },
  });

ecs
  .add(InputSystem)
  .add(TimerSystem)
  .add(MovementSystem)
  .add(RenderingSystem, 800, 600);

let elapsed = 0;
let delta = 10;
setInterval(() => {

  console.group("UPDATE");
  elapsed += delta;
  ecs.fixedUpdate();
  ecs.update(delta, elapsed);
  console.groupEnd();
}, delta);
