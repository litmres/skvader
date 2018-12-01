import {Interactable} from "./Interactable";
import {Actor} from "./Actor";
import {EventEmitter} from "fbemitter";
import {ActorFactory, TileType} from "./ActorFactory";

export class ClosedDungeonDoor extends Interactable {
    private static readonly _protoActor: Actor = ActorFactory.createActor(TileType.DOOR_CLOSED);

    constructor(_x: number, _y: number, _emitter: EventEmitter, _metadata?: string) {
        super(
            ActorFactory.createActor(TileType.DOOR_OPEN),
            _x, _y, _emitter,
            ClosedDungeonDoor._protoActor.symbol,
            ClosedDungeonDoor._protoActor.transparent,
            ClosedDungeonDoor._protoActor.passable,
            ClosedDungeonDoor._protoActor.foregroundColor,
            ClosedDungeonDoor._protoActor.backgroundColor,
            _metadata
        );
    }
}