import { Position, Shape, Tag, Timer, Vector, add, Explodable, equal, up, right, left, down } from "./components";
import { Direction } from "./components/Direction";
import { ECS, Entity } from "./ecs";

export function createLava(
    ecs: ECS,
    position: Vector,
    direction: Vector,
    rad: number = 0,
): Entity | void {
    if (rad === 0) return;
    for (const [_entity, e_position, explodable] of ecs.getEntities(Position, Explodable)) {
        if (equal(position, e_position)) {
            explodable.explode();
        }
    }

    const entities = ecs.getEntities(Shape, Position).filter(([entity]) => !entity.getOne(Tag)?.has('mouse')).filter(([_entity, _shape, pos]) => equal(pos, add(position, direction)));
    if (entities.length > 0 && entities.every(([entity]) => !entity.getOne(Explodable))) {
        return;
    }
    return ecs.createEntity()
        .add(Tag, "lava")
        .add(Position, position.x, position.y)
        .add(Direction, direction.x, direction.y)
        .add(Shape, 50, 50, "red")
        .add(Timer, {
            timeout: 200,
            callback: (ecs, entity) => {
                const position = entity.getOne(Position);
                const direction = entity.getOne(Direction);
                if (!position || !direction) return;
                createLava(ecs, add(position, direction), direction, rad - 1)
            }
        }, {
            timeout: 300,
            callback: (ecs, entity) => {
                ecs.removeEntity(entity)
            },
        });

}

export function createWall(
    ecs: ECS,
    position: Vector,
    breakable: boolean = false
) {
    const wall = ecs.createEntity()
        .add(Tag, "wall")
        .add(Position, position.x, position.y)

    if (breakable) {
        wall.add(Shape, 50, 50, "brown").add(Explodable, (entity) => {
            ecs.removeEntity(entity)
        });
    } else {
        wall.add(Shape, 50, 50, "gray")
    }
    return wall;
}


export function createBomb(ecs: ECS, position: Vector, rad = 4) {
    return ecs.createEntity()
        .add(Tag, "bomb")
        .add(Position, position.x, position.y)
        .add(Shape, 50, 50)
        .add(Explodable, (entity) => {
            const position = entity.getOne(Position);
            if (!position) return;
            createLava(ecs, position, up(), rad);
            createLava(ecs, position, down(), rad);
            createLava(ecs, position, left(), rad);
            createLava(ecs, position, right(), rad);
            ecs.removeEntity(entity)
        })
        .add(Timer, {
            timeout: 1000,
            callback: (_, entity) => {
                const explodable = entity.getOne(Explodable);
                explodable?.explode()
            },
        });
}

export default {
    createLava,
    createBomb,
    createWall
}