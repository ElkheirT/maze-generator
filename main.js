// Tarek Elkheir
let width = 500;
let height = 500;
let size = 50;
let gridCells = [] // holds all cells in the grid
let cellsVisited = [] // stack that keeps track of the cells visited in the DFS
let numCellsVisited = 0

function setup() {
    createCanvas(width, height)
    background('#f0f0f0')
    var numRows = Math.floor(width / size)
    var numCol = Math.floor(height / size)
    for(var i = 0; i < numRows; i++) {
        gridCells[i] = []
        for(var j  = 0; j < numCol; j++) {
            var cell = new Cell(i, j, size, [])
            gridCells[i].push(cell)
        }
    }
    cellsVisited.push(gridCells[0][0])
    numCellsVisited++
}

function draw() {
    var numRows = Math.floor(width / size)
    var numCol = Math.floor(height / size)
    for(var i = 0; i < numRows; i++) {
        for(var j  = 0; j < numCol; j++) {
            gridCells[i][j].show()
        }
    }
    if(!(cellsVisited.length === 0)) {
        var currentCell = cellsVisited.pop()
        currentCell.visited = true
        var neighbors = getNeighbors(currentCell)
        if(neighbors.length > 0) {
            cellsVisited.push(currentCell)
            var index = Math.floor(Math.random() * neighbors.length)
            cellsVisited.push(neighbors[index])
            neighbors[index].highlight()
            removeWalls(currentCell, neighbors[index])
            numCellsVisited++
        }
    }
}

function removeWalls(cellA, cellB) {
    if(Math.floor((cellA.x - cellB.x) / size) === 1) {
        cellA.walls[2] = false
        cellB.walls[3] = false
    }
    if(Math.floor((cellA.x - cellB.x) / size) === -1) {
        cellA.walls[3] = false
        cellB.walls[2] = false
    }
    if(Math.floor((cellA.y - cellB.y) / size) === 1) {
        cellA.walls[0] = false
        cellB.walls[1] = false
    }
    if(Math.floor((cellA.y - cellB.y) / size) === -1) {
        cellA.walls[1] = false
        cellB.walls[0] = false
    }
}

function getNeighbors(cell) {
    var neigbors = []
    var x = Math.floor(cell.x / size)
    var y = Math.floor(cell.y / size)
    var maxRow = Math.floor((height - 1) / size)
    var maxCol = Math.floor((width - 1) / size)
    var indices = [
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
        [x, y - 1]
    ]
    indices.forEach(function (index) {
        if(index[0] >= 0 && index[1] >= 0 && index[0] <= maxRow && index[1] <= maxCol) {
            var neighboringCell = gridCells[index[0]][index[1]]
            if(!neighboringCell.visited) {
                neigbors.push(neighboringCell)
            }
        }
    })
    return neigbors
}

function Cell(x, y, size, walls) {
    this.x = x*size
    this.y = y*size
    this.size = size
    this.walls = [true, true, true, true]
    this.visited = false;

    this.highlight = function() {
        noStroke()
        fill('#5c84ff');
        rect(this.x, this.y, this.size, this.size)
    }

    this.show = function() {
        stroke(0)
        strokeWeight(5)
        strokeCap(SQUARE);
        if(this.walls[0]) {
            line(this.x, this.y, (this.x + this.size), this.y) // top
        }
        if(this.walls[1]) {
            line(this.x, (this.y + this.size), (this.x + this.size), (this.y + this.size)) // bottom
        }
        if(this.walls[2]) {
            line(this.x, this.y, this.x, this.y + this.size) // left
        }
        if(this.walls[3]) {
            line(this.x + this.size, this.y, this.x + this.size, this.y + this.size) // right
        }
        if(this.visited) {
            noStroke()
            fill('#f0f0f0');
            rect(this.x, this.y, this.size, this.size)
        }
    }
}