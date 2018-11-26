import {Display} from 'rot-js';
import {DISPLAY_WIDTH, DISPLAY_HEIGHT} from './Constants';
import {Player} from "./Player";

export class Game {
    private readonly display: Display;
    private readonly player: Player;

    constructor() {
        this.display = new Display({
            width: DISPLAY_WIDTH,
            height: DISPLAY_HEIGHT
        });
        this.player = new Player();
    }

    newGame() {
        const gameDisplay = this.display.getContainer();
        // @ts-ignore
        document.getElementById('game-display').appendChild(gameDisplay);
        this.display.draw(5,  4, "@");
        this.display.draw(15, 4, "%", "#0f0");          // foreground color
        this.display.draw(25, 4, "#", "#f00", "#009");  // and background color
        console.log(gameDisplay)
    }

    getPlayer(): Player {
        return this.player;
    }
}