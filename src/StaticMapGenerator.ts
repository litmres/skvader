import {Map} from "./Map";
import {Actor} from "./Actor";
import {Player} from "./Player";
import {TileFactory, TileType} from "./TileFactory";
import {Tile} from "./Tile";

export class StaticMapGenerator {
    static construct(staticMapStructure: string[][]): Map {
        const tiles: Tile[][] = new Array<Tile[]>(staticMapStructure.length);
        for(let x = 0; x < staticMapStructure.length; x++) {
            tiles[x] = new Array<Tile>(staticMapStructure[x].length);
            for(let y = 0; y < staticMapStructure[x].length; y++) {
                tiles[x][y] = new Tile(y, x, this.symbolToActorMap(staticMapStructure[x][y]));
            }
        }
        console.log(tiles);
        return new Map(tiles);
    }

    private static symbolToActorMap(symbol: string): Actor {
        switch (symbol) {
            case "@":
                return new Player(symbol);
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