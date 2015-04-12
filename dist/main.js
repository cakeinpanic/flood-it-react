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
        this.getCurrentScheme = function(){
            return scheme[this.currentSchemeId];
        };
        this.getRandomColor = function() {
            var currentScheme = this.getCurrentScheme();

            return currentScheme[getRandomInt(0,currentScheme.length-1)];
        };
        this.getRandomColorId = function() {
            var currentScheme = this.getCurrentScheme();
            return getRandomInt(0,currentScheme.length-1);
        };
        this.getColorById = function(colorId) {
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
        this.setNewColor = function(newColorId){

            var tableMdl = this.tableModel,
                startTile = this.tableModel[0][0];


            processRelatives(tableMdl, startTile, newColorId);

            this.tableModel.forEach(function(row) {
                row.forEach(function(tile) {
                        if (tile.willBeDone) {
                            tile.willBeDone = false;
                            tile.done = true;
                        }
                    if (tile.done) {
                        tile.colorId = newColorId;
                    }
                    });

            });

        };


        function processRelatives(tableMdl, startTile, newColorId){

            var relatives = getRelatives(tableMdl, startTile);
            startTile.willBeDone = true;
            relatives.forEach(function (tile) {
                if (!tile.willBeDone && tile.colorId === newColorId) {
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
        console.log(colorId);
           this.setState({
               colorId: colorId
           });
    },
    getInitialState: function() {
        return {
            colorId: -1
        }
    },

    render: function() {
        var self = this;
        return (
            React.createElement("div", {className: this.className}, 
                React.createElement(Table, {dimension: "10", currentColor: this.state.colorId}), 
                React.createElement(Panel, {setColor: self.setColor})
            )
            )

    }

});

var Panel = React.createClass({
    displayName: 'Panel',
    className: 'panel',
    model: '',
    scheme : new ColorScheme(),

    getInitialState: function(){
        return {
            scheme: this.scheme.getCurrentScheme()
        }
    },
    setColor: function(e) {
      var colorId = e.target.getAttribute('data-id');

      this.props.setColor(colorId)
    },

    render: function() {
        var currentScheme = this.state.scheme,
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
    className: 'table',
    model : {},
    scheme : new ColorScheme(),
    currentColor: 0,
    getInitialState: function(){
        this.model = new TableModel(this.props.dimension);
        return {};
    },
    componentWillReceiveProps: function(nextProps) {
       this.model.setNewColor(parseInt(nextProps.currentColor));
    },
    render: function() {
        var self = this;
        this.currentColor = this.props.currentColor;
        return (

            React.createElement("div", {className: self.className}, 
            
                self.model.tableModel.map(function(row) {
                    return React.createElement("div", {className: "row"}, 
                    
                        row.map(function(tile){
                            return React.createElement(Tile, {model: tile})
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
    colorScheme: new ColorScheme(),
    style: {},
    setColorById: function(colorId){
       return {
            style: {
                background: this.colorScheme.getColorById(colorId)
            }
        }
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState(this.setColorById(nextProps.model.colorId))

    },
    getInitialState: function() {
        this.model = this.props.model;

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
