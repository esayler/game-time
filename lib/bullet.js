// import Physics from './physics'
import Collider from './collision'


export default class Bullet {
  constructor(options) {
    this.playerID = options.playerID;
    this.ctx = options.ctx;
    this.position = options.position;
    this.size = { width: 15, height: 15 }
    this.speed = 25;
    this.velocity = { x: 0, y: 0 };
    this.gravity = 1.2;
    this.friction = .75;
    this.loader = options.loader;
    this.img = undefined;

    // this.img = new Image();
    Object.assign(this, options);
  }

  draw() {
    if (this.playerID === 1) {
      this.img = this.loader.getImage('yarnBall');
    }
    if (this.playerID === 2) {
      this.img = this.loader.getImage('tennisBall');
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
