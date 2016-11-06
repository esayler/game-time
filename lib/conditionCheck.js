function conditionCheck(player){
  var now = Date.now();

  if(player.deathCooldown > now){
    player.width = 58;
  } else if(player.dead){
    player.reset = true;
    player.dead = false;
    player.width = 45;
  }

  if(player.stunCooldown < now)
    player.stunned = false;
}
