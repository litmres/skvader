import {Actor} from "./Actor";

export class Player extends Actor {
    inventory: Array<number> = [1];

    constructor(_symbol: string, _foregroundColor?: string, _backgroundColor?: string) {
        super(_symbol, _foregroundColor, _backgroundColor);
    }
}