import { ECS, System } from "../ecs";
import { Input, Position, Shape } from "../components";

import * as Raylib from "raylib";

export class InputSystem implements System {
  mouseposition: Position;
  constructor() {
    this.mouseposition = { x: 0, y: 0 };
  }

  static inbound(
    element_position: { x: number; y: number },
    element_shape: { x: number; y: number },
    mouse_position: { x: number; y: number },
  ): boolean {
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
    if (
      new_position.x !== this.mouseposition.x ||
      new_position.y !== this.mouseposition.y
    ) {
      this.mouseposition = new_position;
      for (const [entity, input] of ecs.getEntities(Input)) {
        input.onmousemove && input.onmousemove(entity, new_position);
      }
      for (
        const [entity, input, element_position, element_shape] of ecs
          .getEntities(
            Input,
            Position,
            Shape,
          )
      ) {
        const new_pos_in_element = InputSystem.inbound(
          element_position,
          element_shape,
          new_position,
        );
        const old_pos_in_element = InputSystem.inbound(
          element_position,
          element_shape,
          old_position,
        );
        if (input.onmouseover && new_pos_in_element) {
          input.onmouseover(entity, new_position);
        }
        if (input.onmouseout && !new_pos_in_element) {
          input.onmouseout(entity, new_position);
        }
        //enter
        if (input.onmouseenter && !old_pos_in_element && new_pos_in_element) {
          input.onmouseenter(entity, new_position);
        }
        //leave
        if (input.onmouseleave && old_pos_in_element && !new_pos_in_element) {
          input.onmouseleave(entity, new_position);
        }
      }
    }
    if (Raylib.IsMouseButtonReleased(0)) {
      for (const [entity, input] of ecs.getEntities(Input)) {
        input.onmouseclick && input.onmouseclick(entity, new_position);
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

export class RenderingSystem implements System {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  onCreate() {
    Raylib.InitWindow(this.width, this.height, "demo");
    Raylib.SetTargetFPS(60);
  }

  onUpdate(ecs: ECS) {
    if (Raylib.WindowShouldClose()) return;
    Raylib.BeginDrawing();
    Raylib.ClearBackground(Raylib.RAYWHITE);

    Raylib.DrawText(
      "Congrats! You created your first window!",
      190,
      200,
      20,
      Raylib.LIGHTGRAY,
    );
    console.log("update render");
    for (const [_entity, position, shape] of ecs.getEntities(Position, Shape)) {
      let color = Raylib.BLUE;
      switch (shape.color) {
        case "red":
          color = Raylib.RED;
          break;
        case "blue":
          color = Raylib.BLUE;
          break;
        case "green":
          color = Raylib.GREEN;
          break;
        default:
          break;
      }

      Raylib.DrawRectangle(
        position.x,
        position.y,
        shape.x,
        shape.y,
        color,
      );
    }
    Raylib.EndDrawing();
  }
  onDelete() {
    Raylib.CloseWindow(); // Close window and OpenGL context
  }
}
