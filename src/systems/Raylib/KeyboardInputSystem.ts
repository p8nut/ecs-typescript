import { KeyboardInput } from "../../components";
import { ECS, System } from "../../ecs";

const Raylib = require('raylib')

export class KeyboardInputSystem implements System {
    onUpdate(ecs: ECS, _delta: number) {
        for (const [entity, { actions }] of ecs.getEntities(KeyboardInput)) {
            for (const [key, { onKeyReleased, onKeyPressed }] of Object.entries(actions)) {
                if (onKeyPressed && Raylib.IsKeyPressed(key)) {
                    onKeyPressed(entity);
                }
                if (onKeyReleased && Raylib.IsKeyRelonKeyReleased(key)) {
                    onKeyReleased(entity);
                }
            }
        }
    }
}
