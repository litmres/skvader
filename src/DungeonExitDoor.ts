import {Interactable} from "./Interactable";
import {Actor} from "./Actor";
import {EventEmitter} from "fbemitter";
import {ActorFactory, TileType} from "./ActorFactory";
import {CHAPTER_ONE_EXIT_INTERACTION} from "./Constants";

export class DungeonExitDoor extends Interactable {
    private static readonly _protoActor: Actor = ActorFactory.createActor(TileType.DOOR_EXIT);

    constructor(_x: number, _y: number, _emitter: EventEmitter, _metadata?: string) {
        super(
            ActorFactory.createActor(TileType.DOOR_OPEN),
            _x, _y, _emitter,
            DungeonExitDoor._protoActor.symbol,
            DungeonExitDoor._protoActor.transparent,
            DungeonExitDoor._protoActor.passable,
            DungeonExitDoor._protoActor.foregroundColor,
            DungeonExitDoor._protoActor.backgroundColor,
            _metadata
        );
    }

    interactWith(): void {
        this.gameEventsEmitter.emit(CHAPTER_ONE_EXIT_INTERACTION);
    }
}