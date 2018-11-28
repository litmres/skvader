import {Display} from 'rot-js';
import {DISPLAY_HEIGHT, DISPLAY_WIDTH} from './Constants';
import {Level} from "./Level";
import {Player} from "./Player";
import {IGameEngine} from "./IGameEngine";
import {ChapterOne} from "./ChapterOne";

export class Game {
    private readonly display: Display;
    private readonly player: Player;

    constructor() {
        this.display = new Display({
            width: DISPLAY_WIDTH,
            height: DISPLAY_HEIGHT
        });
        this.player = new Player("@");

    }

    newGame(level: Level) {
        const gameDisplay = this.display.getContainer();
        // @ts-ignore
        document.getElementById('game-display').appendChild(gameDisplay);
        let gameEngine: IGameEngine;
        switch (level) {
            case Level.CHAPTER_ONE:
                gameEngine = new ChapterOne(this.display);
                break;
            case Level.CHAPTER_TWO:
                gameEngine = new ChapterOne(this.display);
                break;
            default:
                gameEngine = new ChapterOne(this.display);
        }
        gameEngine.start();
    }

    getPlayer(): Player {
        return this.player;
    }
}