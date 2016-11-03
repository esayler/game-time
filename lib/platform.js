function Platform(x, y, width, height, passThrough){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.passThrough = passThrough || false;
}

Platform.prototype.draw = function(){
  bgContext.fillRect(this.x, this.y, this.width, this.height);
}
