function Player(){
  this.x = 600;
  this.y = canvas.height-20;
  this.width = 20;
  this.height = 20;
  this.speed = 8;
  this.velocityX = 0;
  this.velocityY = 0;
  this.jumping = false;
  this.facing = "east";
  this.grounded = true;
}

Player.prototype.draw = function(){
  context.fillRect(this.x, this.y, this.width, this.height);
}

Player.prototype.left = function(){
  this.velocityX -= this.speed;
  this.facing = "west";
}

Player.prototype.right = function(){
  this.velocityX += this.speed;
  this.facing = "east";
}

Player.prototype.jumpP1 = function(){
  if(!this.jumping){
    jump(this);
  }
}

Player.prototype.jumpP2 = function(){
  if(!this.jumping){
    jump(this);
  }
}

Player.prototype.shoot = function(){
  if(cooldown){
    var bullet = new Bullet(this.x, this.y);

    this.facing === "east" ?
    bullet.velocityX =+ bullet.speed : bullet.velocityX =- bullet.speed;

    bullet.velocityY =- bullet.speed/4;
    bullets.push(bullet);
    cooldown = false;
  }
}
