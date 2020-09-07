// Tarek Elkheir
let newMazeBtn = document.getElementById('new-maze-btn')
let showSolutionBtn = document.getElementById('show-soln-btn')
let playerPos = [0, 0]
let maze
let player

newMazeBtn.onmousedown = function() {
    maze.init()
    player.setPosition((maze.size / 2), (maze.size / 2))
    playerPos = [0, 0]
    showSolutionBtn.checked = false
}

showSolutionBtn.onclick = function() {
    if(showSolutionBtn.checked) {
        maze.showSolution()
    } else {
        maze.hideSolution()
    }
}

function setup() {
    var width = 500
    var height = 500
    var size = 50
    var mazeCanvas = createCanvas(width, height)
    mazeCanvas.parent('maze-container')
    maze = new Maze(width, height, size)
    maze.init()
    player = new Player(playerPos[0] + (size / 2), playerPos[0] + (size / 2), (size / 2))
}

function getUnvisitedNeighbors(cell) {
    return !cell.visited
}

function draw() {
    background('#fff')
    maze.drawCells()
    player.show()
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

