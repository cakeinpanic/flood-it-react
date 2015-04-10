var Cell = React.createClass({
    displayName: 'Cell',
    color: 'red',
    cellStyle: {},

    changeColor: function(newColor) {
        this.color = newColor || 'red';
        this.cellStyle.background = this.color;
    },
    onClick: function() {
        this.changeColor('blue');
    },

    render: function() {
        this.changeColor();
        return (
           React.createElement("div", {className: "cell", style: this.cellStyle, onClick: this.onClick})
            )
    }
});

var Table = React.createClass({
    displayName: 'table',
    tilesNum: 10,

    render: function() {
        var self = this,
            width = Math.sqrt(this.tilesNum);

        return (

            React.createElement("div", null, 
                 React.createElement(Cell, {color: "black"}), 
                 React.createElement(Cell, {color: "green"})
            )

            )
    }
});