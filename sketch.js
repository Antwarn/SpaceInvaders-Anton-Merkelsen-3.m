let player;
let bullets = [];
let aliens = [];
let lastShotTime = 0;
const shotDelay = 500; // 500 millisekunder (halvt sekund)

function setup() {
  createCanvas(400, 400);
  player = new Player();

  // Opret aliens i starten af spillet
  for (let i = 0; i < 5; i++) {
    let alienX = i * 80 + 40; // Justér positionen og antallet af aliens efter behov
    aliens.push(new Alien(alienX, 50));
  }
}

function draw() {
  background(0); // Sæt baggrundsfarven til sort for at "rense" lærredet i hvert frame.

  // Vis spillerens rumskib og styr bevægelsen og affyring af skud.
  player.show();
  player.move();
  player.fire();

  // Tjek kollisioner og eliminér aliens
  for (let i = aliens.length - 1; i >= 0; i--) {
    aliens[i].show(); // Vis den aktuelle alien.
    aliens[i].update(); // Opdater positionen af den aktuelle alien.

    // Loop gennem alle skud for at tjekke kollision med aliens.
    for (let j = bullets.length - 1; j >= 0; j--) {
      bullets[j].draw(); // Vis det aktuelle skud.
      bullets[j].update(); // Opdater positionen af det aktuelle skud.
      bullets[j].hasHit(aliens); // Tjek om det aktuelle skud rammer aliens.

      if (!aliens[i].alive) {
        // Hvis alien er blevet elimineret af skuddet.
        // Fjern både den eliminerede alien og det aktuelle skud fra deres respektive lister.
        aliens.splice(i, 1);
        bullets.splice(j, 1);
      }
    }

    if (aliens[i].y > height) {
      // Hvis alien bevæger sig ud af bunden af skærmen.
      // Fjern den fra listen af aliens.
      aliens.splice(i, 1);
    }
  }
}


class Player {
  constructor() {
    this.width = 40; // Bredde af spillerens rumskib.
    this.height = 20; // Højde af spillerens rumskib.
    this.x = width / 2 - this.width; // Startpositionen i x-retning (horisontal) centreres i forhold til lærredets bredde.
    this.y = height - 50; // Startpositionen i y-retning (vertikal) er lidt over bunden af lærredet.
    this.speed = 5; // Hastigheden, hvormed spillerens rumskib bevæger sig i x-retning.
  }

  show() {
    fill(220); // Fyldfarven for spillerens rumskib (grå).
    rect(this.x, this.y, this.width, this.height); // Tegn spillerens rumskib som en rektangel på den aktuelle position.
  }

  move() {
    // Funktionen til at styre bevægelsen af spillerens rumskib.
    if (keyIsDown(LEFT_ARROW) && this.x >= 0) {
      // Hvis venstre piletast er nede, og spilleren ikke er ude af venstre kant af lærredet.
      this.x -= this.speed; // Flyt rumskibet mod venstre ved at reducere x-koordinaten.
    }
    if (keyIsDown(RIGHT_ARROW) && this.x <= width - this.width) {
      // Hvis højre piletast er nede, og spilleren ikke er ude af højre kant af lærredet.
      this.x += this.speed; // Flyt rumskibet mod højre ved at øge x-koordinaten.
    }
  }

  fire() {
    // Funktionen til at udløse affyring af skud.
    if (keyIsDown(32) && millis() - lastShotTime > shotDelay) {
      // Hvis mellemrumstasten er nede, og det er gået mere end 'shotDelay' tid siden sidste skud.
      bullets.push(new Bullet(this.x + this.width / 2, this.y)); // Opret et nyt skud og tilføj det til skudlisten.
      lastShotTime = millis(); // Opdater tiden for det seneste skud.
    }
  }
}


class Bullet {
  constructor(x, y) {
    this.x = x; // x-koordinaten for skuddets position.
    this.y = y; // y-koordinaten for skuddets position.
    this.HasNotHit = true; // En flag-egenskab, der indikerer, om skuddet har ramt noget endnu.
  }

  draw() {
    if (this.HasNotHit) {
      fill(255, 0, 0); // Skudets farve, hvis det ikke har ramt noget (rød).
      circle(this.x, this.y, 7); // Tegn skuddet som en cirkel på den aktuelle position.
    }
  }

  update() {
    this.y -= 2; // Opdater y-koordinaten for skuddet for at få det til at bevæge sig opad.
  }

  hasHit(aliens) {
    for (let i = 0; i < aliens.length; i++) {
      if (aliens[i].alive && this.HasNotHit) {
        // Tjek om skuddet kolliderer med en levende alien og ikke har ramt noget endnu.
        if (
          this.x > aliens[i].x - 3 &&
          this.x < aliens[i].x + 27 &&
          this.y > aliens[i].y - 3 &&
          this.y < aliens[i].y + 27
        ) {
          aliens[i].alive = false; // Sæt alien's status til "false" (elimineret).
          this.HasNotHit = false; // Skuddet har nu ramt noget, så sæt flagget til "false".
        }
      }
    }
  }
}

class Alien {
  constructor(x, y) {
    this.x = x; // x-koordinaten for alien's position.
    this.y = y; // y-koordinaten for alien's position.
    this.width = 30; // Bredde af alien.
    this.height = 20; // Højde af alien.
    this.alive = true; // En flag-egenskab, der indikerer, om alien er i live.
  }

  show() {
    if (this.alive) { // Tegn kun alien, hvis den er i live.
      fill(0, 255, 0); // Alien's farve, hvis den er i live (grøn).
      rect(this.x, this.y, this.width, this.height); // Tegn alien som en rektangel på den aktuelle position.
    }
  }

  update() {
    this.y += 0.5; // Opdater alien's y-koordinat for at få den til at bevæge sig nedad (faldende).
    // Farten (0.5) kan justeres efter behov for at ændre alien's bevægelseshastighed.
  }
}
