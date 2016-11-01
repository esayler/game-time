var canvas = $("#canvas")[0];
var context = canvas.getContext("2d");
var count = 0;
var vx = 0;
var vy = 0;
var gravity = 1.2 ;
var friction = .75;
var player1 = new Player();
var player2 = new Player();
var bullets = [];
var keys = {};
var p1JumpHeld = false;
var p2JumpHeld = false;
var cooldown = true;
var players = [];


players.push(player1);
players.push(player2);



function Player(){
  this.x = 600;
  this.y = canvas.height-20;
  this.width = 20;
  this.height = 20;
  this.speed = 6;
  this.velocityX = 0;
  this.velocityY = 0;
  this.jumping = false;
  this.facing = "east";
}

Player.prototype.draw = function(){
  context.fillRect(this.x, this.y, this.width, this.height);
}

Player.prototype.left = function(){
  this.velocityX -= this.speed;
  this.facing = "west";
}

Player.prototype.right = function(){
  this.velocityX += this.speed;
  this.facing = "east";
}

Player.prototype.jumpP1 = function(){
  if(!this.jumping){
    jump(this);
  }
}

Player.prototype.jumpP2 = function(){
  if(!this.jumping){
    jump(this);
  }
}


// Player.prototype.wallJump = function(){
//   if(!keyheld){
//     this.velocityY =- this.speed*2
//     this.velocityX =+ this.speed*2;
//     this.jumping = true
//     keyheld = true;
//   }
// }

Player.prototype.shoot = function(){
  if(cooldown){
    var bullet = new Bullet(this.x, this.y);

    this.facing === "east" ?
    bullet.velocityX =+ bullet.speed : bullet.velocityX =- bullet.speed;

    bullet.velocityY =- bullet.speed/4;
    bullets.push(bullet);
    cooldown = false;
  }
}

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
  player.velocityY =- player.speed*4;
  player.jumping = true;
}



$(function(){

  $(document).on("keydown", function(event){
    keys[event.keyCode] = true;

    $(document).on("keyup", function(event){
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

  if (keys[65])
    player1.left();

  if(keys[68])
    player1.right();

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
    player.velocityY += gravity;
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
    }

    player.draw();
  })
  if(count % 100 === 0){
    cooldown = true;
  }

  count++;
  requestAnimationFrame(gameloop);
})})
