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
  this.stunCD = 0;
  this.heroImage = new Image();
  this.heroType = heroType;

}

Player.prototype.draw = function(count){
  var index = 0;


  if (this.jumping && this.velocityY < 0 && this.facing === "west") {
    index === 8 ? index = 0 : index++;
    this.heroImage.src = `./images/${this.heroType}JumpLeft.png`;
  }
  else if (this.jumping && this.velocityY < 0 && this.facing === "east") {
    index === 8 ? index = 0 : index++;
    this.heroImage.src = `./images/${this.heroType}JumpRight.png`;
  }
  else if (this.jumping && this.velocityY > 0 && this.facing === "west") {
    index === 8 ? index = 0 : index++;
    this.heroImage.src = `./images/${this.heroType}FallLeft.png`;
  }
  else if (this.jumping && this.velocityY > 0 && this.facing === "east") {
    index === 8 ? index = 0 : index++;
    this.heroImage.src = `./images/${this.heroType}FallRight.png`;
  }
  else if(this.velocityX > 0 && this.facing === "east" && count % 2 === 0 && !this.playerCollide){
    this.heroImage.src = `./images/${this.heroType}RunRight.png`;
    index === 8 ? index = 0 : index++;
  }
  else if(this.velocityX < 0 && this.facing === "west" && count % 2 === 0 && !this.playerCollide){
    index === 8 ? index = 0 : index++;
    this.heroImage.src = `./images/${this.heroType}RunLeft.png`;
  }
  else if(Math.abs(this.velocityX) < 1 && this.facing === "east") {
    index === 0;
    this.heroImage.src = `./images/${this.heroType}IdleRight.png`;
  }
  else if(Math.abs(this.velocityX) < 1 && this.facing === "west") {
    index === 0;
    this.heroImage.src = `./images/${this.heroType}IdleLeft.png`;
  }




  context.drawImage(
    this.heroImage, index*100, 0, 100, 150, this.x, this.y, this.width, this.height
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
  // if(this.cooldown.shoot){
    var bullet = new Bullet(this.x, this.y);
    bullet.player = player;

    this.facing === "east" ?
    bullet.velocityX =+ bullet.speed : bullet.velocityX =- bullet.speed;

    bullet.velocityY =- bullet.speed/4;
    bullets.push(bullet);
  // }
}
