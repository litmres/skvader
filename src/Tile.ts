import {Actor} from "./Actor";

export interface Tile {
    readonly x: number;
    readonly y: number;
    readonly actor: Actor;
}