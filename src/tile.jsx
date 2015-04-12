var Tile = React.createClass({
    displayName: 'Tile',
    className: 'tile',
    color: 'red',
    model: {},
    style: {},
    setColorById: function(colorId){
       return {
            style: {
                background: this.colorScheme.getColorById(colorId)
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
            <div className={this.className} style={this.state.style} onClick={this.onClick}></div>
            )
    }

});
