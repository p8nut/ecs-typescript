import { ECS, System } from "../../ecs";
import { Position, Shape } from "../../components";

const Raylib = require('raylib')

export class RenderSystem implements System {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    onCreate() {
        Raylib.SetTraceLogLevel(Raylib.LOG_NONE);
        Raylib.InitWindow(this.width, this.height, "demo");
        Raylib.SetTargetFPS(60);
    }

    onUpdate(ecs: ECS) {
        if (Raylib.WindowShouldClose()) return false;
        Raylib.BeginDrawing();
        Raylib.ClearBackground(Raylib.RAYWHITE);

        Raylib.DrawText(
            "Congrats! You created your first window!",
            190,
            200,
            20,
            Raylib.LIGHTGRAY,
        );
        // console.log("update render");
        for (const [_entity, position, shape] of ecs.getEntities(Position, Shape)) {
            let color = Raylib.BLUE;
            switch (shape.color) {
                case "lightgray":
                    color = Raylib.LIGHTGRAY;
                    break;
                case "gray":
                    color = Raylib.GRAY;
                    break;
                case "darkgray":
                    color = Raylib.DARKGRAY;
                    break;
                case "yellow":
                    color = Raylib.YELLOW;
                    break;
                case "gold":
                    color = Raylib.GOLD;
                    break;
                case "orange":
                    color = Raylib.ORANGE;
                    break;
                case "pink":
                    color = Raylib.PINK;
                    break;
                case "red":
                    color = Raylib.RED;
                    break;
                case "maroon":
                    color = Raylib.MAROON;
                    break;
                case "green":
                    color = Raylib.GREEN;
                    break;
                case "lime":
                    color = Raylib.LIME;
                    break;
                case "darkgreen":
                    color = Raylib.DARKGREEN;
                    break;
                case "skyblue":
                    color = Raylib.SKYBLUE;
                    break;
                case "blue":
                    color = Raylib.BLUE;
                    break;
                case "darkblue":
                    color = Raylib.DARKBLUE;
                    break;
                case "purple":
                    color = Raylib.PURPLE;
                    break;
                case "violet":
                    color = Raylib.VIOLET;
                    break;
                case "darkpurple":
                    color = Raylib.DARKPURPLE;
                    break;
                case "beige":
                    color = Raylib.BEIGE;
                    break;
                case "brown":
                    color = Raylib.BROWN;
                    break;
                case "darkbrown":
                    color = Raylib.DARKBROWN;
                    break;
                case "white":
                    color = Raylib.WHITE;
                    break;
                case "black":
                    color = Raylib.BLACK;
                    break;
                case "blank":
                    color = Raylib.BLANK;
                    break;
                case "magenta":
                    color = Raylib.MAGENTA;
                    break;
                case "raywhite":
                    color = Raylib.RAYWHITE;
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
        return true;
    }
    onDelete() {
        Raylib.CloseWindow(); // Close window and OpenGL context
    }
}
