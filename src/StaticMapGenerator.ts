import {Map} from "./Map";
import {Actor} from "./Actor";
import {Player} from "./Player";
import {TileFactory, TileType} from "./TileFactory";
import {Tile} from "./Tile";

export class StaticMapGenerator {
    static construct(staticMapStructure: string[][]): {map: Map, player: Player} {
        const tiles: Tile[][] = new Array<Tile[]>(staticMapStructure.length);
        let player: Player = new Player(0, 0, "@");
        for(let i = 0; i < staticMapStructure.length; i++) {
            tiles[i] = new Array<Tile>(staticMapStructure[i].length);
            for(let j = 0; j < staticMapStructure[i].length; j++) {
                let actor: Actor = this.symbolToActorMap(staticMapStructure[i][j], j, i);
                tiles[i][j] = new Tile(j, i, actor);
                if (actor instanceof Player) {
                    player = actor;
                }
            }
        }
        return {map: new Map(tiles), player };
    }

    static constructInitialBlankMap(staticMapStructure: string[][]): Map {
        const tiles: Tile[][] = new Array<Tile[]>(staticMapStructure.length);
        for(let i = 0; i < staticMapStructure.length; i++) {
            tiles[i] = new Array<Tile>(staticMapStructure[i].length);
            for(let j = 0; j < staticMapStructure[i].length; j++) {
                tiles[i][j] = new Tile(j, i, TileFactory.createTile(TileType.VOID));
            }
        }
        return new Map(tiles);
    }

    private static symbolToActorMap(symbol: string, x: number, y: number): Actor {
        switch (symbol) {
            case "@":
                return new Player(x, y, symbol);
            case "#":
                return TileFactory.createTile(TileType.WALL);
            case ".":
                return TileFactory.createTile(TileType.EMPTY);
            case "E":
                return TileFactory.createTile(TileType.DOOR_EXIT);
            case "+":
                return TileFactory.createTile(TileType.DOOR_CLOSED);
            case "%":
                return TileFactory.createTile(TileType.EMPTY);
            case "k":
                return TileFactory.createTile(TileType.EMPTY);
            case "p":
                return TileFactory.createTile(TileType.EMPTY);
            case "v":
                return TileFactory.createTile(TileType.EMPTY);
            default:
                return TileFactory.createTile(TileType.VOID);
        }
    }
}