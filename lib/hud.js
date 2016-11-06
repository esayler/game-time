export default function renderHUD(context, players) {

   context.save();

   context.shadowColor = 'black';
   context.shadowOffsetY = 1.4;
   context.shadowOffsetX = 1.4;
   context.fillStyle = "#838383";
   context.font = "48px 'Bangers'";
   context.fillText("Player 1", 10, 50);
   context.font = "28px 'Bangers'";
   context.fillText(`Lives: ${players[0].lives}`, 25, 80);

   context.shadowColor = 'black';
   context.shadowOffsetY = 1.4;
   context.shadowOffsetX = 1.4;
   context.font = "48px 'Bangers'";
   context.fillStyle = "#EC9F48";
   context.fillText("Player 2", 980, 50);
   context.font = "28px 'Bangers'";
   context.fillText(`Lives: ${players[1].lives}`, 1010, 80);

   context.restore();
}
