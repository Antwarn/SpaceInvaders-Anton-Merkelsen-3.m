let player;

function setup() {
  createCanvas(400, 400);
  player = new Player(); // 
}


function draw() { // Kalder de metoder der skal bruges for at vise og bevæge mit rumskib
  background(0);
  player.show();
  player.move();
}

class Player {
  constructor() { // I constructoren angiver jeg alle de parametre i nogele variabler som kan refereres til senere i koden
    this.width = 40;
    this.height = 20;
    this.x = width / 2 - this.width;
    this.y = height - 50;
    this.speed = 5;
  }

  show() {
    fill(220)
    rect(this.x, this.y, this.width, this.height)
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x >= 0 ) {
      // Tjekker om spillern bevæger sig mod venstre og ikke ud af skærmen
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x <= width - this.width) {
      this.x += this.speed;
    }
  }
}


