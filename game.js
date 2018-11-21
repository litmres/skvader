const Game = {
    display: null,
    map: {},
    player: null,
    pedro: null,
    engine: null,
    ananas: null,

    init: function() {
        this.display = new ROT.Display({
            width: 100,
            height: 50,
            bg: "#000",
            fontSize: 20,
            layout: "rect"
        });
        document.body.appendChild(this.display.getContainer());
        this._generateMap();

        const scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);
        scheduler.add(this.pedro, true);

        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },

    isPassable: function(x,y) {
        let tileType = this.map[x+","+y];
        return tileType === "." || tileType === "*" || tileType === "+";
    },

    _generateMap: function() {
        const digger = new ROT.Map.Uniform(100, 50);

        const digCallback = function(x, y, value) {
            const key = x+","+y;

            if (value) {
                // Not floor tile i.e. a wall
                this.map[key] = "%";
            } else {
                this.map[key] = ".";
            }
        };
        digger.create(digCallback.bind(this));
        this.map.rooms = digger.getRooms();
        this.map.corridors = digger.getCorridors();
        this._generateDoors();
        let freeCells = this._getFreeCells();
        this._generateBoxes(freeCells);
        this.player = this._createBeing(Player, freeCells);
        this.pedro = this._createBeing(Pedro, freeCells);
    },

    _getFreeCells: function() {
        const freeCells = [];
        for (let key in this.map) {
            if (this.map[key] === ".") {
                freeCells.push(key);
            }
        }
        return freeCells;
    },

    _generateDoors: function() {
        for (let key in this.map.rooms) {
            for (let door in this.map.rooms[key]._doors) {
                this.map[door] = "#";
            }
        }
    },

    _generateBoxes: function(freeCells) {
        for (let i=0;i<10;i++) {
            const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            const key = freeCells.splice(index, 1)[0];
            this.map[key] = "*";
            if (!i) { this.ananas = key; } /* first box contains an ananas */
        }
    },

    _createBeing: function(what, freeCells) {
        const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        const key = freeCells.splice(index, 1)[0];
        const parts = key.split(",");
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        return new what(x, y);
    }
};

const Player = function(x, y) {
    this._x = x;
    this._y = y;
    this._vision = 10;
    this._fov = new ROT.FOV.RecursiveShadowcasting(function(x, y) {
        let tileType = Game.map[x+","+y];
        return tileType === "." || tileType === "*" || tileType === "+";
    });
    this._mapDiscovered = {};
    this._draw();
};

Player.prototype._draw = function() {
    this.updateView();
    Game.display.draw(this._x, this._y, "@", "#ff0");
};

Player.prototype.updateView = function() {
    let that = this;
    for (let key in this._mapDiscovered) {
        const parts = key.split(",");
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        Game.display.draw(x, y, this._mapDiscovered[key], "#5d5d5d");
    }
    this._fov.compute(this._x, this._y, this._vision, function(x, y, r, visibility) {
        let key = x+","+y;
        let ch = Game.map[key];
        that._mapDiscovered[key] = ch;
        Game.display.draw(x, y, ch, that.darkenView("#fff", r));
    });
};

Player.prototype.darkenView = function(color, distance) {
    if (!color) { return color; }
    return ROT.Color.toRGB(ROT.Color.fromString(color).map(x => x - (distance * 5)));
};

Player.prototype.act = function() {
    Game.engine.lock();
    /* wait for user input; do stuff when user hits a key */
    window.addEventListener("keydown", this);
};

Player.prototype.handleEvent = function(e) {
    var keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;
    keyMap[13] = 99;
    keyMap[32] = 99;

    var code = e.keyCode;
    /* one of numpad directions? */
    if (!(code in keyMap)) { return; }
    if (code === 13 || code === 32) {
        this._checkBox();
    } else {
        /* is there a free space? */
        var dir = ROT.DIRS[8][keyMap[code]];
        var newX = this._x + dir[0];
        var newY = this._y + dir[1];
        if (!Game.isPassable(newX, newY)) { return; }
        if (newX === Game.pedro.getX() && newY === Game.pedro.getY()) {
            alert("Game over - you were captured by Pedro!");
            return;
        }
        Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
        this._x = newX;
        this._y = newY;
        this._draw();
    }
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
};

