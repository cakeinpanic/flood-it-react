var Tile = React.createClass({
    displayName: 'Tile',
    className: 'tile',
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
            <div className={this.className} style={this.state.style} onClick={this.onClick}></div>
            )
    }

});
