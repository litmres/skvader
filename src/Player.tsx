import {Actor} from "./Actor";
import {PLAYERS_DEFAULT_VISION} from "./Constants";

export class Player extends Actor {
    private x: number;
    private y: number;
    private vision: number = PLAYERS_DEFAULT_VISION;

    constructor(_x: number, _y: number, _symbol: string, _foregroundColor?: string, _backgroundColor?: string) {
        super(_symbol, true, true, _foregroundColor, _backgroundColor);
        this.x = _x;
        this.y = _y;
    }

    getX(): number {
        return this.x;
    }

    updateX(_x: number): void {
        this.x = _x;
    }

    getY(): number {
        return this.y;
    }

    updateY(_y: number): void {
        this.y = _y;
    }

    getVision(): number {
        return this.vision;
    }
}