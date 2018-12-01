import {Actor} from "./Actor";
import {IMap} from "./IMap";
import {FOV} from "rot-js";
import {Tile} from "./Tile";

export class DungeonMap implements IMap {
    protected readonly actors: Actor[][];
    protected readonly fov: FOV = new FOV.RecursiveShadowcasting(this.canSeePast.bind(this));

    constructor(_actors: Actor[][]) {
        this.actors = _actors;
    }

    canSeePast(x: number, y: number): boolean {
        const actor: Actor = this.actors[y][x];
        // Deals with the edge case where we sometimes can see a void / out of the dungeon (happens around the dungeon exit)
        return actor ? actor.transparent : false;
    }

    canPass(x: number, y: number): boolean {
        const actor: Actor = this.actors[y][x];
        // Deals with the edge case where we sometimes can see a void / out of the dungeon (happens around the dungeon exit)
        return actor ? actor.passable : false;
    }

    getActor(x: number, y: number): Actor {
        return this.actors[y][x];
    }

    computeVisibleActors(x: number, y: number, vision: number): Tile[] {
        const tiles: Tile[] = new Array<Tile>();
        this.fov.compute(x, y, vision, (x: number, y: number, R: number, visibility: number) => {
            tiles.push({x, y, actor: this.getActor(x, y)});
        });
        return tiles;
    }
}