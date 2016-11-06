function Keyboard() {}

Keyboard.prototype.listen = function(){
  document.addEventListener("keydown", function(event){
    keys[event.keyCode] = true;

    document.addEventListener("keyup", function(event){
      delete keys[event.keyCode];
      if(event.keyCode === 87){
        jumpcount = 0;
        p1JumpHeld = false;
      }
      if(event.keyCode === 38){
        p2JumpHeld = false;
      }
    })
  })
}

Keyboard.prototype.do = function(){
  var player1 = players[0];
  var player2 = players[1];


    if (keys[65] && !player1.stunned && !player1.dead){
      player1.left();
    }

    if(keys[68] && !player1.stunned && !player1.dead){
      player1.right();
    }

    if(keys[87] && !p1JumpHeld && !player1.stunned && !player1.dead){
        player1.jump();
        p1JumpHeld = true;
    }

    if(keys[83] && !player1.stunned && !player1.dead)
      player1.shoot("player1");

    if(keys[37] && !player2.stunned && !player2.dead)
      player2.left();

    if(keys[39] && !player2.stunned && !player2.dead)
      player2.right();

    if(keys[38] && !p2JumpHeld && !player2.stunned && !player2.dead){
        player2.jump();
        p2JumpHeld = true;
    }

    if(keys[40] && !player2.stunned && !player2.dead)
      player2.shoot("player2");
}