Player.prototype._checkBox = function() {
    const key = this._x + "," + this._y;
    if (Game.map[key] !== "*") {
        alert("There is no box here!");
    } else if (key === Game.ananas) {
        alert("Hooray! You found an ananas and won this game.");
        Game.engine.lock();
        window.removeEventListener("keydown", this);
    } else {
        alert("This box is empty :-(");
        Game.map[key] = "+";
    }
};

Player.prototype.getX = function() { return this._x; };

Player.prototype.getY = function() { return this._y; };

const Pedro = function(x, y) {
    this._x = x;
    this._y = y;
    this._vision = 15;
    this._fov = new ROT.FOV.RecursiveShadowcasting(function(x, y) {
        let tileType = Game.map[x+","+y];
        return tileType === "." || tileType === "*" || tileType === "+" || tileType === "/";
    });
    this.roomsToCheck = Game.map.rooms;
    this.destinationRoom = {};
    this.hasSpottedPlayer = false;
};

Pedro.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "P", "red");
};

Pedro.prototype.act = function() {
    const passableCallback = function(x, y) {
        return Game.pedro._pathing(x, y);
    };
    const path = [];
    const pathCallback = function(x, y) {
        path.push([x, y]);
    };

    if (this.hasSpottedPlayer) {
        console.log("PEDRO HAS SPOTTED THE PLAYER - BEWARE...");
        const x = Game.player.getX();
        const y = Game.player.getY();
        const astar = new ROT.Path.AStar(x, y, passableCallback, {topology:4});
        astar.compute(this._x, this._y, pathCallback);
        path.shift(); /* remove Pedro's position */
        if (path.length === 1) {
            Game.engine.lock();
            alert("Game over - you were captured by Pedro!");
        } else {
            let x = path[0][0];
            let y = path[0][1];
            Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
            this._x = x;
            this._y = y;
            this._draw();
        }
    } else {
        let destX;
        let destY;
        if (this.canSeePlayer()) {
            this.hasSpottedPlayer = true;
            destX = Game.player.getX();
            destY = Game.player.getY();
        } else if (! this.destinationRoom.x) {
            if (this.roomsToCheck === []) {
                // If we've visited all of the rooms, then repopulate the list
                this.roomsToCheck = Game.map.rooms;
            }
            let newTargetRoom = this.roomsToCheck.shift();
            this.destinationRoom.x = newTargetRoom._x1;
            this.destinationRoom.y = newTargetRoom._y1;
            destX = this.destinationRoom.x;
            destY = this.destinationRoom.y;
        } else {
            destX = this.destinationRoom.x;
            destY = this.destinationRoom.y;
        }
        const astar = new ROT.Path.AStar(destX, destY, passableCallback, {topology:4});
        astar.compute(this._x, this._y, pathCallback);
        path.shift(); /* remove Pedro's position */
        if (path.length === 1) {
            console.log("PEDRO HAS REACHED A ROOM");
            this.destinationRoom = {};
        } else {
            let x = path[0][0];
            let y = path[0][1];
            this._x = x;
            this._y = y;
        }
    }
};

Pedro.prototype.canSeePlayer = function () {
    let seenPlayer = false;
    const playerX = Game.player.getX();
    const playerY = Game.player.getY();
    this._fov.compute(this._x, this._y, this._vision, function(x, y, r, visibility) {
        if (! seenPlayer) {
            if (x === playerX && y === playerY) {
                seenPlayer = true;
            }
        }
    });
    return seenPlayer;
};

Pedro.prototype._pathing = function(x,y) {
    let tileType = Game.map[x+","+y];
    return tileType === "." || tileType === "*" || tileType === "+" || tileType === "#" || tileType === "/";
};

Pedro.prototype.getX = function() { return this._x; };

Pedro.prototype.getY = function() { return this._y; };
