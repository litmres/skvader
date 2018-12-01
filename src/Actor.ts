import {BACKGROUND_DEFAULT_COLOR, FOREGROUND_DEFAULT_COLOR} from "./Constants";

export class Actor {
    readonly symbol: string;
    readonly foregroundColor: string;
    readonly backgroundColor: string;
    readonly transparent: boolean;
    readonly passable: boolean;

    constructor(_symbol: string, _transparent: boolean, _passable: boolean, _foregroundColor?: string, _backgroundColor?: string) {
        this.symbol = _symbol;
        this.transparent = _transparent;
        this.passable = _passable;
        this.foregroundColor = _foregroundColor ? _foregroundColor : FOREGROUND_DEFAULT_COLOR;
        this.backgroundColor = _backgroundColor ? _backgroundColor : BACKGROUND_DEFAULT_COLOR;
    }
}