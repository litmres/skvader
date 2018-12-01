import {Display} from 'rot-js';
import {DISPLAY_HEIGHT, DISPLAY_WIDTH, DEFAULT_FONT_SIZE} from './Constants';
import {Level} from "./Level";
import {IGameEngine} from "./IGameEngine";
import {ChapterOne} from "./ChapterOne";
import {EventEmitter} from "fbemitter";
import {ChapterTwo} from "./ChapterTwo";

export class Game {
    private readonly display: Display;

    constructor() {
        this.display = new Display({
            width: DISPLAY_WIDTH,
            height: DISPLAY_HEIGHT,
            fontSize: DEFAULT_FONT_SIZE
        });
    }

    newGame(level: Level, appDisplayEventsEmitter: EventEmitter) {
        const gameDisplay = this.display.getContainer();
        // @ts-ignore
        document.getElementById('Game-display').appendChild(gameDisplay);
        let gameEngine: IGameEngine;
        switch (level) {
            case Level.CHAPTER_ONE:
                gameEngine = new ChapterOne(this.display, appDisplayEventsEmitter);
                break;
            case Level.CHAPTER_TWO:
                gameEngine = new ChapterTwo(this.display, appDisplayEventsEmitter);
                break;
            default:
                gameEngine = new ChapterOne(this.display, appDisplayEventsEmitter);
        }
        gameEngine.start();
    }
}