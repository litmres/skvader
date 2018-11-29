import {EventEmitter} from "fbemitter";
import {Display, Engine, FOV, Scheduler} from "rot-js";
import {IGameEngine} from "./IGameEngine";
import {Map} from "./Map";
import {StaticMapGenerator} from "./StaticMapGenerator";
import {Player} from "./Player";
import {
    DISPLAY_TUTORIAL_MESSAGE,
    DISPLAY_ZOOM_IN, DISPLAY_ZOOM_OUT,
    FINISHED_PLAYERS_TURN,
    PERSISTENT_ACTOR,
    START_PLAYERS_TURN, USER_DISMISSED_TUTORIAL_MESSAGE
} from "./Constants";
import {Tile} from "./Tile";

export class ChapterOne implements IGameEngine{
    private readonly appEventsEmitter: EventEmitter;
    private readonly gameEventsEmitter: EventEmitter;
    private readonly display: Display;
    private readonly fov: FOV;
    private readonly player: Player;
    private readonly map: Map;
    private readonly discoveredMap: Map;
    private readonly gameEngine: Engine;
    private tutorialProgress: number = 0;

    constructor(_display: Display, _appEventEmitter: EventEmitter) {
        this.appEventsEmitter = _appEventEmitter;
        this.gameEventsEmitter = new EventEmitter();
        this.gameEventsEmitter.addListener(START_PLAYERS_TURN, this.handlePlayersTurnStart.bind(this));
        this.gameEventsEmitter.addListener(FINISHED_PLAYERS_TURN, this.handlePlayersTurnEnded.bind(this));
        this.appEventsEmitter.addListener(USER_DISMISSED_TUTORIAL_MESSAGE, this.giveControlBackToPlayer.bind(this));
        this.display = _display;
        this.map = StaticMapGenerator.construct(this.staticMap);
        this.fov = new FOV.RecursiveShadowcasting(this.map.canSeePast.bind(this.map));
        this.discoveredMap = StaticMapGenerator.constructInitialBlankMap(this.staticMap);
        let {x, y } = StaticMapGenerator.discoverPlayersStartingCoordinates(this.staticMap);
        this.player = new Player(x, y, this.map, this.gameEventsEmitter);
        this.map.updateTile(x, y, new Tile(x, y, this.player));
        let scheduler = new Scheduler.Simple();
        scheduler.add(this.player, PERSISTENT_ACTOR);
        this.gameEngine = new Engine(scheduler);
    }

    start(): void {
        this.updatePlayersFieldOfView();
        this.discoveredMap.draw(this.display);
        this.showTutorial();
    }

    private showTutorial(): void {
        if (this.tutorialProgress === 0) {
            this.appEventsEmitter.emit(DISPLAY_ZOOM_IN);
            this.appEventsEmitter.emit(DISPLAY_TUTORIAL_MESSAGE, "Welcome to the Dungeon! 👻👹🎃👺☠️",
                "<div className_='Tutorial-text'>" +
                "<p><b>Some information to get you started:</b></p>" +
                "<p>Your character is represented by the <span className='Fgw-bgb Char'>@</span></p>" +
                "<p>The walls of the dungeon are represented by <span className='Fgw-bgb Char'>#</span>s</p>" +
                "<p>The, empty, floor tiles of the dungeon are represented by <span className='Fgw-bgb Char'>.</span>s</p>" +
                "<br />" +
                "<p>You can move your character around using the <b>Arrow Keys</b> or <b>WASD</b></p>" +
                "<br />" +
                "<p><b>Give it a go!</b></p>" +
                "</div>"
            );
        } else if (this.tutorialProgress === 1) {
            this.appEventsEmitter.emit(DISPLAY_ZOOM_IN);
            this.appEventsEmitter.emit(DISPLAY_TUTORIAL_MESSAGE, "Putting your best foot forward. 🚶👣🏃💨",
                "<div className_='Tutorial-text'>" +
                "<p><b>Looks like you have gotten the hang of moving around. Here's some information to help you progress further:</b></p>" +
                "<p>Closed doors are represented by <span className='Fgbr-bgb Char'>+</span> <i>e.g. the one at the end of this room.</i></p>" +
                "<p>Open doors are represented by <span className='Fgbr-bgb Char'>/</span></p>" +
                "<p>You can open that door by standing, on the tile, in front of it and pressing the <b>Space bar</b> or the <b>Return key</b></p>" +
                "<br />" +
                "<p><b>Time to open that door and find out what lies behind it!</b></p>" +
                "</div>"
            );
        } else if(this.tutorialProgress == 2) {

        }
    }

    private giveControlBackToPlayer(): void {
        if (this.tutorialProgress === 0) {
            this.gameEngine.start();
        }
        this.appEventsEmitter.emit(DISPLAY_ZOOM_OUT);
        this.tutorialProgress = this.tutorialProgress + 1;
    }

    private updatePlayersFieldOfView(): void {
        this.discoveredMap.applyDarkness();
        this.fov.compute(this.player.getX(), this.player.getY(), this.player.getVision(), (x: number, y: number, R: number, visibility: number) => {
            this.discoveredMap.updateTile(x, y, this.map.getTile(x, y));
        });
    }

    private handlePlayersTurnStart() {
        this.gameEngine.lock();
    }

    private handlePlayersTurnEnded() {
        this.updatePlayersFieldOfView();
        this.discoveredMap.draw(this.display);
        this.gameEngine.unlock();
        let x = this.player.getX();
        let y = this.player.getY();
        if (this.tutorialProgress === 1 && (x === 9 && (y > 1 && y < 9)) || ((y === 1 || y === 9) && x === 10)) {
            return this.showTutorial();
        }
    }

    private readonly staticMap: string[][] = [
        ["#", "#", "#", "#", "#", "#", "#", "#","#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " "],
        ["#", ".", ".", ".", ".", ".", ".", ".",".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", " ", " "],
        ["#", ".", ".", ".", ".", ".", ".", ".",".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", " ", " "],
        ["#", ".", ".", ".", ".", ".", ".", ".",".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", " ", " "],
        ["#", ".", ".", ".", ".", ".", ".", ".",".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", " ", " "],
        ["E", "@", ".", ".", ".", ".", ".", ".",".", ".", ".", ".", ".", ".", "+", ".", ".", ".", ".", ".", ".", ".", ".", "k", "#", " ", " "],
        ["#", ".", ".", ".", ".", ".", ".", ".",".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", " ", " "],
        ["#", ".", ".", ".", ".", ".", ".", ".",".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", " ", " "],
        ["#", ".", ".", ".", ".", ".", ".", ".",".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", " ", " "],
        ["#", ".", ".", ".", ".", ".", ".", ".",".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", " ", " "],
        ["#", "#", "#", "#", "#", "#", "#", "#","#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "+", "#", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "," ", " ", "#", "p", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "," ", " ", "#", "+", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", ".", "#", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "," ", " ", "#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#", "#", "+", "#", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "," ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", ".", "#", "#", ".", "#", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "," ", " ", " ", " ", " ", " ", "#", "v", ".", "+", ".", "+", ".", "#", "#", ".", "#", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "," ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "%", "#", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "," ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "," ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "," ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "," ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
    ]
}