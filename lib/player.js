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

Player.prototype.jump = function(){
  if(this.jumpcount < 2){
    this.velocityY =- this.speed * 2.5;
    this.jumping = true;
    this.grounded = false;
    this.jumpcount++;
  }
}

Player.prototype.shoot = function(player){
  if(this.shootCooldown < Date.now()){
    var projectile = new Projectile(this.x, this.y + 40);
    projectile.player = player;

    this.facing === "east" ?
    projectile.velocityX =+ projectile.speed : projectile.velocityX =- projectile.speed;

    projectile.velocityY =- projectile.speed/4;
    projectiles.push(projectile);
    this.shootCooldown = Date.now() + 1750;
  }
}

Player.prototype.velocity = function(){
  if(Math.abs(this.velocityX) < 1){
    this.velocityX = 0;
  }

  if(Math.abs(this.velocityX) > 0){
    this.grounded = false;
  }

  if(!this.grounded){
    if(this.velocityY < 25)
      this.velocityY += gravity;
  } else {
    this.velocityY = 0;
  }

  this.velocityX *= friction;
  this.x += this.velocityX;
  this.y += this.velocityY;

  if(this.jumping && !keys[65] && !keys[68] && !keys[37] && !keys[39]){
    this.velocityX /= friction;
  }
}

Player.prototype.conditionCheck = function(){
  var now = Date.now();

  if(this.deathCooldown > now){
    this.width = 58;
  } else if(this.dead){
    this.reset = true;
    this.dead = false;
    this.width = 45;
  }

  if(this.stunCooldown < now)
    this.stunned = false;
}

Player.prototype.platformCollisionCheck = function(player, platforms){
  platforms.forEach(function(platform){
    var checkLeft = (platform.x - (player.x + player.width));
    var checkRight = (player.x - (platform.x + platform.width));
    var checkTop =  (player.y - (platform.y + platform.height));
    var checkBottom = (platform.y - (player.y + player.height));
    var objHalfWidths = (player.width/2) + (platform.width/2);
    var objHalfHeights = (player.height/2) + (platform.height/2);


    if(checkTop < 0 && checkBottom < 0 && checkLeft < 0 && checkRight < 0){
      var distanceX = (player.x + player.width/2) - (platform.x + platform.width/2);
      var distanceY = (platform.y + platform.height/2) - (player.y + player.height/2);
      var x = objHalfWidths - Math.abs(distanceX);
      var y = objHalfHeights - Math.abs(distanceY);

      if(x >= y){
        if(distanceY < 0 && !platform.passThrough){
          player.y = platform.height + platform.y;
          player.velocityY = 0;
        }


        if(distanceY > 0 && player.velocityY > 0){
          player.y -= y;
          player.grounded = true;
          player.jumpcount = 0;
          player.jumping = false;
        }
      } else {
        if(distanceX < 0 && !platform.passThrough){
          player.x = platform.x - player.width;
          player.velocityX /= 2;
        }

        if(distanceX > 0 && !platform.passThrough){
          player.x = platform.width + platform.x;
          player.velocityX /= 2;
        }
      }
    }
  })
}

Player.prototype.mapBoundryCheck = function(){
  if(this.x >= canvas.width - 10){
    this.x = -35;
  } else if(this.x <= -35) {
    this.x = canvas.width - 10;
  }
}


Player.prototype.update = function(platforms){
  this.velocity();
  this.mapBoundryCheck();
  this.conditionCheck();
  this.platformCollisionCheck(this, platforms);
}
