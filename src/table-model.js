var TableModel = (function() {
    return function TableModel(dimension) {
        this.dimension = dimension;
        this.colorScheme = new ColorScheme();
        this.tableModel = [];
        this.steps = 0;
        this.maxSteps = 20;
        this.setNewColor = function(newColorId){

            var tableMdl = this.tableModel,
                startTile = this.tableModel[0][0],
                doneTilesCount = 0;

            this.steps++;
            this.currentColorId = newColorId;
            processRelatives(tableMdl, startTile, newColorId);

            this.tableModel.forEach(function(row) {
                row.forEach(function(tile) {
                    if (tile.willBeDone) {
                        tile.willBeDone = false;
                        tile.done = true;
                    }
                    if (tile.done) {
                        tile.colorId = newColorId;
                        doneTilesCount++;
                    }
                });

            });
            if (doneTilesCount === this.dimension * this.dimension) {
                this.gameWon();
            }
            if (this.steps === this.maxSteps) {
                this.gameLose();
            }


        };
        this.gameWon = function() {
            console.log('Game won in ' + this.steps + ' steps');
        };
        this.gameLose = function() {
            console.log('You exceeded the number of steps');
        };

        function processRelatives(tableMdl, startTile, newColorId){

            var relatives = getRelatives(tableMdl, startTile);
            startTile.willBeDone = true;
            relatives.forEach(function (tile) {
                if (!tile.willBeDone && (tile.done || tile.colorId === newColorId)) {
                    processRelatives(tableMdl, tile, newColorId);
                }
            })
        }

        function composeModel(tilesNum, self) {
            for (var j=0; j < tilesNum; j++) {
                var tiles = [];
                for (var i = 0; i < tilesNum; i++) {
                    tiles.push(new TileModel(self.colorScheme.getRandomColorId(), j, i));
                }
                self.tableModel.push(tiles);
            }
            self.tableModel[0][0].done = true;
            self.setNewColor( self.tableModel[0][0].colorId)
        }
        function getFromModel(model, x, y) {
            if (model[x]) {
                return model[x][y] ? model[x][y] : null;
            }
            return null;
        }
        function getRelatives(tableModel, tile) {
            var result = [],
                x = tile.x,
                y = tile.y;
            result.push(getFromModel(tableModel, x + 1, y));
            result.push(getFromModel(tableModel, x - 1, y));
            result.push(getFromModel(tableModel, x, y - 1));
            result.push(getFromModel(tableModel, x, y + 1));
            return result.filter(getRidOfNulls);
        }
        function getRidOfNulls(item) {
            return !!item;
        }
        composeModel(this.dimension, this);
    }
})();