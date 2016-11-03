
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var count = 0;
var vx = 0;
var vy = 0;
var gravity = Math.exp(.1);
var friction = .65;
var player1 = new Player();
var player2 = new Player();
var bullets = [];
var keys = {};
var p1JumpHeld = false;
var p2JumpHeld = false;
var cooldown = true;
var players = [];
var platforms = [];

var platform1 = new Platform(300, 500, 200, 150);
var platform2 = new Platform(600, 300, 200, 40);
var platform3 = new Platform(800, 450, 200, 50);


players.push(player1);
// players.push(player2);
platforms.push(platform1);
platforms.push(platform2);
platforms.push(platform3);


function Bullet(x, y){
  this.x = x;
  this.y = y;
  this.width = 10;
  this.height = 5;
  this.speed = 25;
  this.velocityX = 0;
  this.velocityY = 0;
  this.draw = function(){
    context.fillRect(this.x, this.y, this.width, this.height);
  }

}

function jump(player){
  player.velocityY =- player.speed*2.6;
  player.jumping = true;
  player.grounded = false;
}



window.onload = function(){




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

  if (keys[65]){
    player1.left();
  }

  if(keys[68]){
    player1.right();
  }

  if(keys[87] && !p1JumpHeld){
      player1.jumpP1();
      p1JumpHeld = true;
  }

  if(keys[32])
    player1.shoot();

  if(keys[37])
    player2.left();

  if(keys[38] && !p2JumpHeld){
      player2.jumpP2();
      p2JumpHeld = true;
  }

  if(keys[39])
    player2.right();

  if(keys[40])
    player2.shoot();



  bullets.forEach(function(bullet){
    bullet.velocityY += gravity-.5;
    bullet.x += bullet.velocityX;
    bullet.y += bullet.velocityY;
    if(bullet.y<canvas.height){
      bullet.draw();
    } else {
      bullets.shift();
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

    if(player.x>=canvas.width-player.width){
      player.x = canvas.width-player.width;
    } else if(player.x<=0) {
      player.x = 0;
    }

    if(player.y>=canvas.height-player.height){
      player.y = canvas.height-player.height;
      player.jumping = false;
      player.grounded = true;
    }


    collisionCheck(player, platforms);

    player.draw();
  })


  platforms.forEach(function(platform){
    platform.draw();
  });


  if(count % 100 === 0){
    cooldown = true;
  }

  count++;
  requestAnimationFrame(gameloop);
  })
}
