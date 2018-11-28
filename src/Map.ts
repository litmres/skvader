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

    canSeePast(x: number, y: number): boolean {
        let tile: Tile = this.tiles[x][y];
        return tile.isTransparent();
    }

    canPass(x: number, y: number): boolean {
        return this.tiles[y][x].canBePassed();
    }

    getTile(x: number, y: number): Tile {
        return this.tiles[y][x];
    }

    updateTile(x: number, y: number, tile: Tile): void {
        this.tiles[y][x] = tile;
    }

    applyDarkness(): void {
        for(let i = 0; i < this.tiles.length; i++) {
            for(let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j] = this.tiles[i][j].displayAsOutOfVision();
            }
        }
    }
}