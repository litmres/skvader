import {DungeonMap} from "./DungeonMap";
import {Actor} from "./Actor";
import {ActorFactory, TileType} from "./ActorFactory";
import {Tile} from "./Tile";
import {ICoordinate, ItemsMap} from "./ItemsMap";
import {VisibleDungeonMap} from "./VisibleDungeonMap";
import {EventEmitter} from "fbemitter";
import {ClosedDungeonDoor} from "./ClosedDungeonDoor";
import {DungeonExitDoor} from "./DungeonExitDoor";
import {Interactable} from "./Interactable";

export class StaticMapGenerator {
    static construct(staticMapStructure: string[][], emitter: EventEmitter): {d: DungeonMap, t: ItemsMap, v: VisibleDungeonMap} {
        const d: Actor[][] = new Array<Actor[]>(staticMapStructure.length);
        const v: Actor[][] = new Array<Actor[]>(staticMapStructure.length);
        const t: Tile[] = new Array<Tile>();

        for(let i = 0; i < staticMapStructure.length; i++) {
            d[i] = new Array<Actor>(staticMapStructure[i].length);
            v[i] = new Array<Actor>(staticMapStructure[i].length);
            for(let j = 0; j < staticMapStructure[i].length; j++) {
                let actor = this.symbolToActorMap(staticMapStructure[i][j], ItemsMap.asTuple(j, i), emitter);
                // If there is an item at this coordinate then put an empty floor tile in the DungeonMap
                if (actor instanceof Interactable) {
                    t.push({x: j, y: i, actor});
                    d[i][j] = ActorFactory.createActor(TileType.EMPTY);
                } else {
                    d[i][j] = actor;
                }
                v[i][j] = ActorFactory.createActor(TileType.VOID);
            }
        }

        return {d: new DungeonMap(d), t: new ItemsMap(t, emitter), v: new VisibleDungeonMap(v)};
    }

    static discoverPlayersStartingCoordinates(staticMapStructure: string[][]): ICoordinate {
        for(let i = 0; i < staticMapStructure.length; i++) {
            for(let j = 0; j < staticMapStructure[i].length; j++) {
                if (staticMapStructure[i][j] === "@") {
                    return {x: j, y: i};
                }
            }
        }
        return {x: 0,y:0};
    };

    private static symbolToActorMap(symbol: string, location: ICoordinate, emitter: EventEmitter): Actor {
        switch (symbol) {
            case "@":
                return ActorFactory.createActor(TileType.EMPTY);
            case "#":
                return ActorFactory.createActor(TileType.WALL);
            case ".":
                return ActorFactory.createActor(TileType.EMPTY);
            case "E":
                return new DungeonExitDoor(location.x, location.y, emitter, "Dungeon Exit");
            case "+":
                return new ClosedDungeonDoor(location.x, location.y, emitter);
            case "%":
                return ActorFactory.createActor(TileType.EMPTY);
            case "k":
                return ActorFactory.createActor(TileType.EMPTY);
            case "p":
                return ActorFactory.createActor(TileType.EMPTY);
            case "v":
                return ActorFactory.createActor(TileType.EMPTY);
            default:
                return ActorFactory.createActor(TileType.VOID);
        }
    }
}