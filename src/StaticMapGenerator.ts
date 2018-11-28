import {Map} from "./Map";
import {Actor} from "./Actor";
import {Player} from "./Player";
import {TileFactory, TileType} from "./TileFactory";
import {Tile} from "./Tile";

export class StaticMapGenerator {
    static construct(staticMapStructure: string[][]): Map {
        const tiles: Tile[][] = new Array<Tile[]>(staticMapStructure.length);
        for(let i = 0; i < staticMapStructure.length; i++) {
            tiles[i] = new Array<Tile>(staticMapStructure[i].length);
            for(let j = 0; j < staticMapStructure[i].length; j++) {
                tiles[i][j] = new Tile(j, i, this.symbolToActorMap(staticMapStructure[i][j], j, i));
            }
        }

        return new Map(tiles);
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

    private static symbolToActorMap(symbol: string, x: number, y: number): Actor {
        switch (symbol) {
            case "@":
                return TileFactory.createTile(TileType.EMPTY);
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