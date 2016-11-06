function render(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  projectiles.forEach(function(projectile){
    projectile.update();
  })

  players.forEach(function(player){
    player.update(platforms);
    resetCheck(player);
    player.draw();
  })
}
