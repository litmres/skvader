import {Actor} from "./Actor";
import {NOT_PASSABLE, OPAQUE, PASSABLE, TRANSPARENT} from "./Constants";

export class TileFactory {
    static createTile(tileType: TileType): Actor {
        switch (tileType) {
            case TileType.VOID:
                return new Actor(" ", NOT_PASSABLE, OPAQUE, "#000", "#000");
            case TileType.EMPTY:
                return new Actor(".", PASSABLE, TRANSPARENT,"#FFF", "#000");
            case TileType.WALL:
                return new Actor("#", NOT_PASSABLE, OPAQUE,"#FFF", "#000");
            case TileType.DOOR_EXIT:
                return new Actor("+", NOT_PASSABLE, OPAQUE,"#D4AF37", "#000");
            case TileType.DOOR_CLOSED:
                return new Actor("+", NOT_PASSABLE, OPAQUE,"#9c6933", "#000");
            case TileType.DOOR_OPEN:
                return new Actor("/", PASSABLE, TRANSPARENT,"#8B4513", "#000");
            case TileType.STAIRS_DOWN:
                return new Actor(">", NOT_PASSABLE, TRANSPARENT,"#FF8C00", "#000");
            case TileType.STAIRS_UP:
                return new Actor("<", NOT_PASSABLE, OPAQUE,"#FFB6C1", "#000");
            default:
                return TileFactory.createTile(TileType.VOID);
        }
    }
}

export enum TileType {
    VOID,
    EMPTY,
    WALL,
    DOOR_EXIT,
    DOOR_CLOSED,
    DOOR_OPEN,
    STAIRS_UP,
    STAIRS_DOWN
}