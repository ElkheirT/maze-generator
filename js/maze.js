class Maze {
    constructor(width, height, size) {
        this.width = width
        this.height = height
        this.size = size
        this.numRows = Math.floor(this.width / this.size)
        this.numCol = Math.floor(this.height / this.size)
        this.mazeCells = []
        this.cellsVisited = []
        this.mazeSolution = new Map()
    }

    init() {
        clear()
        for(var i = 0; i < this.numRows; i++) {
            this.mazeCells[i] = []
            for(var j  = 0; j < this.numCol; j++) {
                var cell = new Cell(i, j, this.size, [], '#0077ff')
                this.mazeCells[i].push(cell)
            }
        }
        this.drawMaze(this.mazeCells[0][0])
        this.findSolution()
    }

    drawCells() {
        for(var i = 0; i < this.numRows; i++) {
            for(var j  = 0; j < this.numCol; j++) {
                this.mazeCells[i][j].show()
            }
        }
    }

    drawMaze(currentCell) {
        this.cellsVisited.push(this.mazeCells[0][0])
        while(!(this.cellsVisited.length === 0)) {
            var currentCell = this.cellsVisited.pop()
            currentCell.visited = true
            var neighbors = this.getNeighboringCells(currentCell)
            if(neighbors.length > 0) {
                this.cellsVisited.push(currentCell)
                var index = Math.floor(Math.random() * neighbors.length)
                this.cellsVisited.push(neighbors[index])
                this.removeWalls(currentCell, neighbors[index])
                currentCell.addNeighbor(neighbors[index])
                neighbors[index].addNeighbor(currentCell)
            }
        }
    }

    removeWalls(cellA, cellB) {
        var xDiff = cellA.x - cellB.x
        var yDiff = cellA.y - cellB.y
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

    resetCells() {
        for(var i = 0; i < maze.numRows; i++) {
            for(var j  = 0; j < maze.numCol; j++) {
                maze.mazeCells[i][j].visited = false
            }
        }
    }

    findSolution() {
        this.resetCells()
        var dfsStack = []
        var solFound = false
        
        var currentCell = this.mazeCells[0][0]
        currentCell.visited = true
        dfsStack.push(currentCell)
        
        while(dfsStack.length > 0) {
            var nextCell = dfsStack.pop()

            nextCell.visited = true
            
            var neighbors = nextCell.neighbors.filter(this.getUnvisitedNeighbors)
            for(let cell of neighbors) {
                dfsStack.push(cell)
                this.mazeSolution.set(cell, nextCell)
                if(cell.x === (this.numCol - 1) && cell.y === (this.numRows - 1)) {
                    cell.visited = true
                    this.mazeSolution.set(cell, nextCell)
                    solFound = true
                    break;
                }
            }
        }
    }

    showSolution() {
        var target = this.mazeCells[this.numRows - 1][this.numCol - 1]
        target.highlighted = true
        while(target != undefined) {
            target = this.mazeSolution.get(target)
            target.highlighted = true
        }
    }

    getUnvisitedNeighbors(cell) {
        return !cell.visited
    }
    
    getNeighboringIndices(x, y) {
        let isValid = this.isIndexValid
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

    isIndexValid = (x, y) => {
        if((x < 0) || (x >= this.numRows) || (y < 0) || (y >= this.numCol)) {
            return false
        }
        return true
    }

    getNeighboringCells(cell) {
        let mazeCells = this.mazeCells
        var neigbors = []
        var x = cell.x
        var y = cell.y
        var indices = this.getNeighboringIndices(x, y)
        indices.forEach(function (index) {
            var neighboringCell = mazeCells[index[0]][index[1]]
            if(!neighboringCell.visited) {
                neigbors.push(neighboringCell)
            }
        })
        return neigbors
    }
}