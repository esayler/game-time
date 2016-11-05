function Player(heroType, x, facing){
  this.x = x;
  this.y = 515;
  this.width = 45;
  this.height = 65;
  this.speed = 6;
  this.velocityX = 0;
  this.velocityY = 0;
  this.jumping = false;
  this.facing = facing;
  this.grounded = true;
  this.stunned = false;
  this.stunCooldown = 0;
  this.shootCooldown = 0;
  this.heroImage = new Image();
  this.heroType = heroType;
  this.imageIndex = 0;
}

Player.prototype.draw = function(count){

  if(this.stunned && this.facing === "west"){
    this.imageIndex = 0;
    this.heroImage.src = `./images/${this.heroType}StunnedLeft.png`
  }
  else if(this.stunned && this.facing === "east"){
    this.imageIndex = 0;
    this.heroImage.src = `./images/${this.heroType}StunnedRight.png`
  }
  else if (this.jumping && this.velocityY < 0 && this.facing === "west") {
    // this.imageIndex === 7 ? this.imageIndex = 0 : this.imageIndex++;
    this.imageIndex = 0;
    this.heroImage.src = `./images/${this.heroType}JumpLeft.png`;
  }
  else if (this.jumping && this.velocityY < 0 && this.facing === "east") {
    // this.imageIndex === 7 ? this.imageIndex = 0 : this.imageIndex++;
    this.imageIndex = 0;
    this.heroImage.src = `./images/${this.heroType}JumpRight.png`;
  }
  else if (this.jumping && this.velocityY > 0 && this.facing === "west") {
    this.imageIndex = 0;
    this.heroImage.src = `./images/${this.heroType}FallLeft.png`;
  }
  else if (this.jumping && this.velocityY > 0 && this.facing === "east") {
    this.imageIndex = 0;
    this.heroImage.src = `./images/${this.heroType}FallRight.png`;
  }
  else if(this.velocityX > 0 && this.facing === "east"){
    this.heroImage.src = `./images/${this.heroType}RunRight.png`;
    this.imageIndex === 7 ? this.imageIndex = 0 : this.imageIndex++;
  }
  else if(this.velocityX < 0 && this.facing === "west"){
    this.imageIndex === 7 ? this.imageIndex = 0 : this.imageIndex++;
    this.heroImage.src = `./images/${this.heroType}RunLeft.png`;
  }
  else if(Math.abs(this.velocityX) < 1 && this.facing === "east") {
    this.imageIndex = 0;
    this.heroImage.src = `./images/${this.heroType}IdleRight.png`;
  }
  else if(Math.abs(this.velocityX) < 1 && this.facing === "west") {
    this.imageIndex = 0;
    this.heroImage.src = `./images/${this.heroType}IdleLeft.png`;
  }




  context.drawImage(
    this.heroImage, this.imageIndex*100, 0, 100, 150, this.x, this.y, this.width, this.height
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
  if(!this.jumping){
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
    this.shootCooldown = Date.now() + 5000;
  }
}
