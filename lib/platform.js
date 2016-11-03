function Platform(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Platform.prototype.draw = function(){
  context.fillRect(this.x, this.y, this.width, this.height);
}
