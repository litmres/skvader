import {EventEmitter} from "fbemitter";
import {Display, Engine, FOV, Scheduler} from "rot-js";
import {IGameEngine} from "./IGameEngine";
import {Map} from "./Map";
import {StaticMapGenerator} from "./StaticMapGenerator";
import {Player} from "./Player";
import {FINISHED_PLAYERS_TURN, PERSISTENT_ACTOR, START_PLAYERS_TURN} from "./Constants";
import {Tile} from "./Tile";

export class ChapterOne implements IGameEngine{
    private readonly gameEventsEmitter: EventEmitter;
    private readonly display: Display;
    private readonly fov: FOV;
    private readonly player: Player;
    private readonly map: Map;
    private readonly discoveredMap: Map;
    private readonly gameEngine: Engine;

    constructor(_display: Display) {
        this.gameEventsEmitter = new EventEmitter();
        this.gameEventsEmitter.addListener(START_PLAYERS_TURN, this.handlePlayersTurnStart.bind(this));
        this.gameEventsEmitter.addListener(FINISHED_PLAYERS_TURN, this.handlePlayersTurnEnded.bind(this));
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
        this.gameEngine.start();
    }

    start(): void {
        this.updatePlayersFieldOfView();
        this.discoveredMap.draw(this.display);
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