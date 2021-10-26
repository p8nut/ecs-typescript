import { ECS } from "./ecs";
import { equal, MouseInput, Position, Shape, Tag, Velocity } from "./components";
import { set, grid } from "./components";
import { ExplodableSystem, KeyboardInputSystem, MouseInputSystem, MovementSystem, RenderSystem, TimerSystem } from "./systems";
import { createBomb, createWall } from "./helpers";

const ecs = new ECS();


//createBomb(ecs, 30, 30);

ecs.createEntity()
  .add(Position, 10, 10)
  //.add(Velocity, 1, 1)
  .add(Shape, 10, 10)
  .add(MouseInput, {
    mouseEnter: (_, entity) => {
      const shape = entity.getOne(Shape);
      if (!shape) return;
      shape.color = "green";
    },
    mouseLeave: (_, entity) => {
      const shape = entity.getOne(Shape);
      if (!shape) return;
      shape.color = "red";
    },
    /*
    mousemove: (entity, mousePosition) => {
      const position = entity.getOne(Position);
      if (!position) return;
      position.x = mousePosition.x;
      position.y = mousePosition.y;
    },
    */
    mouseLeftClick: (_, entity) => {
      const shape = entity.getOne(Shape);
      if (!shape) return;
      shape.color = "blue" ? "red" : "blue";
    },
    mouseRightClick: (_, entity) => {
      const shape = entity.getOne(Shape);
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
  .add(MouseInput, {
    mouseLeftClick: (ecs, entity, position) => {
      const shape = entity.getOne(Shape)
      const cursor = entity.getOne(Position);
      if (!shape || !cursor) return;
      const grid_position = grid(position, shape);

      if (!ecs.getEntities(Shape, Position, Tag).some(([_entity, _shape, pos, tag]) => equal(pos, grid_position) && !tag.has('mouse'))) {
        createBomb(ecs, grid_position, 100);
      }
    },
    mouseRightClick: (ecs, entity, position) => {
      const shape = entity.getOne(Shape)
      const cursor = entity.getOne(Position);
      if (!shape || !cursor) return;
      const grid_position = grid(position, shape);
      if (!ecs.getEntities(Shape, Position, Tag).some(([_entity, _shape, pos, tag]) => equal(pos, grid_position) && !tag.has('mouse'))) {
        createWall(ecs, grid_position);
      }
    },
    mouseMove: (_, entity, position) => {
      const shape = entity.getOne(Shape)
      const cursor = entity.getOne(Position);
      if (!shape || !cursor) return;
      set(cursor, grid(position, shape))
    },
  });

const width = 800;
const height = 600;

ecs
  .addSystem(MouseInputSystem)
  .addSystem(KeyboardInputSystem)
  .addSystem(TimerSystem)
  .addSystem(MovementSystem, { loop: true })
  .addSystem(ExplodableSystem)
  .addSystem(RenderSystem, 800, 600);


for (let x = 0; x < width; x += 50) {
  for (let y = 0; y < height; y += 50) {
    if (x === 50 && y === 50) continue;
    if (x === 0 || y === 0 || x === (width - 50) || y === (height - 50)) {
      createWall(ecs, { x, y }, false);
    }
    else {
      createWall(ecs, { x, y }, true);
    }


  }
}


process.once('SIGINT', () => {
  console.log('clean stop')
  ecs.stop();
})

process.once('exit', () => {
  ecs.delete()
})

ecs.start();