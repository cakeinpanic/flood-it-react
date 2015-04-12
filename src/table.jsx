
var Table = React.createClass({
    displayName: 'table',
    className: 'table',
    model : {},
    scheme : new ColorScheme(),
    currentColor: 0,
    getInitialState: function(){
        this.model = new TableModel(this.props.dimension);
        return {};
    },
    componentWillReceiveProps: function(nextProps) {
       this.model.setNewColor(parseInt(nextProps.currentColor));
    },
    render: function() {
        var self = this;
        this.currentColor = this.props.currentColor;
        return (

            <div className={self.className}>
            {
                self.model.tableModel.map(function(row) {
                    return <div className='row'>
                    {
                        row.map(function(tile){
                            return <Tile model={tile}/>
                        })
                    }
                    </div>
                })
                }
            </div>

            )
    }
});