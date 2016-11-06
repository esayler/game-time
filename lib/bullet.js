// import Physics from './physics'
import Collider from './collision'


export default class Bullet {
  constructor(ctx, playerPosition) {

    this.ctx = ctx;
    this.position = { x: playerPosition.x, y: playerPosition.y };
    this.size = { width: 10, height: 5 }
    this.speed = 25;
    this.velocity = { x: 0 , y: 0};
    this.gravity = 1.2;
    this.friction = .75;
  }

  draw() {
      this.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }

  update() {
    this.velocity.y += this.gravity - .5;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
