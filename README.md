# SpaceInvaders
SpaceInvaders første projekt 3.G

Opgave pogramer spaceinvaders i p5.js og objekt orienteret programmering

Jeg startede med og lave sn spiller, få den tegnet på min skærm og give den en måde og begvæge sig på. 
Det gjorde jeg så ledes: 

```js
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
    if (keyIsDown(LEFT_ARROW) ) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
  }
}
```
