// Tarek Elkheir
let width = 400;
let height = 400;
let size = 50;
let gridCells = [] // holds all cells in the grid
let cellsVisited = [] // stack that keeps track of the cells visited in the DFS
let numCellsVisited = 0
let numRows = Math.floor(width / size)
let numCol = Math.floor(height / size)
let bgColor = '#f2f2f2'
let newMazeBtn = document.getElementById('new-maze-btn')
let playerPos = [0, 0]
let player

newMazeBtn.onclick = function() {
    init()
}

function setup() {
    createCanvas(width, height)
    init()
}

function init() {
    
    for(var i = 0; i < numRows; i++) {
        gridCells[i] = []
        for(var j  = 0; j < numCol; j++) {
            var cell = new Cell(i, j, size, [], '#0077ff')
            gridCells[i].push(cell)
        }
    }
    cellsVisited.push(gridCells[0][0])
    drawMaze(gridCells[0][0])
    player = new Player(playerPos[0] + (size / 2), playerPos[0] + (size / 2), (size / 2))
    numCellsVisited++
}

function keyPressed() {
    if(keyCode === UP_ARROW) {
        player.shiftY(-size)
    }
    if(keyCode === DOWN_ARROW) {
        player.shiftY(size)
    }
    if(keyCode === LEFT_ARROW) {
        player.shiftX(-size)
    }
    if(keyCode === RIGHT_ARROW) {
        player.shiftX(size)
    }
}

function draw() {
    background(bgColor)
    for(var i = 0; i < numRows; i++) {
        for(var j  = 0; j < numCol; j++) {
            gridCells[i][j].show()
        }
    }
    player.show()
}

function drawMaze(currentCell) {
    while(!(cellsVisited.length === 0)) {
        var currentCell = cellsVisited.pop()
        currentCell.visited = true
        var neighbors = getNeighboringCells(currentCell)
        if(neighbors.length > 0) {
            cellsVisited.push(currentCell)
            var index = Math.floor(Math.random() * neighbors.length)
            cellsVisited.push(neighbors[index])
            removeWalls(currentCell, neighbors[index])
            numCellsVisited++
        }
    }
}

function checkWalls(cellA, cellB) {
    var xDiff = Math.floor((cellA.x - cellB.x) / size)
    var yDiff = Math.floor((cellA.y - cellB.y) / size)
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

function findSolution() {
    var dfsStack = []
    var cellsVisited = []
    for(var i = 0; i < numRows; i++) {
        gridCells[i] = []
        for(var j  = 0; j < numCol; j++) {
            gridCells[i][j] = false
        }
    }

    var currentCell = gridCells[0][0]
    cellsVisited[0][0] = true
    dfsStack.push(currentCell)
    currentCell.highlight()

    currentCell = dfsStack.pop()
    while (!(dfsStack.length === 0)) {
        var x = Math.floor(currentCell.x / size)
        var y = Math.floor(currentCell.y / size)
        var neighboringIndices = getValidIndices(x, y)
        neighboringIndices.forEach(function index() {
            // var tempCell = 
        })
    }
}

function getValidIndices(x, y) {
    if((x < 0) || (x > numRows) || (y < 0) || (y > numCol)) {
        console.error('Invalid cell coordinates')
    }
    var validIndices = []
    var indices = [
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
        [x, y - 1]
    ]
    indices.forEach(function (index) {
        if(index[0] >= 0 && index[1] >= 0 && index[0] < numRows && index[1] < numCol) {
            validIndices.push([index[0], index[1]])
        }
    })
    return validIndices
}
 
function getNeighboringCells(cell) {
    var neigbors = []
    var x = Math.floor(cell.x / size)
    var y = Math.floor(cell.y / size)
    var indices = getValidIndices(x, y)
    indices.forEach(function (index) {
        var neighboringCell = gridCells[index[0]][index[1]]
            if(!neighboringCell.visited) {
                neigbors.push(neighboringCell)
            }
    })
    return neigbors
}

function Cell(x, y, size, playerColor) {
    this.x = x*size
    this.y = y*size
    this.size = size
    this.walls = [true, true, true, true]
    this.visited = false;
    this.playerColor = playerColor
    this.cellColor = bgColor
    this.highlighted = false

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
    }
}

function Player(x, y, size) {
    this.x = x
    this.y = y
    this.size = size

    this.show = function() {
        ellipse(this.x, this.y, this.size, this.size)
    }

    this.shiftX = function(amount) {
        this.x = this.x + amount
        console.log('x: ' + this.x)
    }
    
    this.shiftY = function(amount) {
        this.y = this.y + amount
        console.log('y: ' + this.y)
    }
}