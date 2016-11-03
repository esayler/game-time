function Player(){
  this.x = 600;
  this.y = canvas.height-20;
  this.width = 45;
  this.height = 65;
  this.speed = 8;
  this.velocityX = 0;
  this.velocityY = 0;
  this.jumping = false;
  this.facing = "east";
  this.grounded = true;
  this.cat = new Image();
}

Player.prototype.drawCat = function(count){
  var index = 0;


  if (this.jumping && this.velocityY < 0 && this.facing === "west") {
    index === 8 ? index = 1 : index++;
    this.cat.src = "./images/CatJumpLeft.png";
  }
  else if (this.jumping && this.velocityY < 0 && this.facing === "east") {
    index === 8 ? index = 1 : index++;
    this.cat.src = "./images/CatJumpRight.png";
  }
  else if (this.jumping && this.velocityY > 0 && this.facing === "west") {
    index === 8 ? index = 1 : index++;
    this.cat.src = "./images/CatFallLeft.png";
  }
  else if (this.jumping && this.velocityY > 0 && this.facing === "east") {
    index === 8 ? index = 1 : index++;
    this.cat.src = "./images/CatFallRight.png";
  }
  else if(this.velocityX > 0 && this.facing === "east" && count % 2 === 0){
    this.cat.src = "./images/CatRunRight.png";
    index === 8 ? index = 1 : index++;
  }
  else if(this.velocityX < 0 && this.facing === "west" && count % 2 === 0){
    index === 8 ? index = 1 : index++;
    this.cat.src = "./images/CatRunLeft.png";
  }
  else if(Math.abs(this.velocityX) < 1 && this.facing === "east") {
    index === 0;
    this.cat.src = "./images/CatIdleRight.png";
  }
  else if(Math.abs(this.velocityX) < 1 && this.facing === "west") {
    index === 0;
    this.cat.src = "./images/CatIdleLeft.png";
  }




  context.drawImage(
    this.cat, index*100, 0, 100, 150, this.x, this.y, this.width, this.height
  );


//   if(velocity < 0 && count % 4 === 0){
//     index === 8 ? index = 1 : index++;
//     context.drawImage(
//       this.cat, index*450, 0, 450, 450, this.x, this.y, this.width, this.height
//     );
//   } else {
//     context.drawImage(
//       this.cat, 0, 0, 450, 450, this.x, this.y, this.width, this.height
//     );
//   }
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
