function playerCollisionCheck(players){
  var player1 = players[0];
  var player2 = players[1];


  // var checkX = (player2.x - (player1.x + player1.width));
  // var checkY  = (player2.y - (player1.y + player1.height));


  // if(checkX < 0){
    var distanceX = (player2.x + player2.width/2) - (player1.x+player1.width/2);
    var distanceY = (player2.y + player2.height/2) - (player1.y+player1.height/2);

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


    if(Math.abs(distanceY) <= player1.height/2 && Math.abs(distanceY) >= (player1.height/2)-20 && distanceY > 0 && Math.abs(Math.floor(distanceX)) < player1.width/2 && player1.velocityY > 0){
      player1.velocityY = -20;
      alert("player1 wins!");
    }

    if(Math.abs(distanceY) <= player1.height/2 && Math.abs(distanceY) >= (player1.height/2)-20 && distanceY < 0 && Math.abs(Math.floor(distanceX)) < player1.width/2 && player2.velocityY > 0){
      player2.velocityY = -20;
      alert("player2 wins!");
    }



}
