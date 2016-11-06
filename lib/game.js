import Player from './player'
import TileMap from './tilemap'
import Keyboard from './keyboard'
import Platform from './platform'
import { playerCollisionCheck, projectileHitCheck } from './collision'

export default class Game {
  constructor(options) {
     
    this.fgContext = options.fgContext;
    this.bgContext = options.bgContext;
    this.kb = options.kb;

    this.previousElapsed = 0;
    this.gameSize = options.gameSize;
    this.players = [];

    this.player1 = options.p1;
    this.player2 = options.p2;

    this.players.push(this.player1);
    this.players.push(this.player2);

    this.count = 0;
    this.bullets1 = [];
    this.bullets2 = [];

    this.keys = {};
  }

  update() {

    for (let player of this.players) {
      player.update();
    }

    playerCollisionCheck(this.players);
    projectileHitCheck(this.players);
  }


  render() {

    for (let player of this.players) { player.draw(); }
    // this.context.drawImage(this.hero.image, this.hero.x, this.hero.y);
    // draw map top layer
    // this.drawLayer(1);
  }
}
