const Game = {
    display: null,
    map: {},
    player: null,
    pedro: null,
    engine: null,
    ananas: null,

    init: function() {
        this.display = new ROT.Display();
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
        console.log(tileType);
        return tileType === "." || tileType === "*";
    },

    _generateMap: function() {
        const digger = new ROT.Map.Digger();
        const freeCells = [];

        const digCallback = function(x, y, value) {
            const key = x+","+y;

            if (value) {
                // Not floor tile i.e. a wall
                this.map[key] = "%";
            } else {
                this.map[key] = ".";
                freeCells.push(key);
            }
        };
        digger.create(digCallback.bind(this));
        this._generateBoxes(freeCells);
        this._drawWholeMap();
        this.player = this._createBeing(Player, freeCells);
        this.pedro = this._createBeing(Pedro, freeCells);
    },

    _drawWholeMap: function() {
        for (let key in this.map) {
            const parts = key.split(",");
            const x = parseInt(parts[0]);
            const y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
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
    this._draw();
};

Player.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "@", "#ff0");
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

    var code = e.keyCode;
    if (code === 13 || code === 32) {
        this._checkBox();
        return;
    }
    /* one of numpad directions? */
    if (!(code in keyMap)) { return; }

    /* is there a free space? */
    var dir = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + dir[0];
    var newY = this._y + dir[1];
    var newKey = newX + "," + newY;
    if (!Game.isPassable(newX, newY)) { return; }

    Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
    this._x = newX;
    this._y = newY;
    this._draw();
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
    }
};

Player.prototype.getX = function() { return this._x; };

Player.prototype.getY = function() { return this._y; };

const Pedro = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
};

Pedro.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "P", "red");
};

Pedro.prototype.act = function() {
    const x = Game.player.getX();
    const y = Game.player.getY();
    const passableCallback = function(x, y) {
        return Game.isPassable(x, y);
    };
    const astar = new ROT.Path.AStar(x, y, passableCallback, {topology:4});

    const path = [];
    const pathCallback = function(x, y) {
        path.push([x, y]);
    };
    astar.compute(this._x, this._y, pathCallback);

    path.shift(); /* remove Pedro's position */
    console.log(path.length);
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
};