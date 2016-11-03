import Keyboard from './keyboard'
import Bullet from './bullet'
import CollisionManager from './collisionmanager'

export default class Player {
  constructor(game, playerID) {
    this.game = game;
    this.id = playerID;
    this.keyboard = new Keyboard(this.game, playerID);
    this.x = 600;
    this.y = canvas.height - 20;
    this.width = 20;
    this.height = 20;
    this.speed = 6;
    this.velocityX = 0;
    this.velocityY = 0;
    this.jumping = false;
    this.facing = "east";
    this.jumpHeld = false;
    this.cooldown = true;
  }

  jump() {
    if (!this.jumping) {
      this.velocityY = -this.speed * 4;
      this.jumping = true;
    }
  }


  draw() {
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
  }

  left() {
    this.velocityX -= this.speed;
    this.facing = "west";
  }

  right() {
    this.velocityX += this.speed;
    this.facing = "east";
  }

  shoot() {
    if (this.cooldown) {
      var bullet = new Bullet(this.game, this.x, this.y);

      this.facing === "east" ?
        bullet.velocityX = +bullet.speed : bullet.velocityX = -bullet.speed;

      bullet.velocityY = -bullet.speed / 4;
      this.game.bullets.push(bullet);
      // this.cooldown = false;
    }
  }

  update() {
    this.velocityY += this.game.gravity;
    this.velocityX *= this.game.friction;
    this.x += this.velocityX;
    this.y += this.velocityY;

    // if (this.jumping) {
    //   this.velocityX /= this.game.friction;
    // }

    // console.log('player.jumping: ', player.jumping);
    // if (player.jumping && !player.keyState[65] && !player.keyState[68] && !player.keyState[37] && !player.keyState[39]) {
    //   player.velocityX /= this.game.friction;
    // }

    if (this.x >= this.game.gameSize.x - this.width) {
      this.x = this.game.gameSize.x - this.width;
    } else if (this.x <= 0) {
      this.x = 0;
    }

    if (this.y >= this.game.gameSize.y - this.height) {
      this.y = this.game.gameSize.y - this.height;
      this.jumping = false;
      this.jumpHeld = false;
    }

    if (this.keyboard.isDown(this.keyboard.KEYS[this.id].LEFT)) {
      this.left();
    }

    if (this.keyboard.isDown(this.keyboard.KEYS[this.id].RIGHT)) {
      this.right();
    }

    if (this.keyboard.isDown(this.keyboard.KEYS[this.id].UP) && !this.jumpHeld) {
      this.jump();
      // console.log('JUMP!');
      // console.log('player.jumping: ', this.jumping);
      this.jumpHeld = true;
    }

    if (this.keyboard.isDown(this.keyboard.KEYS[this.id].DOWN)) {
      this.shoot();
    }

    if (this.keyboard.isUp(this.keyboard.KEYS[this.id].UP)) {
      this.jumpHeld = false;
    }
  }
}
