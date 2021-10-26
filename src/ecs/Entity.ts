import { Constructor, InstancesTypes } from "./utils";

export class Entity {
  _components: { [Key: string]: any } = {};
  add<ComponentConstructor extends Constructor>(
    constructor: ComponentConstructor,
    ...args: ConstructorParameters<ComponentConstructor>
  ) {
    this._components[constructor.name] = new constructor(...args);
    return this;
  }

  get<
    ComponentConstructor extends Constructor,
    ComponentConstructors extends ComponentConstructor[],
    >(
      ...constructors: ComponentConstructors
    ): InstancesTypes<ComponentConstructors> | undefined {
    const components = constructors.map((
      constructor: ComponentConstructor,
    ) => this._components[constructor.name]);
    if (components.includes(undefined)) return undefined;
    return components as InstancesTypes<ComponentConstructors>;
  }

  getOne<ComponentConstructor extends Constructor>(
    constructor: ComponentConstructor,
  ): InstanceType<ComponentConstructor> | undefined {
    const [component] = this.get(constructor) || [undefined];
    return component;
  }
}
