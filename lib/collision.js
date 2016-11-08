let platformCollisionCheck = (player, platforms) => {

  return platforms.map( platform => {

    // check left edge of platform touching right edge of player
    var checkPlayerRight = (platform.x - (player.position.x + player.size.width));
    // check right edge of platform with left edge of player
    var checkPlayerLeft = (player.position.x - (platform.x + platform.width));

    // check top of player with bottom of platform
    var checkPlayerTop = (player.position.y - (platform.y + platform.height));

    // check bottom of player with top of platform
    var checkPlayerBottom = (platform.y - (player.position.y + player.size.height));


    var objHalfWidths = (player.size.width / 2) + (platform.width / 2);
    var objHalfHeights = (player.size.height / 2) + (platform.height / 2);


    // if player obj is touching or overlapping with platorm
    if (checkPlayerTop <= 0 && checkPlayerBottom <= 0 && checkPlayerLeft <= 0 && checkPlayerRight <= 0) {

      var distanceX = (player.position.x + player.size.width / 2) - (platform.x + platform.width / 2);
      var distanceY = (platform.y + platform.height / 2) - (player.position.y + player.size.height / 2);

      var x = objHalfWidths - Math.abs(distanceX);
      var y = objHalfHeights - Math.abs(distanceY);

      // player approaching top or bottom
      if (x >= y) {
        // player is below platform
        if (distanceY < 0 && !platform.passThrough) {
          player.position.y = platform.height + platform.y;
          player.velocity.y = 0;
        }

        // player approaching top of platform while moving down
        if (distanceY > 0 && player.velocity.y > 0) {
          player.position.y -= y;
          player.grounded = true;
          player.jumpcount = 0;
          player.jumping = false;
        }
      } else { //player approaching from side
        // player approaching left side of platform
        if (distanceX < 0 && !platform.passThrough) {
          player.position.x = platform.x - player.size.width;
          player.velocity.x /= 2;
        }
        // player approaching right side of platform
        if (distanceX > 0 && !platform.passThrough) {
          player.position.x = platform.width + platform.x;
          player.velocity.x /= 2;

        }
      }
      return true;
    }

    return false;
  });
};


let playerCollisionCheck = function(players) {
  var player1 = players[0];
  var player2 = players[1];


  var distanceX = (player2.position.x + player2.size.width / 2) - (player1.position.x + player1.size.width / 2);
  var distanceY = (player2.position.y + player2.size.height / 2) - (player1.position.y + player1.size.height / 2);


  var playerHit = false;
  // if (Math.abs(distanceX) <= player1.size.width / 2 && distanceX > 0 && Math.abs(distanceY) < 25){
  //   player1.velocity.x = -player1.velocity.x * 1.5;
  //   player2.velocity.x = -player2.velocity.x * 1.5;
  //   player2.position.x = player2.position.x + player2.size.width / 4;
  //   player1.position.x = player1.position.x - player1.size.width / 4;
  // }
  //
  // if (Math.abs(distanceX) <= player1.size.width / 2 && distanceX < 0 && Math.abs(distanceY) < 25) {
  //   player1.velocity.x = -player1.velocity.x * 1.5;
  //   player2.velocity.x = -player2.velocity.x * 1.5;
  //   player2.position.x = player2.position.x - player2.size.width / 4;
  //   player1.position.x = player1.position.x + player1.size.width / 4;
  //
  // }


  //^^^^^^^^^player x collision


  if (Math.abs(distanceY) <= player1.size.height / 2 &&
      Math.abs(distanceY) >= (player1.size.height / 2) - 20 &&
      distanceY > 0 &&
      Math.abs(Math.floor(distanceX)) < player1.size.width / 2 &&
      player1.velocity.y > 1 &&
      !player2.dead && !player1.stunned) {
        player1.velocity.y = -15;
        // player2.reset = true;
        player2.dead = true;
        player2.deathCooldown = Date.now() + 750;
        playerHit = true;
  }

  if (Math.abs(distanceY) <= player1.size.height / 2 &&
      Math.abs(distanceY) >= (player1.size.height / 2) - 20 &&
      distanceY < 0 &&
      Math.abs(Math.floor(distanceX)) < player1.size.width / 2 &&
      player2.velocity.y > 1 &&
      !player1.dead && !player2.stunned) {
        player2.velocity.y = -15;
        // player1.reset = true;
        player1.dead = true;
        player1.deathCooldown = Date.now() + 750;
        playerHit = true;
  }

  return playerHit;
};

let projectileHitCheck = function(players) {

  var player1 = players[0];
  var player2 = players[1];

  // let projectles = player1.bullets.concat(player2.bullets);

  var collided = [];

  collided[0] = player1.bullets.map( b => {
    var distanceX = (b.position.x + b.size.width / 2) - (player2.position.x + player2.size.width / 2);
    var distanceY = (b.position.y + b.size.height / 2) - (player2.position.y + player2.size.height / 2);

    if (Math.abs(distanceX) < (player2.size.width / 2) && Math.abs(distanceY) < (player2.size.height / 3)) {
      player2.stunned = true;
      player2.stunCooldown = Date.now() + 1000;
      return true;
    } else {
      return false;
    }
  });

  collided[1] = player2.bullets.map( b => {

    var distanceX = (b.position.x + b.size.width / 2) - (player1.position.x + player1.size.width / 2);
    var distanceY = (b.position.y + b.size.height / 2) - (player1.position.y + player1.size.height / 2);


    if (Math.abs(distanceX) < (player1.size.width / 2) && Math.abs(distanceY) < (player1.size.height / 3)) {
      player1.stunned = true;
      player1.stunCooldown = Date.now() + 1000;
      return true;
    } else {
      return false;
    }
  });

  return collided.reduce( (a, b) => a.concat(b), []);
};



export { playerCollisionCheck, platformCollisionCheck, projectileHitCheck };
