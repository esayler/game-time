function winCheck(players){
  var player1 = players[0];
  var player2 = players[1];


  if (player2.lives === 0) {
    alert("Player 1 wins!");
    player1.lives = 20;
    player2.lives = 20;
    player1.reset = true;
    player2.reset = true;
    updateHUD(players);
  }

  if (player1.lives === 0) {
    alert("Player 2 wins!");
    player1.lives = 20;
    player2.lives = 20;
    player1.reset = true;
    player2.reset = true;
    updateHUD(players)
  }
}
