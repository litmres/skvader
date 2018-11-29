import {Actor} from "./Actor";
import {Display} from "rot-js";
import {TileFactory, TileType} from "./TileFactory";

export class Tile {
    private readonly x: number;
    private readonly y: number;
    private readonly actor: Actor;

    constructor(_x: number, _y: number, _actor?: Actor) {
        this.x = _x;
        this.y = _y;
        this.actor = _actor ? _actor : TileFactory.createTile(TileType.VOID);
    }

    draw(display: Display) {
        display.draw(this.x, this.y, this.actor.symbol, this.actor.foregroundColor, this.actor.backgroundColor);
    }

    isTransparent(): boolean {
        return this.actor.transparent;
    }

    canBePassed(): boolean {
        return this.actor.passable;
    }

    displayAsOutOfVision(): Tile {
        return new Tile(this.x, this.y, new Actor(this.actor.symbol, this.isTransparent(), this.canBePassed(), "#5d5d5d", this.actor.backgroundColor));
    }

    getActor(): Actor {
        return this.actor;
    }
}