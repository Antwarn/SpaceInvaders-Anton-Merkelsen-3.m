let player;
let bullets = [];
let aliens = [];
let lastShotTime = 0;
const shotDelay = 500; // 500 milliseconds (half a second)

function setup() {
  createCanvas(400, 400);
  player = new Player();

  for (let i = 0; i < 5; i++) {
    let alienX = i * 80 + 40;
    aliens.push(new Alien(alienX, 50));
  }
}

function draw() {
  background(0);
  player.show();
  player.move();
  player.fire();

  // Check collisions and eliminate aliens
  for (let i = aliens.length - 1; i >= 0; i--) {
    aliens[i].show();
    aliens[i].update();

    for (let j = bullets.length - 1; j >= 0; j--) {
      bullets[j].draw();
      bullets[j].update();
      bullets[j].hasHit(aliens);

      if (!aliens[i].alive) {
        // Remove the alien and the bullet if the alien is eliminated
        aliens.splice(i, 1);
        bullets.splice(j, 1);
      }
    }

    if (aliens[i].y > height) {
      aliens.splice(i, 1);
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
    if (keyIsDown(32) && millis() - lastShotTime > shotDelay) {
      bullets.push(new Bullet(this.x + this.width / 2, this.y));
      lastShotTime = millis();
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

  hasHit(aliens) {
    for (let i = 0; i < aliens.length; i++) {
      if (aliens[i].alive && this.HasNotHit) {
        if (
          this.x > aliens[i].x - 3 &&
          this.x < aliens[i].x + 27 &&
          this.y > aliens[i].y - 3 &&
          this.y < aliens[i].y + 27
        ) {
          aliens[i].alive = false;
          this.HasNotHit = false;
        }
      }
    }
  }
}

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 20;
    this.alive = true;
  }

  show() {
    if (this.alive) {
      fill(0, 255, 0);
      rect(this.x, this.y, this.width, this.height);
    }
  }

  update() {
    this.y += 0.5;
  }
}
