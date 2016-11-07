import Loader from './loader'
import Platform from './platform'
import Game from './game'
import TileMap from './tilemap'
import Player from './player'
import Keyboard from './keyboard'
import {load, setup, play, end } from './gamestate'
import { imageArray, makePlatforms } from './assets'

// let gameState = load;
var actx = new (window.AudioContext || window.webkitAudioContext)();

var loader = new Loader();
// loader.load();

window.onload = function() {

  var state     = load;
  var bg        = {};
  var fg        = {};

  var gameSize  = {};
  var g;
  var platforms = [];


  function loadAssets() {
    let promises = []
    promises.push(document.fonts.ready);
    promises.push(loader.loadImages(imageArray));
    promises.push(loader.loadSound('music', '../audio/tle-extended.mp3', actx));
    return promises;
  };

  let promises = loadAssets();
  Promise.all(promises).then(function(loaded) {
    init();
    window.requestAnimationFrame(tick);
  });

  function init() {

    var hud = {};
    loader.sounds['music'].loop = true;
    loader.sounds['music'].start();

    bg.cnvs = document.getElementById('bg-layer');
    bg.ctxt = bg.cnvs.getContext('2d');

    fg.cnvs = document.getElementById('fg-layer');
    fg.ctxt = fg.cnvs.getContext('2d');

    hud.cnvs = document.getElementById('hud-layer');
    hud.ctxt = hud.cnvs.getContext('2d');


    gameSize = { x: bg.cnvs.width, y: bg.cnvs.height };

    platforms = makePlatforms(bg);

    let kb = new Keyboard();

    let p1 = new Player({
      fillStyle: "#838383",
      heroType : 'Cat',
      position : { x: 300, y: 515 },
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
      position : { x: 900, y: 515 },
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
      hud : hud,
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

    // renderHUD((hud), g.players);
  };
};
