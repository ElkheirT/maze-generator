// Tarek Elkheir
let newMazeBtn = document.getElementById('new-maze-btn')
let playerPos = [0, 0]
let maze
let player

newMazeBtn.onclick = function() {
    maze.init()
    player.setPosition((maze.size / 2), (maze.size / 2))
    playerPos = [0, 0]
}

function setup() {
    var width = 400
    var height = 400
    var size = 100
    createCanvas(width, height)
    maze = new Maze(width, height, size)
    maze.init()
    maze.drawMaze()
    player = new Player(playerPos[0] + (size / 2), playerPos[0] + (size / 2), (size / 2))
}

function draw() {
    background('#f2f2f2')
    maze.drawCells()
    player.show()
}

function isMoveValid(x, y) {
    if(maze.isValidIndex(x, y)) {
        if(!(maze.checkWalls(maze.gridCells[x][y], maze.gridCells[playerPos[0]][playerPos[1]]))) {
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

