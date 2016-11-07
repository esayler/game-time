export default function renderHUD(context, players) {

   context.save();

   context.shadowColor = 'black';
   context.shadowOffsetY = 1.4;
   context.shadowOffsetX = 1.4;
   context.fillStyle = "#838383";
   context.font = "48px 'Carter One'";
   context.fillText("Player 1", 10, 45);
   context.font = "28px 'Carter One'";
   context.fillText(`Lives: ${players[0].lives}`, 45, 80);

   context.shadowColor = 'black';
   context.shadowOffsetY = 1.4;
   context.shadowOffsetX = 1.4;
   context.font = "48px 'Carter One'";
   context.fillStyle = "#EC9F48";
   context.fillText("Player 2", 935, 45);
   context.font = "28px 'Carter One'";
   context.fillText(`Lives: ${players[1].lives}`, 975, 80);

   context.restore();
}
