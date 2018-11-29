import {Actor} from "./Actor";
import {Tile} from "./Tile";

export interface IMap {
    computeVisibleActors(x: number, y: number, vision: number): Tile[];
    canSeePast(x: number, y: number): boolean;
    canPass(x: number, y: number): boolean;
    getActor(x: number, y: number): Actor;
}