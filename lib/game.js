import {load, setup, play, end } from './gamestate'
import Player from './player'
import TileMap from './tilemap'
import Keyboard from './keyboard'
import Platform from './platform'
import { playerCollisionCheck, projectileHitCheck } from './collision'
import renderHUD from './hud'


export default class Game {
  constructor(options) {
    this.hud = options.hud
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

    this.players.push(this.player1);
    this.players.push(this.player2);
  }


  gameLoop() {


  }


  start() {

  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = true;
  }

  update() {
    for (let player of this.players) {
      if (player.update()) {
        renderHUD(this.hud, this.players);
      }
    }

    playerCollisionCheck(this.players);
    projectileHitCheck(this.players);
  }

  render() {
    for (let player of this.players) { player.draw(); }
  }
}
