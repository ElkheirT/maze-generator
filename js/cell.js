class Cell {
    constructor(x, y, size, playerColor) {
        this.x = x*size
        this.y = y*size
        this.size = size
        this.walls = [true, true, true, true]
        this.visited = false;
        this.playerColor = playerColor
        this.cellColor = '#f2f2f2'
        this.highlighted = false
    }

    show() {
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
        if(this.highlighted) {
            noStroke()
            fill('#5c84ff')
            rect(this.x, this.y, this.size, this.size)
        }
    }
}