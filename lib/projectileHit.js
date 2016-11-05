function projectileHitCheck(players, projectiles){
  var player1 = players[0];
  var player2 = players[1];

  projectiles.forEach(function(projectile){

    if(projectile.player === "player1"){
      var distanceX = (projectile.x+projectile.width/2) - (player2.x + player2.width/2);
      var distanceY = (projectile.y+projectile.height/2) - (player2.y+player2.height/2);


       if(Math.abs(distanceX) < (player2.width/2) && Math.abs(distanceY) < (player2.height/3)){
        player2.stunned = true;
        player2.stunCooldown = Date.now() + 1000;
       }
     }

    if(projectile.player === "player2"){
      var distanceX = (projectile.x+projectile.width/2) - (player1.x + player1.width/2);
      var distanceY = (projectile.y+projectile.height/2) - (player1.y+player1.height/2);


      if(Math.abs(distanceX) < (player1.width/2) && Math.abs(distanceY) < (player1.height/3)){
        player1.stunned = true;
        player1.stunCooldown = Date.now() + 1000;
      }
    }
  })
}
