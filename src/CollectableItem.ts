import {Interactable} from "./Interactable";
import {Actor} from "./Actor";
import {EventEmitter} from "fbemitter";
import {ITEM_ADDED_TO_INVENTORY} from "./Constants";
import {createHash} from "crypto";

export class CollectableItem extends Interactable {

    constructor(_item: Actor, _resultingActor: Actor, _x: number, _y: number, _emitter: EventEmitter, _metadata?: string) {
        super(
            _resultingActor,
            _x, _y, _emitter,
            _item.symbol,
            _item.transparent,
            _item.passable,
            _item.foregroundColor,
            _item.backgroundColor,
            _metadata
        );
    }

    interactWith(): void {
        super.interactWith();
        this.gameEventsEmitter.emit(ITEM_ADDED_TO_INVENTORY, this);
    }

    toHash(): string {
        const stringRepresentation = `${this.symbol}, ${this.foregroundColor}, ${this.backgroundColor}, ${this.metadata}`;
        const data = createHash('md5').update(stringRepresentation, 'ascii');
        return data.digest('hex');
    }
}



