import Game from './game'

window.onload = function () {
    var game = new Game('canvas');
    game.previousElapsed = 0;
    // game.drawLayer(0);
    const tick = (elapsed) => {
      // console.log('tick');
      window.requestAnimationFrame(tick);

      // clear previous frame
      game.context.clearRect(0, 0, game.gameSize.x, game.gameSize.y);
      // console.log('tick');

      // // compute delta time in seconds -- also cap it
      // var delta = (elapsed - game.previousElapsed) / 1000.0;
      // delta = Math.min(delta, 0.25); // maximum delta of 250 ms
      // game.previousElapsed = elapsed;

      // game.update(delta);

      game.update();
      game.render();
    };

    tick();
};


// tick(elapsed) {
//   window.requestAnimationFrame(self.tick);
//
//   // clear previous frame
//   this.ctx.clearRect(0, 0, this.gameSize.x, this.gameSize.y);
//
//   // compute delta time in seconds -- also cap it
//   var delta = (elapsed - this._previousElapsed) / 1000.0;
//   delta = Math.min(delta, 0.25); // maximum delta of 250 ms
//   this._previousElapsed = elapsed;
//
//   this.update(delta);
//   this.render();
// }
