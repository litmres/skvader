const Game = {
    display: null,
    map: {},

    init: function() {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer());
        this._generateMap();
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
        }
    }
}
