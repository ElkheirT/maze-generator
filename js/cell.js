class Cell {
    constructor(x, y, size) {
        this.neighbors = []
        this.x = x
        this.y = y
        this.size = size
        this.walls = [true, true, true, true]
        this.visited = false;
        this.highlighted = false
    }

    show() {
        stroke(0)
        strokeCap(SQUARE);
        var x = this.x * this.size
        var y = this.y * this.size
        if(this.walls[0]) {
            line(x, y, (x + this.size), y) // top
        }
        if(this.walls[1]) {
            line(x, (y + this.size), (x + this.size), (y + this.size)) // bottom
        }
        if(this.walls[2]) {
            line(x, y, x, y + this.size) // left
        }
        if(this.walls[3]) {
            line(x + this.size, y, x + this.size, y + this.size) // right
        }
        if(this.highlighted == true) {
            fill(66, 135, 245)
            noStroke()
            rect(x, y, this.size, this.size)
        }
    }

    addNeighbor(newCell) {
        this.neighbors.push(newCell)
    }
}