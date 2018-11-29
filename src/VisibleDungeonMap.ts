import {DungeonMap} from "./DungeonMap";
import {Actor} from "./Actor";
import {Display} from "rot-js";
import {Tile} from "./Tile";
import {Player} from "./Player";

export class VisibleDungeonMap extends DungeonMap {

    constructor(_actors: Actor[][]) {
        super(_actors);
    }

    draw(display: Display): void {
        for(let i = 0; i < this.actors.length; i++) {
            for(let j = 0; j < this.actors[i].length; j++) {
                let actor: Actor = this.actors[i][j];
                display.draw(j, i, actor.symbol, actor.foregroundColor, actor.backgroundColor);
            }
        }
    }

    applyDarkness(): void {
        for(let i = 0; i < this.actors.length; i++) {
            for(let j = 0; j < this.actors[i].length; j++) {
                let actor = this.actors[i][j];
                this.actors[i][j] = new Actor(actor.symbol, actor.transparent, actor.passable, "#5d5d5d", actor.backgroundColor);
            }
        }
    }

    updateVisibleMap(player: Player, visibleDungeonMap: Tile[], visibleItemsMap: Tile[]): void {
        visibleDungeonMap.forEach((t) => this.updateActors(t));
        visibleItemsMap.forEach((t) => this.updateActors(t));
        this.updateActors({x: player.getX(), y: player.getY(), actor: player});
    }

    private updateActors(tile: Tile): void {
        let {x, y, actor} = tile;
        this.actors[y][x] = actor;
    }
}