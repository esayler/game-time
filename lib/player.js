function Player(heroType, x, facing){
  this.x = x;
  this.y = 515;
  this.width = 45;
  this.height = 65;
  this.speed = 6;
  this.velocityX = 0;
  this.velocityY = 0;
  this.jumping = false;
  this.jumpcount = 0;
  this.facing = facing;
  this.grounded = true;
  this.stunned = false;
  this.stunCooldown = 0;
  this.dead = false;
  this.deathCooldown = 0;
  this.shootCooldown = 0;
  this.heroImage = new Image();
  this.heroType = heroType;
  this.imageIndex = 0;
  this.imageWidth = 100;
  this.reset = false;
  this.lives = 20;
}

Player.prototype.draw = function(){


  if(this.dead && this.facing === "west"){
    this.imageIndex = 0 ;
    this.imageWidth = 133;
    this.heroImage.src = `./images/${this.heroType}DeadLeft.png`
  }
  else if(this.dead && this.facing === "east") {
    this.imageIndex = 0;
    this.imageWidth = 133;
    this.heroImage.src = `./images/${this.heroType}DeadRight.png`
  }
  else if(this.stunned && this.facing === "west"){
    this.imageIndex = 0;
    this.imageWidth = 100;
    this.heroImage.src = `./images/${this.heroType}StunnedLeft.png`
  }
  else if(this.stunned && this.facing === "east"){
    this.imageIndex = 0;
    this.imageWidth = 100;
    this.heroImage.src = `./images/${this.heroType}StunnedRight.png`
  }
  else if (this.jumping && this.velocityY < 0 && this.facing === "west") {
    this.imageIndex = 0;
    this.imageWidth = 100;
    this.heroImage.src = `./images/${this.heroType}JumpLeft.png`;
  }
  else if (this.jumping && this.velocityY < 0 && this.facing === "east") {
    this.imageIndex = 0;
    this.imageWidth = 100;
    this.heroImage.src = `./images/${this.heroType}JumpRight.png`;
  }
  else if (this.jumping && this.velocityY > 0 && this.facing === "west") {
    this.imageIndex = 0;
    this.imageWidth = 100;
    this.heroImage.src = `./images/${this.heroType}FallLeft.png`;
  }
  else if (this.jumping && this.velocityY > 0 && this.facing === "east") {
    this.imageIndex = 0;
    this.imageWidth = 100;
    this.heroImage.src = `./images/${this.heroType}FallRight.png`;
  }
  else if(this.velocityX > 0 && this.facing === "east"){
    this.heroImage.src = `./images/${this.heroType}RunRight.png`;
    this.imageWidth = 100;
    this.imageIndex === 7 ? this.imageIndex = 0 : this.imageIndex++;
  }
  else if(this.velocityX < 0 && this.facing === "west"){
    this.imageIndex === 7 ? this.imageIndex = 0 : this.imageIndex++;
    this.imageWidth = 100;
    this.heroImage.src = `./images/${this.heroType}RunLeft.png`;
  }
  else if(Math.abs(this.velocityX) < 1 && this.facing === "east") {
    this.imageIndex = 0;
    this.imageWidth = 100;
    this.heroImage.src = `./images/${this.heroType}IdleRight.png`;
  }
  else if(Math.abs(this.velocityX) < 1 && this.facing === "west") {
    this.imageIndex = 0;
    this.imageWidth = 100;
    this.heroImage.src = `./images/${this.heroType}IdleLeft.png`;
  }

  context.drawImage(
    this.heroImage, this.imageIndex*this.imageWidth, 0, this.imageWidth, 150, this.x, this.y, this.width, this.height
  );

}


Player.prototype.left = function(){
  this.velocityX -= this.speed;
  this.facing = "west";
}

Player.prototype.right = function(){
  this.velocityX += this.speed;
  this.facing = "east";
}

Player.prototype.jumpCheck = function(){
  if(this.jumpcount < 2){
    jump(this);
  }
}


Player.prototype.shoot = function(player){
  if(this.shootCooldown < Date.now()){
    var projectile = new Projectile(this.x, this.y+40);
    projectile.player = player;

    this.facing === "east" ?
    projectile.velocityX =+ projectile.speed : projectile.velocityX =- projectile.speed;

    projectile.velocityY =- projectile.speed/4;
    projectiles.push(projectile);
    this.shootCooldown = Date.now() + 1750;
  }
}
