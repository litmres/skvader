import {Actor} from "./Actor";

export class TileFactory {
    static createTile(tileType: TileType): Actor {
        switch (tileType) {
            case TileType.VOID:
                return new Actor(" ", "#000", "#000");
            case TileType.EMPTY:
                return new Actor(".", "#FFF", "#000");
            case TileType.WALL:
                return new Actor("#", "#FFF", "#000");
            case TileType.DOOR_EXIT:
                return new Actor("+", "#D4AF37", "#000");
            case TileType.DOOR_CLOSED:
                return new Actor("+", "#8B4513", "#000");
            case TileType.DOOR_OPEN:
                return new Actor("/", "#8B4513", "#000");
            case TileType.STAIRS_DOWN:
                return new Actor(">", "#FF8C00", "#000");
            case TileType.STAIRS_UP:
                return new Actor("<", "#FFB6C1", "#000");
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