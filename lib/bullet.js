export default class Bullet {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 5;
    this.speed = 25;
    this.velocityX = 0;
    this.velocityY = 0;
  }


  draw() {
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
