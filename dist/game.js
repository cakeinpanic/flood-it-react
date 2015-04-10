var Cell = React.createClass({
    displayName: 'Cell',
    className: 'cell',
    color: 'red',
    model: '',
    style: {},

    getInitialState: function(){
        return {
            style: {
                background: this.props.color || 'red'
            }
        }
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


var Table = React.createClass({
    displayName: 'table',
    className: 'table',
    dimension: 10,
    rows : [],
    componentDidMount: function() {
        this.model = new TableModel(this.props.dimension);
        this.model.setTableModel(this.rows);
        console.log(this.model)
    },
    render: function() {
        var self = this,
            cellsNum = this.props.dimension,
            scheme = new ColorScheme();

            for (var j=0; j < cellsNum; j++) {
                var cells = [];
                for (var i = 0; i < cellsNum; i++) {
                    cells.push(React.createElement(Cell, {color: scheme.getRandomColor()}));
                }
                this.rows.push(cells)
            }


        return (

            React.createElement("div", {className: self.className}, 
            
                self.rows.map(function(row) {
                    return React.createElement("div", {className: "row"}, 
                    
                        row.map(function(cell){
                            return cell;
                        })
                    
                    )
                })
                
            )

            )
    }
});
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

        this.getRandomColor = function() {
            var currentScheme = scheme[this.currentSchemeId];

            return currentScheme[getRandomInt(0,currentScheme.length-1)];
        }

    }
})();

var TableModel = (function() {
    return function TableModel(dimension) {
        this.dimension = dimension;
        this.tableModel = {};

        this.setTableModel = function(model) {
            this.tableModel = model;
            console.log(model)
        }
    }
})();