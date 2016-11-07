function Projectile(x, y, player){
  this.x = x;
  this.y = y;
  this.width = 15;
  this.height = 15;
  this.speed = 25;
  this.player = player;
  this.velocityX = 0;
  this.velocityY = 0;
  this.img = new Image();
}

Projectile.prototype.draw = function(){
    if(this.player === "player1"){
      this.img.src = "./images/yarnBall.png";
    }
    if(this.player === "player2"){
      this.img.src = "./images/tennisBall.png";
    }

    context.drawImage(
      this.img, 0, 0, 50, 50, this.x, this.y, this.width, this.height
    );
}

Projectile.prototype.update = function(){
    this.velocityY += gravity-.5;
    this.x += this.velocityX;
    this.y += this.velocityY;
    if(this.x < 0 - this.width){
      this.x = canvas.width;
    }

    if(this.x > canvas.width){
      this.x = 0 - this.width;
    }

    if(this.y <= 580){
      this.draw();
    } else {
      projectiles.shift();
    }
}
