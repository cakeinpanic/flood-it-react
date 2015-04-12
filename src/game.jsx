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
            colorId: -1
        }
    },

    render: function() {
        var self = this;
        return (
            <div className={this.className}>
                <Table dimension='10' currentColor={this.state.colorId} scheme={this.scheme}/>
                <Panel setColor = {self.setColor}  scheme={this.scheme}/>
            </div>
            )
    }

});
