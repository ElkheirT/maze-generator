class Player {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
    }

    show() {
        fill(255)
        stroke(0)
        ellipse(this.x, this.y, this.size, this.size)
    }

    shiftX(amount) {
        this.x = this.x + amount
    }

    shiftY(amount) {
        this.y = this.y + amount
    }
    
    setPosition(x, y) {
        this.x = x
        this.y = y
    }
}