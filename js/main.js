// Tarek Elkheir
let newMazeBtn = document.getElementById('new-maze-btn')
let playerPos = [0, 0]
let maze
let player
let dfsStack = []
let solFound = false
let currentCell
newMazeBtn.onclick = function() {
    maze.init()
    maze.findSolution()
    player.setPosition((maze.size / 2), (maze.size / 2))
    playerPos = [0, 0]
}

function setup() {
    var width = 500
    var height = 500
    var size = 50
    createCanvas(width, height)
    maze = new Maze(width, height, size)
    maze.init()
    player = new Player(playerPos[0] + (size / 2), playerPos[0] + (size / 2), (size / 2))
    resetMaze()
    console.log(maze.mazeCells)
    currentCell = maze.mazeCells[0][0]
    dfsStack.push(currentCell)
}

function resetMaze() {
    for(var i = 0; i < maze.numRows; i++) {
        for(var j  = 0; j < maze.numCol; j++) {
            maze.mazeCells[i][j].visited = false
        }
    }
}

function getUnvisitedNeighbors(cell) {
    return !cell.visited
}

function draw() {
    background('#fff')
    maze.drawCells()
    player.show()
    currentCell.visited = true
    currentCell.highlighted = true
    var nextCell = dfsStack.pop()
    if(nextCell && !solFound) {
        var neighbors = nextCell.neighbors
        for(let cell of neighbors) {
            if(!cell.visited) {
                cell.visited = true
                cell.highlighted = true
                dfsStack.push(cell)
                if(cell.x === (maze.numCol - 1) && cell.y === (maze.numRows - 1)) {
                    solFound = true
                }
            }
        }
    }
}

function isMoveValid(x, y) {
    if(maze.isIndexValid(x, y)) {
        var neighbors = maze.mazeCells[playerPos[0]][playerPos[1]].neighbors
        if(neighbors.includes(maze.mazeCells[x][y])) {
            return true
        }        
    }
    return false
}

function keyPressed() {
    var x = playerPos[0]
    var y = playerPos[1]
    if(keyCode === UP_ARROW) {
        y = y - 1
        if(isMoveValid(x, y)) {
            playerPos[0] = x
            playerPos[1] = y
            player.shiftY(-maze.size)
        }
    }
    if(keyCode === DOWN_ARROW) {
        y = y + 1
        if(isMoveValid(x, y)) {
            playerPos[0] = x
            playerPos[1] = y
            player.shiftY(maze.size)
        }
    }
    if(keyCode === LEFT_ARROW) {
        x = x  - 1
        if(isMoveValid(x, y)) {
            playerPos[0] = x
            playerPos[1] = y
            player.shiftX(-maze.size)
        }
    }
    if(keyCode === RIGHT_ARROW) {
        x = x + 1
        if(isMoveValid(x, y)) {
            playerPos[0] = x
            playerPos[1] = y
            player.shiftX(maze.size)
        }
    }
}

