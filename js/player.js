class Player {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
    }

    show = function() {
        fill(255)
        stroke(0)
        ellipse(this.x, this.y, this.size, this.size)
    }

    shiftX = function(amount) {
        this.x = this.x + amount
    }

    shiftY = function(amount) {
        this.y = this.y + amount
    }
    
    setPosition = function(x, y) {
        this.x = x
        this.y = y
    }
}