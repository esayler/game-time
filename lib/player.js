import Bullet from './bullet'
import Collider from './collision'
import Keyboard from './keyboard'
import { platformCollisionCheck, playerCollisionCheck } from './collision'


// import Physics from './physics'

export default class Player {
  constructor(options) {
    this.jumpcount = 0;
    this.lives = 10;
    this.bullets = [];
    this.gameSize = { x: 1250, y: 650 };
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
    this.dead = false;
    this.deathCooldown = 0;
    this.reset = false;
    this.heroType = options.heroType;
    this.heroImage = new Image();
    this.imageIndex = 0;
    this.imageWidth = 100;
    this.gravity = Math.exp(.1);
    this.friction = .62;
    this.platforms = options.platforms;
    this.fillStyle = options.fillStyle;

    Object.assign(this, options);
  }

  jump() {
    if (this.jumpcount < 2) {
      this.velocity.y = -this.speed * 2.5;
      // this.velocity.y = -this.speed * 4;
      // this.jumping = true;
      this.jumping = true;
      this.grounded = false;
      this.jumpcount++;
      return true;
    }
    return false;

  }


  draw() {

    if (this.dead && this.facing === "west") {
      this.imageIndex = 0;
      this.imageWidth = 133;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}DeadLeft.png`
    } else if (this.dead && this.facing === "east") {
      this.imageIndex = 0;
      this.imageWidth = 133;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}DeadRight.png`
    } else if (this.stunned && this.facing === "west") {
      this.imageIndex = 0;
      this.imageWidth = 100;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}StunnedLeft.png`
    } else if (this.stunned && this.facing === "east") {
      this.imageIndex = 0;
      this.imageWidth = 100;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}StunnedRight.png`
    } else if (this.jumping && this.velocity.x < 0 && this.facing === "west") {
      this.imageIndex = 0;
      this.imageWidth = 100;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}JumpLeft.png`;
    } else if (this.jumping && this.velocity.y < 0 && this.facing === "east") {
      this.imageIndex = 0;
      this.imageWidth = 100;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}JumpRight.png`;
    } else if (this.jumping && this.velocity.y > 0 && this.facing === "west") {
      this.imageIndex = 0;
      this.imageWidth = 100;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}FallLeft.png`;
    } else if (this.jumping && this.velocity.y > 0 && this.facing === "east") {
      this.imageIndex = 0;
      this.imageWidth = 100;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}FallRight.png`;
    } else if (this.velocity.y > 0 && this.facing === "east") {
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}RunRight.png`;
      this.imageWidth = 100;
      this.imageIndex === 7 ? this.imageIndex = 0 : this.imageIndex++;
    } else if (this.velocity.x < 0 && this.facing === "west") {
      this.imageIndex === 7 ? this.imageIndex = 0 : this.imageIndex++;
      this.imageWidth = 100;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}RunLeft.png`;
    } else if (Math.abs(this.velocity.x) < 1 && this.facing === "east") {
      this.imageIndex = 0;
      this.imageWidth = 100;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}IdleRight.png`;
    } else if (Math.abs(this.velocity.x) < 1 && this.facing === "west") {
      this.imageIndex = 0;
      this.imageWidth = 100;
      this.heroImage.src = `./images/cat-dog-tileset/${this.heroType}IdleLeft.png`;
    }

    this.context.drawImage(
      this.heroImage,
      this.imageIndex * this.imageWidth,
      0,
      this.imageWidth,
      150,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );

    // this.context.fillStyle = this.fillStyle;
    // this.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
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
      var bullet = new Bullet(this.context, { x: this.position.x, y: this.position.y + 40 }, this.id);
      // var projectile = new Projectile(this., this.y+40);
      // projectile.player = this;

      this.facing === "east" ?
        bullet.velocity.x = +bullet.speed : bullet.velocity.x = -bullet.speed;

      bullet.velocity.y = -bullet.speed / 4;
      this.bullets.push(bullet);
      this.shootCooldown = Date.now() + 1750;
    }
  }

  conditionCheck() {
    var now = Date.now();

    if (this.deathCooldown > now) {
      this.size.width = 58;
    } else if (this.dead){
      this.reset = true;
      this.dead = false;
      this.size.width = 45;
    }

    if (this.stunCooldown < now) {
      this.stunned = false;
    }
  }

  playerReset() {
    if (this.reset && this.id === 1) {
      this.lives--;
      this.position.x = 200;
      this.position.y = 515;
      this.facing = "east";
      this.stunned = false;
      this.reset = false;
      return true;
    }

    if (this.reset && this.id === 2) {
      this.lives--;
      this.position.x = 1000;
      this.position.y = 515;
      this.facing = "west";
      this.stunned = false;
      this.reset = false;
      return true;
    }

    return false;
  }

  mapBoundryCheck() {
    if(this.position.x >= this.gameSize.x - 10){
      this.position.x = -35;
    } else if(this.position.x <= -35) {
      this.position.x = this.gameSize.x - 10;
    }

    if(this.position.y > this.gameSize.y + 750){
      this.dead = true;
    }
  }

  // update() returns false on player reset, true otherwise
  update() {

    for (let bullet of this.bullets) {
      bullet.update();
    }

    //remove bullet from screen when it falls to the height of the base platform
    this.bullets = this.bullets.filter(bullet => bullet.position.y <= this.gameSize.y - 70);



    if (this.kb.isDown(this.kb.KEYS[this.id].LEFT) && !this.stunned && !this.dead) {
      this.left();
    }

    if (this.kb.isDown(this.kb.KEYS[this.id].RIGHT) && !this.stunned && !this.dead) {
      this.right();
    }

    if (this.kb.isDown(this.kb.KEYS[this.id].UP) && !this.jumpHeld && !this.stunned && !this.dead) {
      this.jump();
      this.jumpHeld = true;
    }

    if (this.kb.isDown(this.kb.KEYS[this.id].DOWN) && !this.stunned && !this.dead) {
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

    this.velocity.x *= this.friction;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.mapBoundryCheck();
    this.conditionCheck();

    platformCollisionCheck(this, this.platforms); //TODO: move to game object

    if(this.playerReset()){
      return false;
    } else {
      return true;
    }
  }
}
