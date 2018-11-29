import {Actor} from "./Actor";
import {IMap} from "./IMap";
import {Tile} from "./Tile";
import {ActorFactory, TileType} from "./ActorFactory";
import {FOV} from "rot-js";

export interface ICoordinate {
    x: number,
    y: number
}

export class ItemsMap implements IMap {
    private readonly items: Map<ICoordinate, Actor> = new Map();
    private readonly fov: FOV = new FOV.RecursiveShadowcasting(this.canSeePast.bind(this));

    constructor(_items: Tile[]) {
        _items.forEach((item: Tile) => this.items.set(ItemsMap.asTuple(item.x, item.y), item.actor));
    }

    canPass(x: number, y: number): boolean {
        let tile = this.items.get(ItemsMap.asTuple(x, y));
        return tile ? tile.passable : false;
    }

    canSeePast(x: number, y: number): boolean {
        let tile = this.items.get(ItemsMap.asTuple(x, y));
        return tile ? tile.transparent : false;
    }

    getActor(x: number, y: number): Actor {
        return this.items.get(ItemsMap.asTuple(x, y)) || ActorFactory.createActor(TileType.VOID);
    }

    static asTuple(x: number, y: number): ICoordinate {
        return {x, y};
    }

    computeVisibleActors(x: number, y: number, vision: number): Tile[] {
        const tiles: Tile[] = new Array<Tile>();
        this.fov.compute(x, y, vision, (x: number, y: number, R: number, visibility: number) => {
            if (this.items.has(ItemsMap.asTuple(x, y))) {
                tiles.push({x, y, actor: this.getActor(x, y)});
            }
        });
        return tiles;
    }
}