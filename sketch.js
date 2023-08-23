let alien0;
let alien1;
let ship1;
function preload() {
  alien0 = loadImage('alien0.png');
  alien1 = loadImage('alien1.png');
  ship1 = loadImage('ship.png');
}

function setup() {
  createCanvas(600, 600);
  background(0);
  alien = new alien(200,300);
}

function draw() {
  background(0);
  alien.draw();
  ship.draw();
}

class ship{
  constructor(x,y) {
    this.x = y;
    this.y = y;
  }

  draw() {
    image(ship1, this.x, 200, 40, 40)
  }
}

class alien{
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    image(alien0, this.x, this.y, 40, 40)
  }
}


