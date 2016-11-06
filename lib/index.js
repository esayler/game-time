import { Loader } from './loader'
import Platform from './platform'

import Game from './game'
import TileMap from './tilemap'
import Player from './player'
import Keyboard from './keyboard'

window.onload = function() {

  function load() {
    return [
      Loader.loadImage('itemTiles', '../images/forest-items-sprite-0.png'),
      Loader.loadImage('mapTiles', '../images/forest-tiles-sprite-0.png')
    ];
  };

  let p = load();
  Promise.all(p).then(function(loaded) {
    init();
    window.requestAnimationFrame(tick);
  });

  // let state = load;

  // assets.load(['images/forest-tiles-sprite-0.png', 'images/forest-items-sprite-0.png', 'images/cat-sprite-0.png',
  //              'images/cat-sprite-1.png', 'images/cat-sprite-2.png', 'images/dog-sprite-0.png',
  //              'images/dog-sprite-1.png', 'images/dog-sprite-2.png', 'spec/cat-sprite-0.json',
  //              'spec/forest-tiles-0.json', 'spec/forest-items-0.json', 'spec/cat-1.json',
  //              'spec/cat-2.json', 'spec/dog-0.json', 'spec/dog-1.json', 'spec/dog-2.json']).then(() => setup());

  var bg = {};
  var fg = {};
  var gameSize = {};
  var g;
  var platforms = [];


  function init() {


    bg.cnvs = document.getElementById('bg-layer');
    bg.ctxt = bg.cnvs.getContext('2d');

    fg.cnvs = document.getElementById('fg-layer');
    fg.ctxt = fg.cnvs.getContext('2d');

    fg.ctxt.globalAlpha = 0.5;

    // let atlas = new TileMap(bg);

    gameSize = { x: bg.cnvs.width, y: bg.cnvs.height };


    platforms.push(new Platform({ fillStyle: 'rgba(158,158,158,1)' , bg: bg, x:    0, y: 570, width: 1250, height: 70, passThrough: true }));
    platforms.push(new Platform({ fillStyle: 'rgba(255,152,0,1)', bg: bg, x:  443, y: 195, width:  490, height: 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle: 'rgba(0,150,136,1)' , bg: bg, x:  165, y: 330, width:  220, height: 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle: 'rgba(233,30,99,1)' , bg: bg, x:    0, y: 192, width:  95, height: 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle: 'rgba(33,150,243,1)', bg: bg, x: 1010, y: 330, width:  225, height: 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle: 'rgba(255,235,59,1)', bg: bg, x: 1175, y: 504, width:   75, height: 40, passThrough: false }));
    platforms.push(new Platform({ fillStyle: 'rgba(96,125,139,1)', bg: bg, x:  328, y: 532, width:   110, height: 40, passThrough: false }));
    platforms.push(new Platform({ fillStyle: 'rgba(205,220,57,1)', bg: bg, x:  1073, y: 535, width:   80, height: 38, passThrough: false }));
    platforms.push(new Platform({ fillStyle: 'rgba(255,193,7,1)', bg: bg, x:  1110, y: 497, width:   40, height: 38, passThrough: true }));
    platforms.push(new Platform({ fillStyle: 'rgba(76,175,80,1)', bg: bg, x:  348, y: 495, width:   72, height: 36, passThrough: true }));
    platforms.push(new Platform({ fillStyle: 'rgba(63,81,181,1)', bg: bg, x:  348, y: 495, width:   72, height: 36, passThrough: false }));
    platforms.push(new Platform({ fillStyle: 'rgba(244,67,54,1)', bg: bg, x:  0, y: 385, width:   35, height: 20, passThrough: true }));
    platforms.push(new Platform({ fillStyle: 'rgba(3,169,244,1)', bg: bg, x:  615, y: 155, width:   36, height: 40, passThrough: false }));


    let kb = new Keyboard(g);

    let p1 = new Player({
      fillStyle: 'rgba(156,39,176,1)',
      heroType: 'Cat',
      position: { x: 300, y: 505 },
      facing: "east",
      context: fg.ctxt,
      gameSize: gameSize,
      id: 1,
      kb: kb,
      platforms: platforms,
    });

    let p2 = new Player({
      fillStyle: 'rgba(63,81,181,1)',
      heroType: 'Dog',
      position: { x: 900, y: 505 },
      facing: "west",
      context: fg.ctxt,
      gameSize: gameSize,
      id: 2,
      kb: kb,
      platforms: platforms,
    });

    let gameOptions = {
      fgContext: fg.ctxt,
      fgContext: bg.ctxt,
      p1: p1,
      p2: p2,
      gameSize: gameSize,
    };
    g = new Game(gameOptions);
  }


  // atlas.drawLayer(0);

  const tick = () => {

    window.requestAnimationFrame(tick);

    bg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
    fg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
    // for (let platform of platforms) { platform.draw(); }
    g.update();
    g.render();
  };

  // tick();
};
