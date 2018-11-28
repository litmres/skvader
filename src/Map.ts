import {Tile} from "./Tile";
import {Display} from "rot-js";

export class Map {
    private readonly tiles: Tile[][];

    constructor(_tiles: Tile[][]) {
        this.tiles = _tiles;
    }

    draw(display: Display) {
        this.tiles.forEach((row: Tile[]) => row.forEach((tile: Tile) => tile.draw(display)));
    }
}