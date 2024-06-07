class Grid {

    constructor(rows, cols, cell_size) {
        this.cells = []
        this.cell_size = cell_size
        for (let i=0; i < rows; i++) {
            let row = []
            for (let j=0; j < cols; j++) {
                const cell = new Cell(j, i, this.cell_size)
                row.push(cell)
            }
            this.cells.push(row)
        }
    }

    setNeighbors () {
        for (let i=0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j=0; j < row.length; j++) {
                const cell = row[j]
                const nextRow = this.cells[i+1]
                if(!nextRow) continue
                cell.addNeighbor(Cell.NEIGHBOR.BOTTOM, nextRow[j])
                cell.addNeighbor(Cell.NEIGHBOR.BOTTOM_LEFT, nextRow[j-1])
                cell.addNeighbor(Cell.NEIGHBOR.BOTTOM_RIGHT, nextRow[j+1])
            }
        }
    }

    getCellByPosition (x, y) {
        const row = this.cells[Math.floor(y/this.cell_size)]
        if (!row) return
        return row[Math.floor(x/this.cell_size)]
    }

    draw () {
        for (let i=0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j=0; j < row.length; j++) {
                const cell = row[j]
                cell.update()
                cell.draw()
                cell.updateState()
            }
        }
    }

}