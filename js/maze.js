class Maze {
    constructor(width, height, size) {
        this.width = width
        this.height = height
        this.size = size
        this.numRows = Math.floor(this.width / this.size)
        this.numCol = Math.floor(this.height / this.size)
        this.gridCells = []
        this.cellsVisited = []
    }

    init() {
        for(var i = 0; i < this.numRows; i++) {
            this.gridCells[i] = []
            for(var j  = 0; j < this.numCol; j++) {
                var cell = new Cell(i, j, this.size, [], '#0077ff')
                this.gridCells[i].push(cell)
            }
        }
        this.cellsVisited.push(this.gridCells[0][0])
        this.drawMaze(this.gridCells[0][0])
    }

    drawCells() {
        for(var i = 0; i < this.numRows; i++) {
            for(var j  = 0; j < this.numCol; j++) {
                this.gridCells[i][j].show()
            }
        }
    }

    drawMaze(currentCell) {
        while(!(this.cellsVisited.length === 0)) {
            var currentCell = this.cellsVisited.pop()
            currentCell.visited = true
            var neighbors = this.getNeighboringCells(currentCell)
            if(neighbors.length > 0) {
                this.cellsVisited.push(currentCell)
                var index = Math.floor(Math.random() * neighbors.length)
                this.cellsVisited.push(neighbors[index])
                this.removeWalls(currentCell, neighbors[index])
            }
        }
    }

    checkWalls(cellA, cellB) {
        var xDiff = Math.floor((cellA.x - cellB.x) / this.size)
        var yDiff = Math.floor((cellA.y - cellB.y) / this.size)
        if(xDiff === 1) {
            return(cellA.walls[2] && cellB.walls[3])
        }
        if(xDiff === -1) {
            return(cellA.walls[3] && cellB.walls[2])
        }
        if(yDiff === 1) {
            return(cellA.walls[0] && cellB.walls[1])
        }
        if(yDiff === -1) {
            return(cellA.walls[1] && cellB.walls[0])
        }
    }
    
    removeWalls(cellA, cellB) {
        var xDiff = Math.floor((cellA.x - cellB.x) / this.size)
        var yDiff = Math.floor((cellA.y - cellB.y) / this.size)
        if(xDiff === 1) {
            cellA.walls[2] = false
            cellB.walls[3] = false
        }
        if(xDiff === -1) {
            cellA.walls[3] = false
            cellB.walls[2] = false
        }
        if(yDiff === 1) {
            cellA.walls[0] = false
            cellB.walls[1] = false
        }
        if(yDiff === -1) {
            cellA.walls[1] = false
            cellB.walls[0] = false
        }
    }
    
    findSolution() {
        var dfsStack = []
        var cellsVisited = []
        for(var i = 0; i < this.numRows; i++) {
            this.gridCells[i] = []
            for(var j  = 0; j < this.numCol; j++) {
                this.gridCells[i][j] = false
            }
        }
    
        var currentCell = this.gridCells[0][0]
        this.cellsVisited[0][0] = true
        dfsStack.push(currentCell)
        currentCell.highlight()
    
        currentCell = dfsStack.pop()
        while (!(dfsStack.length === 0)) {
            var x = Math.floor(currentCell.x / this.size)
            var y = Math.floor(currentCell.y / this.size)
            var neighboringIndices = getNeighboringIndices(x, y)
            neighboringIndices.forEach(function index() {
                
            })
        }
    }

    getNeighboringIndices(x, y) {
        let isValid = this.isValidIndex
        if(!(isValid(x, y))) {
            console.error('Invalid cell coordinates')
        }
        var indices = [
            [x - 1, y],
            [x + 1, y],
            [x, y + 1],
            [x, y - 1]
        ]
        var validIndices = []
        indices.forEach(function (index) {
            if(isValid(index[0], index[1])) {
                validIndices.push([index[0], index[1]])
            }
        })
        return validIndices
    }

    isValidIndex = (x, y) => {
        if((x < 0) || (x >= this.numRows) || (y < 0) || (y >= this.numCol)) {
            return false
        }
        return true
    }
     
    getNeighboringCells(cell) {
        let gridCells = this.gridCells
        var neigbors = []
        var x = Math.floor(cell.x / this.size)
        var y = Math.floor(cell.y / this.size)
        var indices = this.getNeighboringIndices(x, y)
        indices.forEach(function (index) {
            var neighboringCell = gridCells[index[0]][index[1]]
                if(!neighboringCell.visited) {
                    neigbors.push(neighboringCell)
                }
        })
        return neigbors
    }
}