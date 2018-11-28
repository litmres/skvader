import {BACKGROUND_DEFAULT_COLOR, FOREGROUND_DEFAULT_COLOR} from "./Constants";

export class Actor {
    readonly symbol: string;
    readonly foregroundColor: string;
    readonly backgroundColor: string;

    constructor(_symbol: string, _foregroundColor?: string, _backgroundColor?: string) {
        this.symbol = _symbol;
        this.foregroundColor = _foregroundColor ? _foregroundColor : FOREGROUND_DEFAULT_COLOR;
        this.backgroundColor = _backgroundColor ? _backgroundColor : BACKGROUND_DEFAULT_COLOR;
    }
}