import Loader from './loader';
import Game from './game';
import Player from './player';
import Keyboard from './keyboard';
// import {load, setup, play, end } from './gamestate';
import { imageArray, makePlatforms } from './assets';

// let gameState = load;
var actx = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = actx.createGain();

var loader = new Loader();
var kb = new Keyboard();
// loader.load();

window.onload = () => {
  // var state = load;

  var count = 0;
  var bg = {};
  var fg = {};
  var gameSize = {};
  var g;
  var platforms = [];

  function loadAssets() {
    let promises = []
    promises.push(document.fonts.ready);
    promises.push(loader.loadImages(imageArray));
    promises.push(loader.loadSound('music', '../audio/happy.mp3', actx));
    return promises;
  };

  let promises = loadAssets();
  Promise.all(promises).then(function(loaded) {
    init();
    window.requestAnimationFrame(tick);
  });

  function init() {
    kb.addListeners();
    var hud = {};
    var source;
    var music = loader.sounds['music'];
    music.loop = true;
    music.connect(gainNode);
    gainNode.connect(actx.destination);
    gainNode.gain.value = 1;
    music.start();


    bg.cnvs = document.getElementById('bg-layer');
    bg.ctxt = bg.cnvs.getContext('2d');

    fg.cnvs = document.getElementById('fg-layer');
    fg.ctxt = fg.cnvs.getContext('2d');

    hud.cnvs = document.getElementById('hud-layer');
    hud.ctxt = hud.cnvs.getContext('2d');


    gameSize = { x: bg.cnvs.width, y: bg.cnvs.height };

    platforms = makePlatforms(bg);

    let p1 = new Player({
      heroImage: new Image(),
      fillStyle: "#838383",
      heroType : 'Cat',
      position : { x: 200, y: 515 },
      facing   : "east",
      context  : fg.ctxt,
      gameSize : gameSize,
      id       : 1,
      kb       : kb,
      platforms: platforms,
      loader: loader,
    });

    let p2 = new Player({
      heroImage: new Image(),
      fillStyle: "#EC9F48",
      heroType : 'Dog',
      position : { x: 1000, y: 515 },
      facing   : "west",
      context  : fg.ctxt,
      gameSize : gameSize,
      id       : 2,
      kb       : kb,
      platforms: platforms,
      loader: loader,
    });

    let gameOptions = {
      fgContext: fg.ctxt,
      bgContext: bg.ctxt,
      p1       : p1,
      p2       : p2,
      gameSize : gameSize,
      hud : hud,
      loader: loader,
    };

    g = new Game(gameOptions);
    g.start();
  }

  const tick = () => {

    window.requestAnimationFrame(tick);

    if (kb.isDown(80)) {
      if (!g.paused) {
        g.paused = true;
      } else {
        g.paused = false;
      }
    }

    // gameState();

    if (!g.end && !g.paused) {

      bg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
      fg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
      // for (let platform of platforms) { platform.draw(); }
      g.update();
      g.render();

    } else if (g.end) {
      var playerWinsImage;
      if (g.player1.lives === 0) {
        playerWinsImage = loader.getImage('Player2Wins');
      } else {
        playerWinsImage = loader.getImage('Player1Wins');
      }
      fg.ctxt.drawImage(playerWinsImage, 0, 0, bg.cnvs.width, bg.cnvs.height, 0, 0, bg.cnvs.width, bg.cnvs.height);
      if(kb.isDown(32)) {
        g.start();
      }
    } else if (g.paused) {
      fg.ctxt.save();
      fg.ctxt.shadowColor = 'black';
      fg.ctxt.shadowOffsetY = 1.4;
      fg.ctxt.shadowOffsetX = 1.4;
      fg.ctxt.fillStyle = "#EC9F48";
      fg.ctxt.font = "72px 'Carter One'";
      fg.ctxt.fillText("Paused", 500, 390);
      fg.ctxt.restore();
    }
  };
};
