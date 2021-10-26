import { ECS } from "./ECS";

export interface System {
  onCreate?: (ecs: ECS) => void;
  onStart?: (ecs: ECS) => void;
  onPause?: (ecs: ECS) => void;
  onUpdate?: (ecs: ECS, delta: number, elapsed: number) => boolean | void;
  onFixedUpdate?: (ecs: ECS) => boolean | void;
  onResume?: (ecs: ECS) => void;
  onStop?: (ecs: ECS) => void;
  onDelete?: (ecs: ECS) => void;
}
