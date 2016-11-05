
var canvas = document.getElementById("canvas1");
var bgCanvas = document.getElementById("canvas2");
var context = canvas.getContext("2d");
var bgContext = bgCanvas.getContext("2d");
var count = 0;
var vx = 0;
var vy = 0;
var gravity = Math.exp(.1);
var friction = .62;
var p1JumpHeld = false;
var p2JumpHeld = false;
var keys = {};
var projectiles = [];
var players = [];
var platforms = [];

var player1 = new Player("Cat", 300, "east");
var player2 = new Player("Dog", 900, "west");

platforms.push(new Platform(0, 580, 1250, 70, true));
platforms.push(new Platform(530, 435, 350, 40, true));
platforms.push(new Platform(612, 172, 332, 40, true));
platforms.push(new Platform(245, 288, 225, 40, true));
platforms.push(new Platform(0, 192, 147, 40,true));
platforms.push(new Platform(1025, 332, 225, 40, true));
platforms.push(new Platform(1175, 504, 75, 40, true));
platforms.push(new Platform(319, 503, 74, 40, true));
platforms.push(new Platform(0, 390, 85, 40, true));





players.push(player1);
players.push(player2);





function jump(player){
  player.velocityY =- player.speed*3.5;
  player.jumping = true;
  player.grounded = false;
}

function stunCheck(player){
  if(player.stunCooldown < Date.now()){
    player.stunned = false;
  }
}



window.onload = function(){

  // platforms.forEach(function(platform){
  //   platform.draw();
  // });




  document.addEventListener("keydown", function(event){
    keys[event.keyCode] = true;

    document.addEventListener("keyup", function(event){
      delete keys[event.keyCode];
      if(event.keyCode === 87){
        p1JumpHeld = false;
      }
      if(event.keyCode === 38){
        p2JumpHeld = false;
      }
    })
  })




requestAnimationFrame(function gameloop(){
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (keys[65] && !player1.stunned){
    player1.left();
  }

  if(keys[68] && !player1.stunned){
    player1.right();
  }

  if(keys[87] && !p1JumpHeld && !player1.stunned){
      player1.jumpCheck();
      p1JumpHeld = true;
  }

  if(keys[32] && !player1.stunned)
    player1.shoot("player1");

  if(keys[37] && !player2.stunned)
    player2.left();

  if(keys[39] && !player2.stunned)
    player2.right();

  if(keys[38] && !p2JumpHeld && !player2.stunned){
      player2.jumpCheck();
      p2JumpHeld = true;
  }

  if(keys[40] && !player2.stunned)
    player2.shoot("player2");



  projectiles.forEach(function(projectile){
    projectile.velocityY += gravity-.5;
    projectile.x += projectile.velocityX;
    projectile.y += projectile.velocityY;
    if(projectile.y<= 580){
      projectile.draw();
    } else {
      projectiles.shift();
    }

  });

  players.forEach(function(player){

    if(Math.abs(player.velocityX) < 1){
      player.velocityX = 0;
    }

    if(Math.abs(player.velocityX) > 0){
      player.grounded = false;
    }

    if(!player.grounded){
      if(player.velocityY < 25)
        player.velocityY += gravity;
    } else {
      player.velocityY = 0;
    }

    player.velocityX *= friction;
    player.x += player.velocityX;
    player.y += player.velocityY;

    if(player.jumping && !keys[65] && !keys[68] && !keys[37] && !keys[39]){
      player.velocityX /= friction;
    }

    if(player.x >= canvas.width-player.width){
      player.x = canvas.width-player.width;
    } else if(player.x<=0) {
      player.x = 0;
    }

    if(player.y>=canvas.height-player.height){
      player.y = canvas.height-player.height;
      player.jumping = false;
      player.grounded = true;
    }

    stunCheck(player);
    platformCollisionCheck(player, platforms);

    player.draw(count);
  })

  playerCollisionCheck(players);
  projectileHitCheck(players, projectiles);



  count++;
  requestAnimationFrame(gameloop);
  })
}
