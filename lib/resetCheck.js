function resetCheck(player){
  if(player.reset && player.heroType === "Cat"){
    player.x = 300;
    player.y = 515;
    player.facing = "east";
    player.reset = false;
  }
  if(player.reset && player.heroType === "Dog"){
    player.x = 900;
    player.y = 515;
    player.facing = "west";
    player.reset = false;
  }
}
