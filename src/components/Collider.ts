import { Constructor } from "../ecs/utils";

export class Collider<ColliderConstructor extends Constructor> {
  constructor(
    constructor: ColliderConstructor,
    ...args: ConstructorParameters<ColliderConstructor>
  ) {
    console.log(constructor, args);
  }
}
