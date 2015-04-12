var TileModel = (function() {
    return function TileModel(initialColorId, x, y) {
        this.colorId = initialColorId;
        this.done = false;
        this.willBeDone = false;
        this.x = x;
        this.y = y;
    }
})();