function collisionCheck(player, platforms){

  platforms.forEach(function(platform){
    var checkLeft = (platform.x - (player.x + player.width));
    var checkRight = (player.x - (platform.x + platform.width));
    var checkTop =  (player.y - (platform.y + platform.height));
    var checkBottom = (platform.y - (player.y + player.height));
    var objHalfWidths = (player.width/2) + (platform.width/2);
    var objHalfHeights = (player.height/2) + (platform.height/2);


    if(checkTop < 0 && checkBottom < 0 && checkLeft < 0 && checkRight < 0){
      var distanceX = (player.x+player.width/2) - (platform.x+platform.width/2);
      var distanceY = (platform.y+platform.height/2) - (player.y+player.height/2);
      var x = objHalfWidths - Math.abs(distanceX);
      var y = objHalfHeights - Math.abs(distanceY);

      if(x >= y){
        if(distanceY < 0){
          player.y = platform.height + platform.y;
          player.velocityY = 0;
        }


        if(distanceY > 0){
          player.y -= y;
          player.grounded = true;
          player.jumping = false;
        }
      } else {
        if(distanceX < 0){
          player.x = platform.x - player.width;
          player.velocityX /= 2;
        }

        if(distanceX > 0){
          player.x = platform.width + platform.x;
          player.velocityX /= 2;

        }
      }
    }
  })
}
