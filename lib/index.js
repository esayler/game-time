import Loader from './loader';
import Game from './game';
import Player from './player';
import Keyboard from './keyboard';
// import {load, setup, play, end } from './gamestate';
import { imageArray } from './assets';
import { makePlatforms, setBackground } from './map';

// let gameState = load;
var actx = new (window.AudioContext || window.webkitAudioContext)();
var loader = new Loader();

var kb = new Keyboard();
kb.addListeners();

var gameState = "menu";

var bg = {};
var fg = {};
var hud = {};
var gameSize = {};
var g;
var platforms = [];
var musicNode;

bg.cnvs = document.getElementById('bg-layer');
bg.ctxt = bg.cnvs.getContext('2d');

fg.cnvs = document.getElementById('fg-layer');
fg.ctxt = fg.cnvs.getContext('2d');

hud.cnvs = document.getElementById('hud-layer');
hud.ctxt = hud.cnvs.getContext('2d');

gameSize = { x: bg.cnvs.width, y: bg.cnvs.height };
// loader.load();

window.onload = () => {

  function loadAssets() {
    let promises = []
    promises.push(document.fonts.ready);
    promises.push(loader.loadImages(imageArray));
    promises.push(loader.loadSound('music', '../audio/happy.mp3', actx));
    return promises;
  }

  let promises = loadAssets();
  Promise.all(promises).then(function(loaded) {
    console.log('loaded');
    tick();
    // init();
    // window.requestAnimationFrame(tick);
  });

  function init() {

    musicNode = actx.createBufferSource();
    let musicBuffer = loader.sounds['music'];
    musicNode.buffer = musicBuffer;
    musicNode.connect(actx.destination);
    musicNode.loop = true;
    musicNode.start();

    platforms = makePlatforms(bg, 0);
    setBackground(0, loader);

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
  var gamePlay = false;

  function tick() {

    window.requestAnimationFrame(tick);

    if (gameState === "menu") {
      let startScreen = loader.getImage('StartScreen');
      // fg.ctxt.drawImage(startScreen, 0, 0, bg.cnvs.width, bg.cnvs.height, 0, 0, bg.cnvs.width, bg.cnvs.height);

      if (kb.isDown(32) && !gamePlay) {
        gamePlay = true;
        init();
        gameState = "play";
      }
    }


    if (kb.isDown(32) && !gamePlay && gameState === 'winScreen') {
      gameState = "menu";
    }
    if (kb.isDown(27) && !kb.keyHeld) {
      kb.keyHeld = true;
      if (!g.paused) {
        g.paused = true;
      } else {
        g.paused = false;
      }
      document.addEventListener("keyup", function(e){
        if(e.keyCode === 27){
        kb.keyHeld = false;
      }})
    }


    if(gameState === "play"){
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
        gamePlay = false;
        gameState = 'winScreen'
        musicNode.stop();
        fg.ctxt.drawImage(playerWinsImage, 0, 0, bg.cnvs.width, bg.cnvs.height, 0, 0, bg.cnvs.width, bg.cnvs.height);
        // if(kb.isDown(32)) {
        //   // g.start();
        // }
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
    }
  }
};
