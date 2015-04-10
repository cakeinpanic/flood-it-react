
var Table = React.createClass({
    displayName: 'table',
    className: 'table',
    dimension: 10,
    rows : [],
    componentDidMount: function() {
        this.model = new TableModel(this.props.dimension);
        this.model.setTableModel(this.rows);
        console.log(this.model)
    },
    render: function() {
        var self = this,
            cellsNum = this.props.dimension,
            scheme = new ColorScheme();

            for (var j=0; j < cellsNum; j++) {
                var cells = [];
                for (var i = 0; i < cellsNum; i++) {
                    cells.push(<Cell color={scheme.getRandomColor()} />);
                }
                this.rows.push(cells)
            }


        return (

            <div className={self.className}>
            {
                self.rows.map(function(row) {
                    return <div className='row'>
                    {
                        row.map(function(cell){
                            return cell;
                        })
                    }
                    </div>
                })
                }
            </div>

            )
    }
});