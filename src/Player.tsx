import {EventEmitter} from "fbemitter";
import {DIRS} from "rot-js";
import {Actor} from "./Actor";
import {
    BACKGROUND_DEFAULT_COLOR,
    FINISHED_PLAYERS_TURN,
    FOREGROUND_DEFAULT_COLOR,
    PLAYERS_DEFAULT_VISION,
    START_PLAYERS_TURN
} from "./Constants";
import {DungeonMap} from "./DungeonMap";
import {Interactable} from "./Interactable";
import {KeyboardInputDrivenActor} from "./KeyboardInputDrivenActor";

export interface ICharacter {
    act(): void;
}

export class Player extends KeyboardInputDrivenActor implements ICharacter {
    private x: number;
    private y: number;
    private vision: number = PLAYERS_DEFAULT_VISION;
    private readonly map: DungeonMap;
    private readonly gameEventsEmitter: EventEmitter;

    constructor(_x: number, _y: number, _map: DungeonMap, _gameEmitter: EventEmitter) {
        super("@", true, true, FOREGROUND_DEFAULT_COLOR, BACKGROUND_DEFAULT_COLOR);
        this.x = _x;
        this.y = _y;
        this.map = _map;
        this.gameEventsEmitter = _gameEmitter;
    }

    act(): void {
        this.gameEventsEmitter.emit(START_PLAYERS_TURN);
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getVision(): number {
        return this.vision;
    }

    handleMoveDown(): void {
        let newY = this.y + 1;
        if (this.map.canPass(this.x, newY)) {
            this.performMove(this.x, newY);
        } else {
            this.indicateInvalidMove(this.x, newY);
        }
    }

    handleMoveLeft(): void {
        let newX = this.x - 1;
        if (this.map.canPass(newX, this.y)) {
            this.performMove(newX, this.y);
        } else {
            this.indicateInvalidMove(newX, this.y);
        }
    }

    handleMoveRight(): void {
        let newX = this.x + 1;
        if (this.map.canPass(newX, this.y)) {
            this.performMove(newX, this.y);
        } else {
            this.indicateInvalidMove(newX, this.y);
        }
    }

    handleMoveUp(): void {
        let newY = this.y - 1;
        if (this.map.canPass(this.x, newY)) {
            this.performMove(this.x, newY);
        } else {
            this.indicateInvalidMove(this.x, newY);
        }
    }

    performAction(): void {
        let dirs = DIRS[4];
        let interactionHappened = false;
        // Currently the player will interact with multiple adjacent 'actors' in a turn if it is possible (a future enhancement might be to add keys to denote which action to take).
        for(let dir in dirs) {
            let newX = this.x + dirs[dir][0];
            let newY = this.y + dirs[dir][1];
            let actor: Actor = this.map.getActor(newX, newY);
            if (actor instanceof Interactable) {
                const item: Interactable = actor as Interactable;
                item.interactWith();
                interactionHappened = true;
            }
        }
        if (interactionHappened) {
            this.gameEventsEmitter.emit(FINISHED_PLAYERS_TURN);
        }
    }

    private performMove(newX: number, newY: number): void {
        this.x = newX;
        this.y = newY;
        this.gameEventsEmitter.emit(FINISHED_PLAYERS_TURN);
    }

    private indicateInvalidMove(newX: number, newY: number): void {
        console.log(`Can not move to the new position: ${newX} ${newY} it would be an invalid move`);
    }
}