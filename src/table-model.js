var TableModel = (function() {
    return function TableModel(dimension) {
        this.dimension = dimension;
        this.tableModel = {};

        this.setTableModel = function(model) {
            this.tableModel = model;
        }
    }
})();