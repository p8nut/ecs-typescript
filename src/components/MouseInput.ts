import { Position } from "./Position";
import { ECS, Entity } from "../ecs";

export interface MouseInputOption {
    mouseMove?: (ecs: ECS, entity: Entity, position: Position) => void;
    mouseClick?: (ecs: ECS, entity: Entity, position: Position) => void;
    mouseLeftClick?: (ecs: ECS, entity: Entity, position: Position) => void;
    mouseRightClick?: (ecs: ECS, entity: Entity, position: Position) => void;
    mouseOver?: (ecs: ECS, entity: Entity, position: Position) => void;
    mouseOut?: (ecs: ECS, entity: Entity, position: Position) => void;
    mouseEnter?: (ecs: ECS, entity: Entity, position: Position) => void;
    mouseLeave?: (ecs: ECS, entity: Entity, position: Position) => void;
}

export class MouseInput {
    onMouseMove?: (ecs: ECS, entity: Entity, position: Position) => void;
    onMouseClick?: (ecs: ECS, entity: Entity, position: Position) => void;
    onMouseLeftClick?: (ecs: ECS, entity: Entity, position: Position) => void;
    onMouseRightClick?: (ecs: ECS, entity: Entity, position: Position) => void;
    onMouseOver?: (ecs: ECS, entity: Entity, position: Position) => void;
    onMouseOut?: (ecs: ECS, entity: Entity, position: Position) => void;
    onMouseEnter?: (ecs: ECS, entity: Entity, position: Position) => void;
    onMouseLeave?: (ecs: ECS, entity: Entity, position: Position) => void;
    constructor(options?: MouseInputOption) {
        this.onMouseMove = options?.mouseMove;
        this.onMouseClick = options?.mouseClick;
        this.onMouseLeftClick = options?.mouseLeftClick;
        this.onMouseRightClick = options?.mouseRightClick;
        this.onMouseOver = options?.mouseOver;
        this.onMouseOut = options?.mouseOut;
        this.onMouseEnter = options?.mouseEnter;
        this.onMouseLeave = options?.mouseLeave;
    }
}

  //     bool IsKeyPressed(int key);                                             // Check if a key has been pressed once
  //     bool IsKeyDown(int key);                                                // Check if a key is being pressed
  //     bool IsKeyReleased(int key);                                            // Check if a key has been released once
  //     bool IsKeyUp(int key);                                                  // Check if a key is NOT being pressed
  // void SetExitKey(int key);                                               // Set a custom key to exit program (default is ESC)
  //     int GetKeyPressed(void);                                                // Get key pressed (keycode), call it multiple times for keys queued, returns 0 when the queue is empty
  //     int GetCharPressed(void);                                               // Get ch
