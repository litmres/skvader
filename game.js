var Game = {
    display: null,
    map: {},

    init: function() {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer());
        this._generateMap();
    },

    _generateMap: function() {
        var digger = new ROT.Map.Digger();

        var digCallback = function(x, y, value) {
            var key = x+","+y;

            if (value) {
                // Not floor tile i.e. a wall
                this.map[key] = "%";
            } else {
                this.map[key] = ".";
            }
        };
        digger.create(digCallback.bind(this));
        this._drawWholeMap();
        console.log(this.map);
    },

    _drawWholeMap: function() {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
        }
    }
}
