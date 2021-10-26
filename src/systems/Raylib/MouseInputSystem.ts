import { ECS, System } from "../../ecs";
import { equal, MouseInput, Position, Shape, Vector } from "../../components";

const Raylib = require('raylib')

export class MouseInputSystem implements System {
    mouseposition: Position;
    constructor() {
        this.mouseposition = { x: 0, y: 0 };
    }

    static inbound(element_position: Vector, element_shape: Vector, mouse_position: Vector): boolean {
        return (
            mouse_position.x >= element_position.x &&
            mouse_position.x <= (element_position.x + element_shape.x) &&
            mouse_position.y >= element_position.y &&
            mouse_position.y <= (element_position.y + element_shape.y)
        );
    }

    onUpdate(ecs: ECS, _delta: number) {
        const old_position = this.mouseposition;
        const new_position = Raylib.GetMousePosition() as Position;
        if (!equal(this.mouseposition, new_position)) {
            this.mouseposition = new_position;
            for (const [entity, input] of ecs.getEntities(MouseInput)) {
                input.onMouseMove && input.onMouseMove(ecs, entity, new_position);
            }
            for (
                const [entity, input, element_position, element_shape] of ecs.getEntities(MouseInput, Position, Shape)) {
                const new_pos_in_element = MouseInputSystem.inbound(element_position, element_shape, new_position);
                const old_pos_in_element = MouseInputSystem.inbound(element_position, element_shape, old_position);
                if (input.onMouseOver && new_pos_in_element) {
                    input.onMouseOver(ecs, entity, new_position);
                }
                if (input.onMouseOut && !new_pos_in_element) {
                    input.onMouseOut(ecs, entity, new_position);
                }
                //enter
                if (input.onMouseEnter && !old_pos_in_element && new_pos_in_element) {
                    input.onMouseEnter(ecs, entity, new_position);
                }
                //leave
                if (input.onMouseLeave && old_pos_in_element && !new_pos_in_element) {
                    input.onMouseLeave(ecs, entity, new_position);
                }
            }
        }
        if (Raylib.IsMouseButtonReleased(0)) {
            for (const [entity, input] of ecs.getEntities(MouseInput)) {
                input.onMouseLeftClick && input.onMouseLeftClick(ecs, entity, new_position);
            }
        }
        if (Raylib.IsMouseButtonReleased(1)) {
            for (const [entity, input] of ecs.getEntities(MouseInput)) {
                input.onMouseRightClick && input.onMouseRightClick(ecs, entity, new_position);
            }
        }

        // bool IsMouseButtonPressed(int button);                                  // Detect if a mouse button has been pressed once
        // bool IsMouseButtonDown(int button);                                     // Detect if a mouse button is being pressed
        // bool IsMouseButtonReleased(int button);                                 // Detect if a mouse button has been released once
        // bool IsMouseButtonUp(int button);                                       // Detect if a mouse button is NOT being pressed
        // int GetMouseX(void);                                                    // Returns mouse position X
        // int GetMouseY(void);                                                    // Returns mouse position Y
        // Vector2 GetMousePosition(void);                                         // Returns mouse position XY
        // void SetMousePosition(int x, int y);                                    // Set mouse position XY
        // void SetMouseOffset(int offsetX, int offsetY);                          // Set mouse offset
        // void SetMouseScale(float scaleX, float scaleY);                         // Set mouse scaling
        // float GetMouseWheelMove(void);                                          // Returns mouse wheel movement Y
        // void SetMouseCursor(int cursor);                                        // Set mouse cursor

        // mousedown trigger when a mouse button change to down
        // mouseup trigger when a mouse button change to up
        // click
        // dblclick
        // mouseover ok
        // mouseout ok
        // mouseenter ok
        // mouseleave ok
        // mousemove ok
    }
}
