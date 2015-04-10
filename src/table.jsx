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
           <div className="cell" style={this.cellStyle} onClick={this.onClick}></div>
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

            <div>
                 <Cell color='black' />
                 <Cell color='green' />
            </div>

            )
    }
});