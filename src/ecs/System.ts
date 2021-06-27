import { ECS } from "./ECS";

export interface System {
  onCreate?: (ecs: ECS) => void;
  onPause?: (ecs: ECS) => void;
  onUpdate?: (ecs: ECS, delta: number, elapsed: number) => void;
  onFixedUpdate?: (ecs: ECS) => void;
  onResume?: (ecs: ECS) => void;
  onDelete?: (ecs: ECS) => void;
}
