import { Timer } from "../components";
import { ECS, System } from "../ecs";

export class TimerSystem implements System {
    constructor() {}
    onUpdate(ecs: ECS, delta: number) {
      // console.log("update timeouts");
      for (const [entity, timer] of ecs.getEntities(Timer)) {
        // console.table (timer.timeouts)
        timer.timeouts.forEach((timeout) => {
          timeout.timeout -= delta;
          if (timeout.timeout <= 0) {
            timeout.callback(ecs, entity);
          }
        });
        timer.timeouts = timer.timeouts.filter(({ timeout }) => timeout > 0);
      }
    }
  }
  