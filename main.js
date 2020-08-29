// Tarek Elkheir
let width = 400;
let height = 400;
let size = 100;
let gridCells = [] // holds all cells in the grid
let cellsVisited = [] // stack that keeps track of the cells visited in the DFS
let numCellsVisited = 0
let numRows = Math.floor(width / size)
let numCol = Math.floor(height / size)
let bgColor = '#f2f2f2'
let newMazeBtn = document.getElementById('new-maze-btn')
let playerPos = [0, 0]
let sol = []

newMazeBtn.onclick = function() {
    init()
}

function setup() {
    createCanvas(width, height)
    init()
}

function init() {
    background(bgColor)
    for(var i = 0; i < numRows; i++) {
        gridCells[i] = []
        for(var j  = 0; j < numCol; j++) {
            var cell = new Cell(i, j, size, [], '#0077ff')
            gridCells[i].push(cell)
        }
    }
    cellsVisited.push(gridCells[0][0])
    drawMaze(gridCells[0][0])
    numCellsVisited++
}

function keyPressed() {
    switch(keyCode) {
        case LEFT_ARROW:
            
        case RIGHT_ARROW:

        case UP_ARROW:
            
        case DOWN_ARROW:
            
    }
}

function draw() {
    for(var i = 0; i < numRows; i++) {
        for(var j  = 0; j < numCol; j++) {
            gridCells[i][j].show()
        }
    }
}

function drawMaze(currentCell) {
    while(!(cellsVisited.length === 0)) {
        var currentCell = cellsVisited.pop()
        currentCell.visited = true
        var neighbors = getNeighbors(currentCell)
        if(neighbors.length > 0) {
            cellsVisited.push(currentCell)
            var index = Math.floor(Math.random() * neighbors.length)
            cellsVisited.push(neighbors[index])
            removeWalls(currentCell, neighbors[index])
            numCellsVisited++
        }
    }
}

function removeWalls(cellA, cellB) {
    var xDiff = Math.floor((cellA.x - cellB.x) / size)
    var yDiff = Math.floor((cellA.y - cellB.y) / size)
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

function getNeighbors(cell) {
    var neighbors = []
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
                neighbors.push(neighboringCell)
            }
        }
    })
    return neighbors
}

function Cell(x, y, size, playerColor) {
    this.x = x*size
    this.y = y*size
    this.size = size
    this.walls = [true, true, true, true]
    this.visited = false;
    this.playerColor = playerColor
    this.cellColor = bgColor

    this.highlight = function() {
        noStroke()
        fill('#0066ff');
        rect(this.x, this.y, this.size, this.size)
    }

    this.show = function() {
        stroke(0)
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
            fill(bgColor);
            rect(this.x, this.y, this.size, this.size)
        }
    }
}