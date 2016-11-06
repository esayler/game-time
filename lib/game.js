start();
keys.listen();
updateHUD(this.players);

// platforms.forEach(function(platform){
//   platform.draw();
// });

requestAnimationFrame(function gameloop(){
render();
update();
requestAnimationFrame(gameloop);
})
