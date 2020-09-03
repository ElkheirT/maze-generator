let x = 10;
let y = 10;
let xspeed = 5;
let yspeed = 2;

function setup() {
  createCanvas(400, 400);
  let button = createButton("reset sketch");
  button.mousePressed(resetSketch);
}

function draw() {
  background(220);

  ellipse(x, y, 20, 20);
  x += xspeed;
  y += yspeed;

  if (x >= width || x <= 0) {
   xspeed = -xspeed
  }
  
  if (y >= height || y <= 0) {
   yspeed = -yspeed
  }
}

function drawBall() {
    
}

function resetSketch() {
  x=10;
  y=10;
}