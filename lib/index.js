import Loader from './loader';
import Game from './game';
import Player from './player';
import Keyboard from './keyboard';
import Controller from './controller';
// import {load, setup, play, end } from './gamestate';
import { imageArray } from './assets';
import { makePlatforms, setBackground } from './map';

// let gameState = load;
var actx = new (window.AudioContext || window.webkitAudioContext)();
var loader = new Loader(actx);

var controller = new Controller();
controller.addListeners();

var kb = new Keyboard();
kb.addListeners();

var gameState = 'load';

var bg = {};
var fg = {};
var hud = {};
var gameSize = {};
var g;
var platforms = [];

var startScreen;
var battleMusic;

var winMusicNode;
var winMusicStarted;

var epicMusicNode;
var epicMusicStarted;

window.onload = () => {

  bg.cnvs = document.getElementById('bg-layer');
  bg.ctxt = bg.cnvs.getContext('2d');

  fg.cnvs = document.getElementById('fg-layer');
  fg.ctxt = fg.cnvs.getContext('2d');

  hud.cnvs = document.getElementById('hud-layer');
  hud.ctxt = hud.cnvs.getContext('2d');

  gameSize = { x: bg.cnvs.width, y: bg.cnvs.height };

  tick();

  function loadAssets() {
    console.log('loading assets...');
    let promises = [];
    promises.push(document.fonts.ready);
    promises.push(loader.loadImages(imageArray));
    promises.push(loader.loadSound('epicMusic', '../audio/battle.mp3'));
    promises.push(loader.loadSound('startScreenMusic', '../audio/caketown.mp3'));
    promises.push(loader.loadSound('battleMusic', '../audio/happy.mp3'));
    promises.push(loader.loadSound('winMusic', '../audio/annulet.wav'));

    // promises.push(loader.loadSounds(soundArray)); //TODO: fix to load multiple sounds
    return promises;
  }


  let promises = loadAssets();
  Promise.all(promises).then(function() {
    console.log('assets loaded.');
    fg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
    startScreen = loader.getImage('StartScreen');
    gameState = 'menu';
    menuMusic.play();
  });

  function init(mapNumber) {

    platforms = makePlatforms(bg, mapNumber);
    setBackground(mapNumber, loader);
    playBattleMusic();

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

  function tick() {
    if (gameState === 'load') {

      printLoading();
    } else if (gameState === "menu") {
      stopWinMusic();
      menuMusic.play();

      clearForeground();
      listenForMapChoice();
    } else if (gameState === "winScreen") {
      stopEpicMusic();
      menuMusic.stop();

      playWinMusic();
      displayWinScreen();
      listenForContinueToMenu();

    } else if (gameState === "play") {
      // drawPlatforms();
      menuMusic.stop();

      listenForPause();
      clearCanvases();
      epicMusicCheck();
      updateFrame();
    }

    window.requestAnimationFrame(tick);
  }

  function updateFrame() {
    if (!g.paused && !g.end) {
      g.update();
      g.render();
    } else if (g.paused) {
      printPaused();
      g.render();
    } else if (g.end) {
      gameState = 'winScreen';
    }
  }

  function clearForeground() {
    fg.ctxt.drawImage(startScreen,
                      0,
                      0,
                      bg.cnvs.width,
                      bg.cnvs.height,
                      0,
                      0,
                      bg.cnvs.width,
                      bg.cnvs.height);
  }

  function clearCanvases() {
    bg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
    fg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
  }

  function drawPlatforms() {
    for (let platform of platforms) { platform.draw(); }
  }

  function listenForMapChoice() {
    if (kb.isDown(kb.KEYS[0].LEFT) && !kb.keyHeld) {
      init(0);
      gameState = "play";
    } else if (kb.isDown(kb.KEYS[0].RIGHT) && !kb.keyHeld) {
      init(1);
      gameState = "play";
    }
  }

  function listenForPause() {
    if (kb.isDown(kb.KEYS[0].ESCAPE) && !kb.keyHeld) {
      kb.keyHeld = true;
      if (!g.paused) {
        g.paused = true;
      } else {
        g.paused = false;
      }
      document.addEventListener("keyup", function(e){
        if(e.keyCode === kb.KEYS[0].ESCAPE){
        kb.keyHeld = false;
      }});
    }
  }

  function displayWinScreen() {
    var playerWinsImage;
    if (g.player1.lives === 0) {
      playerWinsImage = loader.getImage('Player2Wins');
    } else {
      playerWinsImage = loader.getImage('Player1Wins');
    }
    fg.ctxt.drawImage(playerWinsImage, 0, 0, bg.cnvs.width, bg.cnvs.height, 0, 0, bg.cnvs.width, bg.cnvs.height);
  }

  function listenForContinueToMenu() {
    if (kb.isDown(kb.KEYS[0].SPACE) && !kb.keyHeld) {
      kb.keyHeld = true;
      gameState = "menu";
      document.addEventListener("keyup", function(e) {
        if(e.keyCode === 32){
        kb.keyHeld = false;
      }});
    }
  }

  function printLoading() {
    fg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
    fg.ctxt.save();
    fg.ctxt.shadowColor = 'black';
    fg.ctxt.shadowOffsetY = 1.4;
    fg.ctxt.shadowOffsetX = 1.4;
    fg.ctxt.fillStyle = "white";
    fg.ctxt.textAlign = "center";
    fg.ctxt.font = "54px 'Carter One'";
    fg.ctxt.fillText("Loading...", fg.cnvs.width/2, 620);
    fg.ctxt.restore();
  }

  function printPaused() {
    fg.ctxt.save();
    fg.ctxt.shadowColor = 'black';
    fg.ctxt.shadowOffsetY = 1.4;
    fg.ctxt.shadowOffsetX = 1.4;
    fg.ctxt.fillStyle = "#EC9F48";
    fg.ctxt.font = "72px 'Carter One'";
    fg.ctxt.fillText("Paused", 500, 390);
    fg.ctxt.restore();
  }

  let menuMusic = ((actx) => {
    let menuMusicNode;
    let menuMusicStarted = false;

    return {
      play: () => {
        if (!menuMusicStarted) {
          menuMusicStarted = true;
          let gainNode = actx.createGain();
          menuMusicNode = actx.createBufferSource();
          menuMusicNode.connect(gainNode);
          let musicBuffer = loader.sounds['startScreenMusic'];
          menuMusicNode.buffer = musicBuffer;
          gainNode.connect(actx.destination);
          gainNode.gain.value = 1.35;
          menuMusicNode.loop = true;
          menuMusicNode.start();
        }
      },
      stop: () => {
        if (menuMusicNode) {
          menuMusicNode.stop();
          menuMusicStarted = false;
        }
      }
    };
  })(actx);

  function playBattleMusic() {
    var gainNode = actx.createGain();
    battleMusic = actx.createBufferSource();
    battleMusic.connect(gainNode);
    let musicBuffer = loader.sounds['battleMusic'];
    battleMusic.buffer = musicBuffer;
    gainNode.connect(actx.destination);
    gainNode.gain.value = 0.35;
    battleMusic.loop = true;
    battleMusic.start();
  }

  function epicMusicCheck() {
    if ((g.players[0].lives === 1 ||
         g.players[1].lives === 1) &&
         !epicMusicStarted) {
           epicMusicStarted = true;
           battleMusic.stop();
           playEpicMusic();
    }
  }

  function playEpicMusic() {
    var gainNode = actx.createGain();
    epicMusicNode = actx.createBufferSource();
    epicMusicNode.connect(gainNode);
    let musicBuffer = loader.sounds['epicMusic'];
    epicMusicNode.buffer = musicBuffer;
    gainNode.connect(actx.destination);
    gainNode.gain.value = 0.35;
    epicMusicNode.loop = true;
    epicMusicNode.start();
  }

  function stopEpicMusic() {
    if (epicMusicNode) {
      epicMusicNode.stop();
      epicMusicStarted = false;
    }

  }

  function playWinMusic() {
    if (!winMusicStarted) {
      winMusicStarted = true;
      // menuMusicStarted = true;
      winMusicNode = actx.createBufferSource();
      let musicBuffer = loader.sounds['winMusic'];
      winMusicNode.buffer = musicBuffer;
      winMusicNode.connect(actx.destination);
      winMusicNode.start();
    }
  }

  function stopWinMusic() {
    if (winMusicNode) {
      winMusicNode.stop();
      winMusicStarted = false;
    }
  }

};
