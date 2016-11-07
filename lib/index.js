import Loader from './loader'
import Platform from './platform'
import renderHUD from './hud'
import Game from './game'
import TileMap from './tilemap'
import Player from './player'
import Keyboard from './keyboard'
import {load, setup, play, end } from './gamestate'
import { imageArray } from './assets'

// let gameState = load;

var loader = new Loader();

window.onload = function() {

  var state     = load;
  var bg        = {};
  var fg        = {};
  var gameSize  = {};
  var g;
  var platforms = [];

  loader.loadMusic();



  function loadAssets() {
    return [
      loader.loadImages(imageArray)
    ];
  };

  let promises = loadAssets();
  Promise.all(promises).then(function(loaded) {
    init();
    window.requestAnimationFrame(tick);
  });

  function init() {

    bg.cnvs = document.getElementById('bg-layer');
    bg.ctxt = bg.cnvs.getContext('2d');

    fg.cnvs = document.getElementById('fg-layer');
    fg.ctxt = fg.cnvs.getContext('2d');

    gameSize = { x: bg.cnvs.width, y: bg.cnvs.height };


    platforms.push(new Platform({ fillStyle : 'rgba(103,58,183,1)',bgContext  : (bg.ctxt), x: 0, y   : 570, width: 1250, height: 70, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(255,152,0,1)', bgContext  : (bg.ctxt), x: 520, y : 180, width: 400, height : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(0,150,136,1)', bgContext  : (bg.ctxt), x: 165, y : 315, width: 220, height : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(158,158,158,1)',bgContext : (bg.ctxt), x: 475, y : 420, width: 325, height : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(233,30,99,1)', bgContext  : (bg.ctxt), x: 0, y   : 214, width: 95,  height : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(33,150,243,1)', bgContext : (bg.ctxt), x: 1010, y: 330, width: 225, height : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(255,235,59,1)', bgContext : (bg.ctxt), x: 1175, y: 504, width: 75, height  : 40, passThrough: false }));
    platforms.push(new Platform({ fillStyle : 'rgba(205,220,57,1)', bgContext : (bg.ctxt), x: 1073, y: 535, width: 80, height  : 38, passThrough: false }));
    platforms.push(new Platform({ fillStyle : 'rgba(255,193,7,1)', bgContext  : (bg.ctxt), x: 1110, y: 497, width: 40, height  : 38, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(76,175,80,1)', bgContext  : (bg.ctxt), x: 685, y : 382, width: 35, height  : 40, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(63,81,181,1)', bgContext  : (bg.ctxt), x: 648, y : 382, width: 35, height  : 40, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(244,67,54,1)', bgContext  : (bg.ctxt), x: 0, y   : 400, width: 35, height  : 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle : 'rgba(3,169,244,1)', bgContext  : (bg.ctxt), x: 688, y : 140, width: 36, height  : 40, passThrough: true }));


    let kb = new Keyboard();

    let p1 = new Player({
      fillStyle: "#838383",
      heroType : 'Cat',
      position : { x: 300, y: 505 },
      facing   : "east",
      context  : fg.ctxt,
      gameSize : gameSize,
      id       : 1,
      kb       : kb,
      platforms: platforms,
    });

    let p2 = new Player({
      fillStyle: "#EC9F48",
      heroType : 'Dog',
      position : { x: 900, y: 505 },
      facing   : "west",
      context  : fg.ctxt,
      gameSize : gameSize,
      id       : 2,
      kb       : kb,
      platforms: platforms,
    });

    let gameOptions = {
      fgContext: fg.ctxt,
      fgContext: bg.ctxt,
      p1       : p1,
      p2       : p2,
      gameSize : gameSize,
    };
    g = new Game(gameOptions);
  }

  const tick = () => {

    window.requestAnimationFrame(tick);

    bg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
    fg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
    // for (let platform of platforms) { platform.draw(); }

    // gameState();

    g.update();
    g.render();

    renderHUD((fg.ctxt), g.players);
  };
};
