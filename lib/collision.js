let platformCollisionCheck = function(player, platforms) {

  platforms.forEach(function(platform) {
    var checkLeft = (platform.x - (player.position.x + player.size.width));
    var checkRight = (player.position.x - (platform.x + platform.width));
    var checkTop = (player.position.y - (platform.y + platform.height));
    var checkBottom = (platform.y - (player.position.y + player.size.height));
    var objHalfWidths = (player.size.width / 2) + (platform.width / 2);
    var objHalfHeights = (player.size.height / 2) + (platform.height / 2);

    if (checkTop < 0 && checkBottom < 0 && checkLeft < 0 && checkRight < 0) {
      var distanceX = (player.position.x + player.size.width / 2) - (platform.x + platform.width / 2);
      var distanceY = (platform.y + platform.height / 2) - (player.position.y + player.size.height / 2);
      var x = objHalfWidths - Math.abs(distanceX);
      var y = objHalfHeights - Math.abs(distanceY);

      if (x >= y) {
        if (distanceY < 0 && !platform.passThrough) {
          player.position.y = platform.height + platform.y;
          player.velocity.y = 0;
        }


        if (distanceY > 0 && player.velocity.y > 0) {
          player.position.y -= y;
          player.grounded = true;
          player.jumping = false;
        }
      } else {
        if (distanceX < 0 && !platform.passThrough) {
          player.position.x = platform.x - player.size.width;
          player.velocity.x /= 2;
        }

        if (distanceX > 0 && !platform.passThrough) {
          player.position.x = platform.width + platform.x;
          player.velocity.x /= 2;

        }
      }
    }
  })
}


let playerCollisionCheck = function(players) {
  var player1 = players[0];
  var player2 = players[1];


  var distanceX = (player2.position.x + player2.size.width / 2) - (player1.position.x + player1.size.width / 2);
  var distanceY = (player2.position.y + player2.size.height / 2) - (player1.position.y + player1.size.height / 2);

  // if(Math.abs(distanceX) <= player1.width/2 && distanceX > 0 && Math.abs(distanceY) < 25){
  //   player1.velocityX = -player1.velocityX*1.5;
  //   player2.velocityX = -player2.velocityX*1.5;
  //   player2.x = player2.x+player2.width/4;
  //   player1.x = player1.x-player1.width/4;
  // }
  //
  // if(Math.abs(distanceX) <= player1.width/2 && distanceX < 0 && Math.abs(distanceY) < 25){
  //   player1.velocityX = -player1.velocityX*1.5;
  //   player2.velocityX = -player2.velocityX*1.5;
  //   player2.x = player2.x-player2.width/4;
  //   player1.x = player1.x+player1.width/4;
  //
  // }


  //^^^^^^^^^player x collision


  if (Math.abs(distanceY) <= player1.size.height / 2 && Math.abs(distanceY) >= (player1.size.height / 2) - 20 && distanceY > 0 && Math.abs(Math.floor(distanceX)) < player1.size.width / 2 && player1.velocity.y > 0) {
    player1.velocity.y = -20;
    player2.reset = true;
  }

  if (Math.abs(distanceY) <= player1.size.height / 2 && Math.abs(distanceY) >= (player1.size.height / 2) - 20 && distanceY < 0 && Math.abs(Math.floor(distanceX)) < player1.size.width / 2 && player2.velocity.y > 0) {
    player2.velocity.y = -20;
    player1.reset = true;
  }
}

let projectileHitCheck = function(players) {

  var player1 = players[0];
  var player2 = players[1];

  // let projectles = player1.bullets.concat(player2.bullets);

  player1.bullets.forEach(function(projectile) {
    var distanceX = (projectile.position.x + projectile.size.width / 2) - (player2.position.x + player2.size.width / 2);
    var distanceY = (projectile.position.y + projectile.size.height / 2) - (player2.position.y + player2.size.height / 2);

    if (Math.abs(distanceX) < (player2.size.width / 2) && Math.abs(distanceY) < (player2.size.height / 3)) {
      player2.stunned = true;
      player2.stunCooldown = Date.now() + 1000;
    }
  })

  player2.bullets.forEach(function(projectile) {

    var distanceX = (projectile.position.x + projectile.size.width / 2) - (player1.position.x + player1.size.width / 2);
    var distanceY = (projectile.position.y + projectile.size.height / 2) - (player1.position.y + player1.size.height / 2);


    if (Math.abs(distanceX) < (player1.size.width / 2) && Math.abs(distanceY) < (player1.size.height / 3)) {
      player1.stunned = true;
      player1.stunCooldown = Date.now() + 1000;
    }
  })
}



export { playerCollisionCheck, platformCollisionCheck, projectileHitCheck }
