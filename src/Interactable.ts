import {Actor} from "./Actor";
import {EventEmitter} from "fbemitter";
import {ITEM_INTERACTION_HAPPENED} from "./Constants";

export interface IInteractable {
    interactWith(): void;
}

export abstract class Interactable extends Actor implements IInteractable {
    // The coordinates on the map where the Actor resides
    protected readonly x: number;
    protected readonly y: number;
    // The actor to be placed on the current coordinate as a result of interacting with this actor
    protected readonly resultingActor: Actor;
    protected readonly gameEventsEmitter: EventEmitter;
    // Any extra information about this actor relevant to the game play
    protected readonly metadata?: string;

    protected constructor(_resultingActor: Actor, _x: number, _y: number, _emitter: EventEmitter, _symbol: string, _transparent: boolean, _passable: boolean, _foregroundColor?: string, _backgroundColor?: string, _metadata?: string) {
        super(_symbol, _transparent, _passable, _foregroundColor, _backgroundColor);
        this.resultingActor = _resultingActor;
        this.x = _x;
        this.y = _y;
        this.gameEventsEmitter = _emitter;
        this.metadata = _metadata;
    }

    interactWith(): void {
        this.gameEventsEmitter.emit(ITEM_INTERACTION_HAPPENED, {x: this.x, y: this.y, actor: this.resultingActor});
    }
}