import Bullet from './bullet'
import Collider from './collision'
import Keyboard from './keyboard'
import { platformCollisionCheck, playerCollisionCheck } from './collision'
// import Physics from './physics'

export default class Player {
  constructor(options) {
    this.bullets = [];
    this.gameSize = { x: 1260, y: 630 };
    this.kb = options.kb;
    this.id = 1;
    this.position = { x: 0, y: 0 };
    this.size = { width: 45, height: 65 };
    this.speed = 6;
    this.velocity = { x: 0, y: 0 }
    this.jumping = false;
    this.facing = options.facing;
    this.grounded = true;
    this.stunned = false;
    this.stunCooldown = 0;
    this.shootCooldown = 0;
    this.heroImage = new Image();
    this.heroType = options.heroType;
    this.imageIndex = 0;
    this.gravity = Math.exp(.1);
    this.friction = .62;
    this.platforms = options.platforms;
    this.fillStyle = options.fillStyle;
    this.reset = false;
    this.lives = 20;

    Object.assign(this, options);
  }


  stunCheck(player) {
    if (player.stunCooldown < Date.now()) {
      player.stunned = false;
    }
  }


  jump() {
    if (!this.jumping) {
      this.velocity.y = -this.speed * 3.5;
      // this.velocity.y = -this.speed * 4;
      // this.jumping = true;
      this.jumping = true;
      this.grounded = false;
      return true;
    }
    return false;

  }


  draw() {
    this.context.fillStyle = this.fillStyle;
    this.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    for (let bullet of this.bullets) { bullet.draw(); }
  }

  left() {
    this.velocity.x -= this.speed;
    this.facing = "west";
  }

  right() {
    this.velocity.x += this.speed;
    this.facing = "east";
  }

  shoot() {
    if (this.shootCooldown < Date.now()) {
      var bullet = new Bullet(this.context, { x: this.position.x, y: this.position.y + 40});
      // var projectile = new Projectile(this., this.y+40);
      // projectile.player = this;

      this.facing === "east" ?
        bullet.velocity.x = +bullet.speed : bullet.velocity.x = -bullet.speed;

      bullet.velocity.y = -bullet.speed / 4;
      this.bullets.push(bullet);
      this.shootCooldown = Date.now() + 5000;
    }
  }

  stunCheck() {
    if (this.stunCooldown < Date.now()) {
      this.stunned = false;
    }
  }

  resetCheck() {
    if (this.reset && this.id === 1) {
      this.position.x = 300;
      this.position.y = 515;
      this.facing = "east";
      this.reset = false;
    }

    if (this.reset && this.id === 2) {
      this.position.x = 900;
      this.position.y = 515;
      this.facing = "west";
      this.reset = false;
    }
  }

  update() {

    for (let bullet of this.bullets) {
      bullet.update();
    }

    //remove bullet from screen when it falls to the height of the base platform
    this.bullets = this.bullets.filter(bullet => bullet.position.y <= this.gameSize.y - 60);

    // this.makeMove();


    // console.log('player.jumping: ', player.jumping);

    if (this.kb.isDown(this.kb.KEYS[this.id].LEFT) && !this.stunned) {
      this.left();
    }

    if (this.kb.isDown(this.kb.KEYS[this.id].RIGHT) && !this.stunned) {
      this.right();
    }

    if (this.kb.isDown(this.kb.KEYS[this.id].UP) && !this.jumpHeld && !this.stunned) {
      this.jump();
      this.jumpHeld = true;
    }

    if (this.kb.isDown(this.kb.KEYS[this.id].DOWN) && !this.stunned) {
      this.shoot();
    }

    if (this.kb.isUp(this.kb.KEYS[this.id].UP)) {
      this.jumpHeld = false;
    }

    if (this.jumping &&
      !this.kb.keyState[this.kb.KEYS[1].LEFT] && !this.kb.keyState[this.kb.KEYS[1].RIGHT] &&
      !this.kb.keyState[this.kb.KEYS[2].LEFT] && !this.kb.keyState[this.kb.KEYS[2].RIGHT]) {
      this.velocity.x /= this.friction;
    }

    if (Math.abs(this.velocity.x) < 1) {
      this.velocity.x = 0;
    }

    if (Math.abs(this.velocity.x) > 0) {
      this.grounded = false;
    }

    if (!this.grounded) {
      if (this.velocity.y < 25)
        this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
    /////////////////////////////////

    // this.velocity.y += this.gravity;
    this.velocity.x *= this.friction;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.x > this.gameSize.x - this.size.width) {
      this.position.x = this.gameSize.x - this.size.width;
    } else if (this.position.x <= 0) {
      this.position.x = 0;
    }

    if (this.position.y > this.gameSize.y - this.size.height) {
      this.position.y = this.gameSize.y - this.size.height;
      this.jumping = false;
      this.jumpHeld = false;
    }

    this.stunCheck(this);
    this.resetCheck(this);
    platformCollisionCheck(this, this.platforms);
  }
}
