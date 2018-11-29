import {Actor} from "./Actor";
import {NOT_PASSABLE, OPAQUE, PASSABLE, TRANSPARENT} from "./Constants";

export class ActorFactory {
    static createActor(tileType: TileType): Actor {
        switch (tileType) {
            case TileType.VOID:
                return new Actor(" ", OPAQUE, NOT_PASSABLE, "#000", "#000");
            case TileType.EMPTY:
                return new Actor(".", TRANSPARENT, PASSABLE,    "#FFF", "#000");
            case TileType.WALL:
                return new Actor("#", OPAQUE, NOT_PASSABLE,"#FFF", "#000");
            case TileType.DOOR_EXIT:
                return new Actor("+", OPAQUE, NOT_PASSABLE,"#D4AF37", "#000");
            case TileType.DOOR_CLOSED:
                return new Actor("+", OPAQUE, NOT_PASSABLE,"#9c6933", "#000");
            case TileType.DOOR_OPEN:
                return new Actor("/", TRANSPARENT, PASSABLE,    "#8B4513", "#000");
            case TileType.STAIRS_DOWN:
                return new Actor(">", TRANSPARENT, NOT_PASSABLE,"#FF8C00", "#000");
            case TileType.STAIRS_UP:
                return new Actor("<", OPAQUE, NOT_PASSABLE,"#FFB6C1", "#000");
            case TileType.CRATE:
                return new Actor("%", TRANSPARENT, NOT_PASSABLE,"#9c7905", "#000");
            case TileType.CRATE_DESTROYED:
                return new Actor("^", TRANSPARENT, PASSABLE,"#FFF", "#000");
            case TileType.PAIRING_KNIFE:
                return new Actor("k", TRANSPARENT, PASSABLE,"#a7a7a7", "#494c1b");
            case TileType.POTATO_PEELER:
                return new Actor("p", TRANSPARENT, PASSABLE,"#15fff8", "#494c1b");
            default:
                return ActorFactory.createActor(TileType.VOID);
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
    STAIRS_DOWN,
    CRATE,
    CRATE_DESTROYED,
    PAIRING_KNIFE,
    POTATO_PEELER
}