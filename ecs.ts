export type Constructor<T = any> = { new (...args: any[]): T };

export interface System {
  onCreate: (ecs: ECS) => void;
  onPause: (ecs: ECS) => void;
  onUpdate: (ecs: ECS) => void;
  onResume: (ecs: ECS) => void;
  onDelete: (ecs: ECS) => void;
}

export class Entity {
  _components: { [Key: string]: any } = {};
  add<ComponentConstructor extends Constructor>(
    constructor: ComponentConstructor,
    ...args: ConstructorParameters<ComponentConstructor>
  ) {
    this._components[constructor.name] = new constructor(...args);
    return this;
  }
  get<ComponentConstructor extends Constructor>(
    constructor: ComponentConstructor,
  ): InstanceType<ComponentConstructor> | undefined {
    return this._components[constructor.name] as InstanceType<
      ComponentConstructor
    >;
  }
}

export class ECS {
  _entities: Entity[] = [];
  _systems: { [Key: string]: { paused: boolean; system: System } } = {};
  createEntity() {
    const entity = new Entity();
    this._entities.push(entity);
    return entity;
  }
  deleteEntity() {}

  add<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor,
    ...args: ConstructorParameters<SystemConstructor>
  ) {
    this._systems[constructor.name] = {
      paused: false,
      system: new constructor(...args),
    };
    this.get(constructor)?.onCreate(this);
    return this;
  }
  get<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor,
  ): InstanceType<SystemConstructor> | undefined {
    return this._systems[constructor.name]?.system as InstanceType<
      SystemConstructor
    >;
  }

  find<
    ComponentConstructor extends Constructor,
    ComponentConstructors extends ComponentConstructor[],
  >(
    ...constructors: ComponentConstructors
  ): {
    [Key in keyof ComponentConstructors]: ComponentConstructors[Key] extends
      Constructor ? InstanceType<ComponentConstructors[Key]> : never;
  }[] {
    const selectedComponents: {
      [Key in keyof ComponentConstructors]: ComponentConstructors[Key] extends
        Constructor ? InstanceType<ComponentConstructors[Key]> : never;
    }[] = [];

    for (const entity of this._entities) {
      const components = constructors.map((c) => entity.get(c));
      if (components.includes(undefined)) {
        continue;
      }
      selectedComponents.push(
        components as {
          [Key in keyof ComponentConstructors]:
            ComponentConstructors[Key] extends Constructor
              ? InstanceType<ComponentConstructors[Key]>
              : never;
        },
      );
    }

    return selectedComponents;
  }

  remove<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor,
  ) {
    this.get(constructor)?.onDelete(this);
    delete this._systems[constructor.name];
  }
  pause<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor,
  ) {
    if (this._systems[constructor.name]) {
      this._systems[constructor.name].paused = true;
      this.get(constructor)?.onPause(this);
    }
  }
  resume<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor,
  ) {
    if (this._systems[constructor.name]) {
      this._systems[constructor.name].paused = false;
      this.get(constructor)?.onResume(this);
    }
  }
  paused<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor,
  ): boolean | undefined {
    return this._systems[constructor.name]?.paused;
  }
  update() {
    for (const key in this._systems) {
      const { paused, system } = this._systems[key];
      if (!paused) {
        system.onUpdate(this);
      }
    }
  }
}
