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
            <div className={this.className}>
                <Table dimension='10' currentColor={this.state.colorId} scheme={this.state.currentScheme}/>
                <Panel setColor = {self.setColor} scheme={this.state.currentScheme}/>
                <button onClick = {self.changeScheme}>changeScheme</button>
            </div>
            )
    }

});
