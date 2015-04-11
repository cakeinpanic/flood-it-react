
var Table = React.createClass({
    displayName: 'table',
    className: 'table',
    dimension: 10,
    rows : [],
    scheme : new ColorScheme(),
    componentDidMount: function() {
        this.model = new TableModel(this.props.dimension);
        this.model.setTableModel(this.rows);
    },
    render: function() {
        var self = this,
            tilesNum = this.props.dimension;

            for (var j=0; j < tilesNum; j++) {
                var tiles = [];
                for (var i = 0; i < tilesNum; i++) {
                    tiles.push(<Tile color={self.scheme.getRandomColor()} />);
                }
                this.rows.push(tiles)
            }


        return (

            <div className={self.className}>
            {
                self.rows.map(function(row) {
                    return <div className='row'>
                    {
                        row.map(function(tile){
                            return tile;
                        })
                    }
                    </div>
                })
                }
            </div>

            )
    }
});