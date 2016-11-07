// import Physics from './physics'
import Collider from './collision'


export default class Bullet {
  constructor(ctx, playerPosition, playerID) {
    this.playerID = playerID;
    this.ctx = ctx;
    this.position = { x: playerPosition.x, y: playerPosition.y };
    this.size = { width: 15, height: 15 }
    this.speed = 25;
    this.velocity = { x: 0, y: 0 };
    this.gravity = 1.2;
    this.friction = .75;
    this.img = new Image();
  }

  draw() {
    if (this.playerID === 1) {
      this.img.src = "./images/cat-dog-tileset/yarnBall.png";
    }
    if (this.playerID === 2) {
      this.img.src = "./images/cat-dog-tileset/tennisBall.png";
    }

    this.ctx.drawImage(
      this.img,
      0,
      0,
      50,
      50,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    // this.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }

  update() {
    this.velocity.y += this.gravity - .5;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if(this.position.x < 0 - this.size.width){
       this.position.x = 1250; //TODO: pass in map size instead of hard coding width
     }

     if(this.position.x > 1250){
       this.position.x = 0 - this.size.width;
     }

  }
}
