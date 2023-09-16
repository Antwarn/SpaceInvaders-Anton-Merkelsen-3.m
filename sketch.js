let player;
let bullets = [];

function setup() {
  createCanvas(400, 400);
  player = new Player();
}

function draw() {
  background(0);
  player.show();
  player.move();
  player.fire();

  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].draw();
    bullets[i].update();

    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }
}

class Player {
  constructor() {
    this.width = 40;
    this.height = 20;
    this.x = width / 2 - this.width;
    this.y = height - 50;
    this.speed = 5;
  }

  show() {
    fill(220);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x >= 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x <= width - this.width) {
      this.x += this.speed;
    }
  }

  fire() {
    if (keyIsDown(38)) { // Check if the spacebar is pressed
      bullets.push(new Bullet(this.x + this.width / 2, this.y));
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.HasNotHit = true;
  }

  draw() {
    if (this.HasNotHit) {
      fill(255, 0, 0);
      circle(this.x, this.y, 7);
    }
  }

  update() {
    this.y -= 2;
  }
}
