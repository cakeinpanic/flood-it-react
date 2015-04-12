
var Table = React.createClass({
    displayName: 'table',
    className: 'table',
    model : {},
    getInitialState: function(){
        this.model = new TableModel(this.props.dimension);
        return {};
    },
    componentDidMount: function(param){
        this.currentColor = this.model.currentColorId;
    },
    componentWillReceiveProps: function(nextProps) {
        this.currentColor = nextProps.currentColor > -1 ? nextProps.currentColor : this.currentColor;

       this.model.setNewColor(parseInt(this.currentColor));
    },
    render: function() {
        var self = this;
        console.log(this.currentColor);
        return (

            <div className={self.className}>
            {
                self.model.tableModel.map(function(row) {
                    return <div className='row'>
                    {
                        row.map(function(tile){
                            return <Tile model={tile} scheme={self.props.scheme}/>
                        })
                    }
                    </div>
                })
                }
            </div>

            )
    }
});