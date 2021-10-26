import { Entity } from "./Entity";
import { System } from "./System";
import { Constructor, InstancesTypes } from "./utils";

import {
  setInterval,
  clearInterval
} from 'timers';

export class ECS {
  private _entities: Entity[] = [];
  private _systems: { [Key: string]: InstanceType<Constructor<System>> } = {};

  createEntity(): Entity {
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

  addSystem<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor,
    ...args: ConstructorParameters<SystemConstructor>
  ) {
    this.removeSystem(constructor);
    const system = new constructor(...args);
    system && system.onCreate && system.onCreate(this);
    this._systems[constructor.name] = system;
    return this;
  }

  getSystem<SystemConstructor extends Constructor<System>, SystemInstance extends InstanceType<SystemConstructor>>(
    constructor: SystemConstructor | string,
  ): SystemInstance | undefined {
    if (typeof constructor !== 'string') {
      return this.getSystem(constructor.name)
    }
    return this._systems[constructor] as SystemInstance;
  }

  removeSystem<SystemConstructor extends Constructor<System>>(
    constructor: SystemConstructor | string,
  ): void {
    if (typeof constructor !== 'string') {
      return this.removeSystem(constructor.name)
    }
    const system = this._systems[constructor];
    system && system.onDelete && system.onDelete(this);
    delete this._systems[constructor];
  }

  private _paused: boolean = false;
  get paused() {
    return this._paused;
  }
  private _started: boolean = false;
  get started() {
    return this._started;
  }

  get run() {
    return this.started && !this.paused;
  }


  private updateInterval?: ReturnType<typeof setInterval>;
  private fixedUpdateInterval?: ReturnType<typeof setInterval>;
  private elapsed: number = 0;

  start() {
    if (this._started === true) return;
    this._started = true;
    Object.values(this._systems).forEach((system) => {
      system.onStart && system.onStart(this);
    });

    this.updateInterval = setInterval(() => {
      this.elapsed += 10
      if (!this.update(10, this.elapsed)) {
        this.stop();
      }
    }, 10)

    this.fixedUpdateInterval = setInterval(() => {
      if (!this.fixedUpdate()) {
        this.stop();
      }
    }, 10)
  }


  pause() {
    if (this.paused === true) return;
    this._paused = true
    Object.values(this._systems).forEach((system) => {
      system.onPause && system.onPause(this);
    });
  }


  update(delta: number, elapsed: number): boolean {
    if (this.paused === true) return false;
    for (const system of Object.values(this._systems)) {
      if (system.onUpdate && system.onUpdate(this, delta, elapsed) === false) {
        return false;
      }
    }
    return true
  }

  fixedUpdate(): boolean {
    if (this.paused === true) return false;
    for (const system of Object.values(this._systems)) {
      if (system.onFixedUpdate && system.onFixedUpdate(this) === false) {
        return false;
      }
    }
    return true
  }

  resume() {
    if (this.paused === false) return;
    this._paused = false
    Object.values(this._systems).forEach((system) => {
      system.onResume && system.onResume(this);
    });
  }

  stop() {
    if (this.started === false) return;
    this._started = false;
    if (this.updateInterval)
      clearInterval(this.updateInterval)
    if (this.fixedUpdateInterval)
      clearInterval(this.fixedUpdateInterval)

    Object.values(this._systems).forEach((system) => {
      system.onStop && system.onStop(this);
    });
  }

  delete() {
    this.stop();
    for (const system of Object.keys(this._systems)) {
      this.removeSystem(system);
    }
  }
}
