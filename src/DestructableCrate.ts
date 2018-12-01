import {Interactable} from "./Interactable";
import {Actor} from "./Actor";
import {EventEmitter} from "fbemitter";
import {ActorFactory, TileType} from "./ActorFactory";

export class DestructableCrate extends Interactable {
    private static readonly _protoActor: Actor = ActorFactory.createActor(TileType.CRATE);

    constructor(_contents: Actor, _x: number, _y: number, _emitter: EventEmitter, _metadata?: string) {
        super(
            _contents,
            _x, _y, _emitter,
            DestructableCrate._protoActor.symbol,
            DestructableCrate._protoActor.transparent,
            DestructableCrate._protoActor.passable,
            DestructableCrate._protoActor.foregroundColor,
            DestructableCrate._protoActor.backgroundColor,
            _metadata
        );
    }
}