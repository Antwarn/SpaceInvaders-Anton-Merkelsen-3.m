let alien0;
let alien1;
function preload() {
  alien0 = loadImage('alien0.png');
  alien1 = loadImage('alien1.png')
}

function setup() {
  createCanvas(600, 600);
  background(0);
  alien = new alien(200,300);
}

function draw() {
  background(0);
  alien.draw();
  Invader.display();
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

class ship{
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

