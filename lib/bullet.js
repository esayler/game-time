function Bullet(x, y, player){
  this.x = x;
  this.y = y;
  this.width = 10;
  this.height = 10;
  this.speed = 25;
  this.player = player;
  this.velocityX = 0;
  this.velocityY = 0;
  this.draw = function(){
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
