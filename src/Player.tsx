import {
    BACKGROUND_DEFAULT_COLOR, FINISHED_PLAYERS_TURN,
    FOREGROUND_DEFAULT_COLOR,
    PLAYERS_DEFAULT_VISION,
    START_PLAYERS_TURN
} from "./Constants";
import {KeyboardInputDrivenActor} from "./KeyboardInputDrivenActor";
import {Map} from "./Map";
import {EventEmitter} from "fbemitter";
import {TileFactory, TileType} from "./TileFactory";
import {Tile} from "./Tile";

export interface ICharacter {
    act(): void;
}

export class Player extends KeyboardInputDrivenActor implements ICharacter {
    private x: number;
    private y: number;
    private vision: number = PLAYERS_DEFAULT_VISION;
    private readonly map: Map;
    private readonly gameEventsEmitter: EventEmitter;

    constructor(_x: number, _y: number, _map: Map, _emitter: EventEmitter) {
        super("@", true, true, FOREGROUND_DEFAULT_COLOR, BACKGROUND_DEFAULT_COLOR);
        this.x = _x;
        this.y = _y;
        this.map = _map;
        this.gameEventsEmitter = _emitter;
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
    }

    private performMove(newX: number, newY: number): void {
        this.map.updateTile(this.x, this.y, new Tile(this.x, this.y, TileFactory.createTile(TileType.EMPTY)));
        this.map.updateTile(newX, newY, new Tile(newX, newY, this));
        this.x = newX;
        this.y = newY;
        this.gameEventsEmitter.emit(FINISHED_PLAYERS_TURN);
    }

    private indicateInvalidMove(newX: number, newY: number): void {
        console.log(`Can not move to the new position: ${newX} ${newY} it would be an invalid move`);
    }
}