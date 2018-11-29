import {DungeonMap} from "./DungeonMap";
import {Actor} from "./Actor";
import {ActorFactory, TileType} from "./ActorFactory";
import {Tile} from "./Tile";
import {ItemsMap} from "./ItemsMap";
import {VisibleDungeonMap} from "./VisibleDungeonMap";

export class StaticMapGenerator {
    static construct(staticMapStructure: string[][]): {d: DungeonMap, t: ItemsMap, v: VisibleDungeonMap} {
        const d: Actor[][] = new Array<Actor[]>(staticMapStructure.length);
        const v: Actor[][] = new Array<Actor[]>(staticMapStructure.length);
        const t: Tile[] = new Array<Tile>();

        for(let i = 0; i < staticMapStructure.length; i++) {
            d[i] = new Array<Actor>(staticMapStructure[i].length);
            v[i] = new Array<Actor>(staticMapStructure[i].length);
            for(let j = 0; j < staticMapStructure[i].length; j++) {
                let actor = this.symbolToActorMap(staticMapStructure[i][j]);
                // If there is an item at this coordinate then put an empty floor tile in the DungeonMap
                if (actor instanceof Actor) {
                    d[i][j] = actor;
                } else {
                    t.push({x: j, y: i, actor});
                    d[i][j] = ActorFactory.createActor(TileType.EMPTY);
                }
                v[i][j] = ActorFactory.createActor(TileType.VOID);
            }
        }

        return {d: new DungeonMap(d), t: new ItemsMap(t), v: new VisibleDungeonMap(v)};
    }

    static discoverPlayersStartingCoordinates(staticMapStructure: string[][]): {x: number, y: number} {
        for(let i = 0; i < staticMapStructure.length; i++) {
            for(let j = 0; j < staticMapStructure[i].length; j++) {
                if (staticMapStructure[i][j] === "@") {
                    return {x: j, y: i};
                }
            }
        }
        return {x: 0,y:0};
    };

    private static symbolToActorMap(symbol: string): Actor {
        switch (symbol) {
            case "@":
                return ActorFactory.createActor(TileType.EMPTY);
            case "#":
                return ActorFactory.createActor(TileType.WALL);
            case ".":
                return ActorFactory.createActor(TileType.EMPTY);
            case "E":
                return ActorFactory.createActor(TileType.DOOR_EXIT);
            case "+":
                return ActorFactory.createActor(TileType.DOOR_CLOSED);
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