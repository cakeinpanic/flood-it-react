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

    render: function() {
        var currentScheme = this.state.scheme;
        console.log(currentScheme)
        return (
            <div className={this.className} onClick={this.onClick}>
            {
                currentScheme.map(function (color) {
                    var style = {
                        background: color
                    };

                    return <div className="btn" style={style}></div>
                })
                }</div>
            )
    }

});
