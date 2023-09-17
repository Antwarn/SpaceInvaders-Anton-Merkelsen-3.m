# SpaceInvaders
SpaceInvaders første projekt 3.G

Opgave pogramer spaceinvaders i p5.js og objekt orienteret programmering

<details>
<Summary> Player constructor og movement </summary>

### Player constructor og movement
 
Jeg startede med og lave sn spiller, få den tegnet på min skærm og give den en måde og begvæge sig på. 
Det gjorde jeg så ledes: 

```js
class Player {
  constructor() { // I Constructoren har jeg tilføjet alle de variabler playern skal bruge
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

Tilføjede senere noget kode til move() metoden der gjorde at man ikke kunne bevæge sig ud af canvas

Når den bevæger sig imod venstre spøger den om knappen "Left_arrow" er trykke og om breden af spilleren er støre end 0.
Hvis spilleren brede er størrer end, eller lig med 0 betyder det at man er ved kanten af canvas, og så kan man ikke 
bevæge sig videre. 

```js
    if (keyIsDown(LEFT_ARROW) && this.x >= 0 ) {
      this.x -= this.speed;
    }
```

Hvis man bevæger sig imod højre spøger den om knappen "Right_arrow" er trykker. Den spøger også om reden af spilleren
er mindre eller lig med breden af canvas minus breden af spillern. Hvis den er mindre eller lig med kan man ikke fortsætte
længer imod højre. 
Grunden til at den støger efter breden af canvas minus spiller breden, er fordi spillerens 0-punkt er helt til venstre. 
``` js
    if (keyIsDown(RIGHT_ARROW)) && this.width <= width - this.width {
      this.x += this.speed;
    }
```
</details>

PS. fungere ikke så godt som haveskovl
