var Game = React.createClass({
    displayName: 'Game',
    className: 'game',
    model: '',
    scheme : new ColorScheme(),


    render: function() {

        return (
            <div className={this.className}>
                <Table dimension='10' />
                <Panel />
            </div>
            )

    }

});
