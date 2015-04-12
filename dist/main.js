var ColorScheme = (function() {
    var scheme        = [["#57385C", "#A75265", "#EC7263", "#FEBE7E","#FFEDBC"],
        ["#F72F41", "#399DF6", "#99C946", "#FBDB52", "#635358"],
        ["#FF8787", "#FFBD8C", "#FFE2CC", "#938787", "#72D4FF"],
        ["#435A66", "#88A6AF", "#F5F2EB", "#D9CDB8", "#413541"],
    ];
    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return function ColorScheme() {
        this.currentSchemeId = 0;
        this.currentScheme = getCurrentScheme();

        this.getCurrentScheme = getCurrentScheme;
        this.setCurrentScheme = setCurrentScheme;
        this.getRandomColorId = getRandomColorId;
        this.getColorById = getColorById;


        function setCurrentScheme(schemeId){
            this.currentSchemeId = schemeId;
            this.currentScheme = this.getCurrentScheme();
            return this.currentScheme;
        }
        function getCurrentScheme(){
            return scheme[this.currentSchemeId];
        }
        function getRandomColorId() {
            var currentScheme = this.getCurrentScheme();
            return getRandomInt(0,currentScheme.length-1);
        };
        function getColorById(colorId) {
            var currentScheme = this.getCurrentScheme();
            return currentScheme[colorId];
        }

    }
})();

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
                doneTilesCount = 0,
                totalTiles = this.dimension * this.dimension;

            this.steps++;
            this.currentColorId = newColorId;
            processRelatives(tableMdl, startTile, this.currentColorId);

            this.tableModel.forEach(function(row) {
                row.forEach(function(tile) {
                    tile.done = tile.willBeDone || tile.done;
                    tile.willBeDone = false;
                    if (tile.done) {
                        tile.colorId = newColorId;
                        doneTilesCount++;
                    }
                });

            });
            if (doneTilesCount === totalTiles) {
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
            return result.filter(function(item){
                return !!item
            });
        }
        composeModel(this.dimension, this);
    }
})();
var TileModel = (function() {
    return function TileModel(initialColorId, x, y) {
        this.colorId = initialColorId;
        this.done = false;
        this.willBeDone = false;
        this.x = x;
        this.y = y;
    }
})();
var Game = React.createClass({
    displayName: 'Game',
    className: 'game',
    model: '',
    scheme : new ColorScheme(),
    setColor: function(colorId){
           this.setState({
               colorId: colorId
           });
    },
    getInitialState: function() {
        return {
            colorId: -1,
            currentScheme: this.scheme.getCurrentScheme()
        }
    },
    changeScheme: function() {
        this.setState( {
            currentScheme: this.scheme.setCurrentScheme((this.scheme.currentSchemeId + 1)%4)
        });
    },
    render: function() {
        var self = this;
        return (
            React.createElement("div", {className: this.className}, 
                React.createElement(Table, {dimension: "10", currentColor: this.state.colorId, scheme: this.state.currentScheme}), 
                React.createElement(Panel, {setColor: self.setColor, scheme: this.state.currentScheme}), 
                React.createElement("button", {onClick: self.changeScheme}, "changeScheme")
            )
            )
    }

});

var Panel = React.createClass({
    displayName: 'Panel',
    className: 'panel',
    model: '',

    getInitialState: function(){
       return {}
    },
    setColor: function(e) {
      var colorId = e.target.getAttribute('data-id');

      this.props.setColor(colorId)
    },

    render: function() {
        var currentScheme = this.props.scheme,
            self = this;


        return (
            React.createElement("div", {className: this.className, onClick: this.onClick}, 
            
                currentScheme.map(function (color,index) {
                    var style = {
                        background: color
                    };

                    return React.createElement("div", {className: "btn", "data-id": index, style: style, onClick: self.setColor})
                })
                )
            )
    }

});


var Table = React.createClass({
    displayName: 'table',
    className: 'table table-10',
    model : {},
    getInitialState: function(){
        this.model = new TableModel(this.props.dimension);
        return {};
    },
    componentDidMount: function(param){
        this.currentColor = this.model.currentColorId;
    },
    componentWillReceiveProps: function(nextProps) {
        this.currentColor = nextProps.currentColor > -1 ? nextProps.currentColor : this.currentColor;

       this.model.setNewColor(parseInt(this.currentColor));
    },
    render: function() {
        var self = this;
        console.log(this.currentColor);
        return (

            React.createElement("div", {className: self.className}, 
            
                self.model.tableModel.map(function(row) {
                    return React.createElement("div", {className: "row"}, 
                    
                        row.map(function(tile){
                            return React.createElement(Tile, {model: tile, scheme: self.props.scheme})
                        })
                    
                    )
                })
                
            )

            )
    }
});
var Tile = React.createClass({
    displayName: 'Tile',
    className: 'tile',
    color: 'red',
    model: {},
    style: {},
    setColorById: function(colorId){
       return {
            style: {
                background: this.colorScheme[colorId]
            }
        }
    },
    componentWillReceiveProps: function(nextProps) {
        this.colorScheme = nextProps.scheme;

        this.setState(this.setColorById(nextProps.model.colorId));
    },
    getInitialState: function() {
        this.model = this.props.model;
        this.colorScheme = this.props.scheme;
        return  this.setColorById(this.model.colorId)

    },
    changeColor: function(newColor) {
        this.color = newColor || 'red';
        this.style.background = this.color;
        if (this.isMounted()) {
            this.setState({
                style: this.style
            });
        }

    },
    onClick: function() {
        this.changeColor('blue');
    },


    render: function() {
        return (
            React.createElement("div", {className: this.className, style: this.state.style, onClick: this.onClick})
            )
    }

});
