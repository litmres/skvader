import {DungeonMap} from "./DungeonMap";
import {Actor} from "./Actor";
import {Display} from "rot-js";
import {Tile} from "./Tile";
import {Player} from "./Player";
import {ItemsMap} from "./ItemsMap";

export class VisibleDungeonMap extends DungeonMap {

    private tempDiscoveredDungeon: Map<string, Actor> = new Map();

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

    /**
     * Override the function used to calculate what the player can see to factor in for items.
     *
     * @param x
     * @param y
     */
    canSeePast(x: number, y: number): boolean {
        const actor = this.tempDiscoveredDungeon.get(ItemsMap.asKey(x, y));
        return actor ? actor.transparent: false;
    }

    updateVisibleMap(player: Player, visibleDungeonMap: Tile[], visibleItemsMap: Tile[]): void {
        this.tempDiscoveredDungeon = new Map();

        // First add the base dungeon
        visibleDungeonMap.forEach((t) => this.updateTempDungeonMap(t));
        // Next overlay the items on the visible base dungeon
        visibleItemsMap.forEach((t) => this.updateTempDungeonMap(t));

        const that = this;
        const playerX = player.getX();
        const playerY = player.getY();
        this.fov.compute(playerX, playerY, player.getVision(), (x: number, y: number, R: number, visibility: number) => {
            const actor = that.tempDiscoveredDungeon.get(ItemsMap.asKey(x, y));
            if (actor) {
                that.actors[y][x] = actor;
            }
        });

        // Finally add the player to the visible dungeon map to be drawn.
        this.actors[playerY][playerX] =  player;
    }

    private updateTempDungeonMap(tile: Tile) {
        this.tempDiscoveredDungeon.set(ItemsMap.asKey(tile.x, tile.y), tile.actor);
    }
}