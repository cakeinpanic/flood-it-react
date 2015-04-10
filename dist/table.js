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
            width = Math.sqrt(this.tilesNum);

        return (

            React.createElement("div", {className: self.className}, 
                 React.createElement(Cell, {color: "black"}), 
                 React.createElement(Cell, {color: "green"})
            )

            )
    }
});