function updateHUD(players){
  HUDContext.clearRect(0, 0, HUDCanvas.width, HUDCanvas.height);

  var player1 = players[0];
  var palyer2 = players[1];

  HUDContext.shadowColor = 'black';
  HUDContext.shadowOffsetY = 1.4;
  HUDContext.shadowOffsetX = 1.4;
  HUDContext.fillStyle = "#838383";
  HUDContext.font = "48px 'Carter One'";
  HUDContext.fillText("Player 1", 10, 50);
  HUDContext.font = "28px 'Carter One'";
  HUDContext.fillText(`Lives: ${player1.lives}`, 25, 80);

  HUDContext.shadowColor = 'black';
  HUDContext.shadowOffsetY = 1.4;
  HUDContext.shadowOffsetX = 1.4;
  HUDContext.font = "48px 'Carter One'";
  HUDContext.fillStyle = "#EC9F48";
  HUDContext.fillText("Player 2", 1055, 50);
  HUDContext.font = "28px 'Carter One'";
  HUDContext.fillText(`Lives: ${player2.lives}`, 1085, 80);
}
