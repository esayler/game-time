import Player from './player'
import TileMap from './tilemap'

export default class Game {
  constructor(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.context = this.canvas.getContext('2d');
    this.atlas = new TileMap();

    this.previousElapsed = 0;
    this.gameSize = {
      x: this.canvas.width,
      y: this.canvas.height
    };

    this.actors = [];

    this.player1 = new Player(this, 1);
    this.player2 = new Player(this, 2);
    this.actors.push(this.player1);
    this.actors.push(this.player2);

    this.gravity = 1.2;
    this.friction = .75;
    this.count = 0;
    this.vx = 0;
    this.vy = 0;

    this.bullets = [];
    this.keys = {};
  }

  update() {
    var actors = this.actors;

    for (let actor of this.actors) {
      actor.update();
    }

    for (const bullet of this.bullets) {
      bullet.velocityY += this.gravity - .5;
      bullet.x += bullet.velocityX;
      bullet.y += bullet.velocityY;
      if (bullet.y < canvas.height) {
        bullet.draw();
      } else {
        this.bullets.shift();
      }
    }

  }

  drawLayer(layer) {
    console.log('drawLayer');
    for (var c = 0; c < this.atlas.map.cols; c++) {
      for (var r = 0; r < this.atlas.map.rows; r++) {
        var tile = this.atlas.getTile(layer, c, r);
        if (tile !== 0) { // 0 => empty tile
          console.log('draw');
          this.context.drawImage(
            this.atlas.tileAtlas, // image
            (((tile - 1) % 12) * (this.atlas.map.tsize + 2)), // source x
            (Math.floor((tile - 1) / 12) * (this.atlas.map.tsize + 2)), // source y
            this.atlas.map.tsize, // source width
            this.atlas.map.tsize, // source height
            c * this.atlas.map.tsize, // target x
            r * this.atlas.map.tsize, // target y
            this.atlas.map.tsize, // target width
            this.atlas.map.tsize // target height
          );
        }
      }
    }
  }


  render() {
    // draw map background layer

    this.drawLayer(0);
    for (let actor of this.actors) {
      actor.draw();
    }

    for (let bullet of this.bullets) {
      bullet.draw();
    }

    // draw game sprites
    // this.context.drawImage(this.hero.image, this.hero.x, this.hero.y);
    // draw map top layer
    // this.drawLayer(1);
  }
}
