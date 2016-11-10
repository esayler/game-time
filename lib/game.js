import { playerCollisionCheck, projectileHitCheck } from './collision'
import renderHUD from './hud'

export default class Game {
  constructor(options) {
    this.hud = options.hud;
    this.kb        = options.kb;
    this.fgContext = options.fgContext;
    this.bgContext = options.bgContext;
    this.gameSize  = options.gameSize;
    this.players   = [];
    this.player1   = options.p1;
    this.player2   = options.p2;
    this.bullets1  = [];
    this.bullets2  = [];
    this.count     = 0;
    this.state = undefined;
    this.paused = false;
    this.load = options.load;
    this.init = options.init;
    this.loader = options.loader;
    this.end = false;
    this.level = 0;

    this.players.push(this.player1);
    this.players.push(this.player2);
  }

  start() {
    this.reset();
    this.end = false;
  }

  update() {
    playerCollisionCheck(this.players);
    projectileHitCheck(this.players);

    for (let player of this.players) {
      if (player.update()) {
        renderHUD(this.hud, this.players);
      } else if (player.lives === 0) {
        this.end = true;
      }
    }
  }

  render() {
    for (let player of this.players) { player.draw(); }
  }

  reset() {
    for (let player of this.players) {
      player.reset = true;
      player.playerReset();
      player.lives = 10;
    }
  }
}
