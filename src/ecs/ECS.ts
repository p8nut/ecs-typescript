import { Entity } from "./Entity";
import { System } from "./System";
import { Constructor, InstancesTypes } from "./utils";

export class ECS {
  _entities: Entity[] = [];
  _systems: { [Key: string]: InstanceType<Constructor<System>> } = {};
  createEntity() {
    const entity = new Entity();
    this._entities.push(entity);
    return entity;
  }
  removeEntity(entity: Entity) {
    this._entities = this._entities.filter((e) => e !== entity);
  }

  getEntities<
    ComponentConstructor extends Constructor,
    ComponentConstructors extends ComponentConstructor[],
  >(
    ...constructors: ComponentConstructors
  ): [Entity, ...InstancesTypes<ComponentConstructors>][] {
    const cs: [Entity, ...InstancesTypes<ComponentConstructors>][] = [];
    for (const entity of this._entities) {
      const components = entity.get(...constructors);
      if (components) {
        cs.push([entity, ...components]);
      }
    }
    return cs;
  }

  add<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor,
    ...args: ConstructorParameters<SystemConstructor>
  ) {
    this.remove(constructor);
    const system = new constructor(...args);
    system && system.onCreate && system.onCreate(this);
    this._systems[constructor.name] = system;
    return this;
  }

  get<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor,
  ): InstanceType<SystemConstructor> | undefined {
    return this._systems[constructor.name] as InstanceType<SystemConstructor>;
  }

  remove<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor,
  ) {
    const system = this._systems[constructor.name];
    system && system.onDelete && system.onDelete(this);
    delete this._systems[constructor.name];
  }

  update(delta: number, elapsed: number) {
    Object.values(this._systems).forEach((system) => {
      system.onUpdate && system.onUpdate(this, delta, elapsed);
    });
  }

  fixedUpdate() {
    Object.values(this._systems).forEach((system) => {
      system.onFixedUpdate && system.onFixedUpdate(this);
    });
  }
}
