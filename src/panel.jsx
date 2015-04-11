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
    onClick: function(e) {
      console.log(e.target.getAttribute('data-id'))
    },

    render: function() {
        var currentScheme = this.state.scheme,
            self = this;

        return (
            <div className={this.className} onClick={this.onClick}>
            {
                currentScheme.map(function (color,index) {
                    var style = {
                        background: color
                    };

                    return <div className="btn" data-id={index} style={style} onClick={self.onClick}></div>
                })
                }</div>
            )
    }

});
