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
    setColor: function(e) {
      var colorId = e.target.getAttribute('data-id');

      this.props.setColor(colorId)
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

                    return <div className="btn" data-id={index} style={style} onClick={self.setColor}></div>
                })
                }</div>
            )
    }

});
