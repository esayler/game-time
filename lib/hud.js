export default function renderHUD(hud, players) {

  var canvas = hud.cnvs;
  var context = hud.ctxt;

   context.clearRect(0, 0, canvas.width, canvas.height);
   context.save();

   context.shadowColor = 'black';
   context.shadowOffsetY = 1.4;
   context.shadowOffsetX = 1.4;
   context.fillStyle = "#838383";
   context.font = "48px 'Carter One'";
   context.fillText("Player 1", 10, 50);
   context.font = "28px 'Carter One'";
   context.fillText(`Lives: ${players[0].lives}`, 45, 80);

   context.shadowColor = 'black';
   context.shadowOffsetY = 1.4;
   context.shadowOffsetX = 1.4;
   context.font = "48px 'Carter One'";
   context.fillStyle = "#EC9F48";
   context.fillText("Player 2", 1055, 50);
   context.font = "28px 'Carter One'";
   context.fillText(`Lives: ${players[1].lives}`, 1085, 80);

   context.restore();
}
