var Cell = React.createClass({
    displayName: 'Cell',
    className: 'cell',
    color: 'red',
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
    tilesNum: 10,

    render: function() {
        var self = this,
            rows = new Array(this.tilesNum);


            for (var j=0; j < this.tilesNum; j++) {
                var cells = [];
                for (var i = 0; i < this.tilesNum; i++) {
                    cells.push(React.createElement(Cell, {color: "black"}));
                }
                rows.push(cells)
            }


        return (

            React.createElement("div", {className: self.className}, 
            
                rows.map(function(row) {
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