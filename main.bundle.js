/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/game-time/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _loader = __webpack_require__(1);

	var _loader2 = _interopRequireDefault(_loader);

	var _game = __webpack_require__(2);

	var _game2 = _interopRequireDefault(_game);

	var _player = __webpack_require__(5);

	var _player2 = _interopRequireDefault(_player);

	var _keyboard = __webpack_require__(7);

	var _keyboard2 = _interopRequireDefault(_keyboard);

	var _controller = __webpack_require__(8);

	var _controller2 = _interopRequireDefault(_controller);

	var _assets = __webpack_require__(9);

	var _map = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// let gameState = load;

	// import {load, setup, play, end } from './gamestate';
	var actx = new (window.AudioContext || window.webkitAudioContext)();
	var loader = new _loader2.default(actx);

	var controller = new _controller2.default();
	controller.addListeners();

	var kb = new _keyboard2.default();
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

	window.onload = function () {

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
	    var promises = [];
	    promises.push(document.fonts.ready);
	    promises.push(loader.loadImages(_assets.imageArray));
	    promises.push(loader.loadSound('epicMusic', '../audio/battle.mp3'));
	    promises.push(loader.loadSound('startScreenMusic', '../audio/caketown.mp3'));
	    promises.push(loader.loadSound('battleMusic', '../audio/happy.mp3'));
	    promises.push(loader.loadSound('winMusic', '../audio/annulet.wav'));

	    // promises.push(loader.loadSounds(soundArray)); //TODO: fix to load multiple sounds
	    return promises;
	  }

	  var promises = loadAssets();
	  Promise.all(promises).then(function () {
	    console.log('assets loaded.');
	    fg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
	    startScreen = loader.getImage('StartScreen');
	    gameState = 'menu';
	    menuMusic.play();
	  });

	  function init(mapNumber) {

	    platforms = (0, _map.makePlatforms)(bg, mapNumber);
	    (0, _map.setBackground)(mapNumber, loader);
	    playBattleMusic();

	    var p1 = new _player2.default({
	      heroImage: new Image(),
	      fillStyle: "#838383",
	      heroType: 'Cat',
	      position: { x: 200, y: 515 },
	      facing: "east",
	      context: fg.ctxt,
	      gameSize: gameSize,
	      id: 1,
	      kb: kb,
	      platforms: platforms,
	      loader: loader
	    });

	    var p2 = new _player2.default({
	      heroImage: new Image(),
	      fillStyle: "#EC9F48",
	      heroType: 'Dog',
	      position: { x: 1000, y: 515 },
	      facing: "west",
	      context: fg.ctxt,
	      gameSize: gameSize,
	      id: 2,
	      kb: kb,
	      platforms: platforms,
	      loader: loader
	    });

	    var gameOptions = {
	      fgContext: fg.ctxt,
	      bgContext: bg.ctxt,
	      p1: p1,
	      p2: p2,
	      gameSize: gameSize,
	      hud: hud,
	      loader: loader
	    };
	    g = new _game2.default(gameOptions);
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
	    fg.ctxt.drawImage(startScreen, 0, 0, bg.cnvs.width, bg.cnvs.height, 0, 0, bg.cnvs.width, bg.cnvs.height);
	  }

	  function clearCanvases() {
	    bg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
	    fg.ctxt.clearRect(0, 0, gameSize.x, gameSize.y);
	  }

	  function drawPlatforms() {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = platforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var platform = _step.value;
	        platform.draw();
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
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
	      document.addEventListener("keyup", function (e) {
	        if (e.keyCode === kb.KEYS[0].ESCAPE) {
	          kb.keyHeld = false;
	        }
	      });
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
	      document.addEventListener("keyup", function (e) {
	        if (e.keyCode === 32) {
	          kb.keyHeld = false;
	        }
	      });
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
	    fg.ctxt.fillText("Loading...", fg.cnvs.width / 2, 620);
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

	  var menuMusic = function (actx) {
	    var menuMusicNode = void 0;
	    var menuMusicStarted = false;

	    return {
	      play: function play() {
	        if (!menuMusicStarted) {
	          menuMusicStarted = true;
	          var gainNode = actx.createGain();
	          menuMusicNode = actx.createBufferSource();
	          menuMusicNode.connect(gainNode);
	          var musicBuffer = loader.sounds['startScreenMusic'];
	          menuMusicNode.buffer = musicBuffer;
	          gainNode.connect(actx.destination);
	          gainNode.gain.value = 1.35;
	          menuMusicNode.loop = true;
	          menuMusicNode.start();
	        }
	      },
	      stop: function stop() {
	        if (menuMusicNode) {
	          menuMusicNode.stop();
	          menuMusicStarted = false;
	        }
	      }
	    };
	  }(actx);

	  function playBattleMusic() {
	    var gainNode = actx.createGain();
	    battleMusic = actx.createBufferSource();
	    battleMusic.connect(gainNode);
	    var musicBuffer = loader.sounds['battleMusic'];
	    battleMusic.buffer = musicBuffer;
	    gainNode.connect(actx.destination);
	    gainNode.gain.value = 0.35;
	    battleMusic.loop = true;
	    battleMusic.start();
	  }

	  function epicMusicCheck() {
	    if ((g.players[0].lives === 1 || g.players[1].lives === 1) && !epicMusicStarted) {
	      epicMusicStarted = true;
	      battleMusic.stop();
	      playEpicMusic();
	    }
	  }

	  function playEpicMusic() {
	    var gainNode = actx.createGain();
	    epicMusicNode = actx.createBufferSource();
	    epicMusicNode.connect(gainNode);
	    var musicBuffer = loader.sounds['epicMusic'];
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
	      var musicBuffer = loader.sounds['winMusic'];
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Loader = function () {
	  function Loader(actx) {
	    _classCallCheck(this, Loader);

	    this.imgs = {};
	    this.sounds = {};
	    this.fonts = {};
	    this.actx = actx;
	  }

	  _createClass(Loader, [{
	    key: 'loadImages',
	    value: function loadImages(images) {
	      var _this = this;

	      return images.map(function (image) {
	        _this.loadImage(image.label, image.src);
	      });
	    }
	  }, {
	    key: 'loadImage',
	    value: function loadImage(key, src) {
	      var img = new Image();

	      var d = new Promise(function (resolve, reject) {
	        img.onload = function () {
	          this.imgs[key] = img;
	          resolve(img);
	        }.bind(this);

	        img.onerror = function () {
	          reject('image failed to load: ' + src);
	        };
	      }.bind(this));

	      img.src = src;
	      return d;
	    }
	  }, {
	    key: 'getImage',
	    value: function getImage(key) {
	      return key in this.imgs ? this.imgs[key] : null;
	    }
	  }, {
	    key: 'loadSounds',
	    value: function loadSounds(sounds) {
	      var _this2 = this;

	      return sounds.map(function (sound) {
	        _this2.loadSound(sound.label, sound.src);
	      });
	    }
	  }, {
	    key: 'loadSound',
	    value: function loadSound(key, src) {
	      var self = this;
	      var done = new Promise(function (resolve, reject) {
	        var soundBuffer;
	        var request = new XMLHttpRequest();
	        request.open("GET", src, true);
	        request.responseType = 'arraybuffer';
	        request.send();

	        function loadHandler(e) {
	          self.actx.decodeAudioData(request.response, function (buffer) {
	            soundBuffer = buffer;
	            self.sounds[key] = soundBuffer;
	            resolve(request.response);
	          }, function (error) {
	            throw new Error("audio failed to load: " + error);
	          });
	        }

	        request.addEventListener('load', loadHandler, false);
	      });

	      return done;
	    }
	  }]);

	  return Loader;
	}();

	exports.default = Loader;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _collision = __webpack_require__(3);

	var _hud = __webpack_require__(4);

	var _hud2 = _interopRequireDefault(_hud);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(options) {
	    _classCallCheck(this, Game);

	    this.hud = options.hud;
	    this.kb = options.kb;
	    this.fgContext = options.fgContext;
	    this.bgContext = options.bgContext;
	    this.gameSize = options.gameSize;
	    this.players = [];
	    this.player1 = options.p1;
	    this.player2 = options.p2;
	    this.bullets1 = [];
	    this.bullets2 = [];
	    this.count = 0;
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

	  _createClass(Game, [{
	    key: 'start',
	    value: function start() {
	      this.reset();
	      this.end = false;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      (0, _collision.playerCollisionCheck)(this.players);
	      (0, _collision.projectileHitCheck)(this.players);

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.players[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var player = _step.value;

	          if (player.update()) {
	            (0, _hud2.default)(this.hud, this.players);
	          } else if (player.lives === 0) {
	            this.end = true;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.players[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var player = _step2.value;
	          player.draw();
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this.players[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var player = _step3.value;

	          player.reset = true;
	          player.playerReset();
	          player.lives = 10;
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  }]);

	  return Game;
	}();

	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var platformCollisionCheck = function platformCollisionCheck(player, platforms) {

	  return platforms.map(function (platform) {

	    // check left edge of platform touching right edge of player
	    var checkPlayerRight = platform.x - (player.position.x + player.size.width);
	    // check right edge of platform with left edge of player
	    var checkPlayerLeft = player.position.x - (platform.x + platform.width);

	    // check top of player with bottom of platform
	    var checkPlayerTop = player.position.y - (platform.y + platform.height);

	    // check bottom of player with top of platform
	    var checkPlayerBottom = platform.y - (player.position.y + player.size.height);

	    var objHalfWidths = player.size.width / 2 + platform.width / 2;
	    var objHalfHeights = player.size.height / 2 + platform.height / 2;

	    // if player obj is touching or overlapping with platorm
	    if (checkPlayerTop <= 0 && checkPlayerBottom <= 0 && checkPlayerLeft <= 0 && checkPlayerRight <= 0) {

	      var distanceX = player.position.x + player.size.width / 2 - (platform.x + platform.width / 2);
	      var distanceY = platform.y + platform.height / 2 - (player.position.y + player.size.height / 2);

	      var x = objHalfWidths - Math.abs(distanceX);
	      var y = objHalfHeights - Math.abs(distanceY);

	      // player approaching top or bottom
	      if (x >= y) {
	        // player is below platform
	        if (distanceY < 0 && !platform.passThrough) {
	          player.position.y = platform.height + platform.y;
	          player.velocity.y = 0;
	        }

	        // player approaching top of platform while moving down
	        if (distanceY > 0 && player.velocity.y > 0) {
	          player.position.y -= y;
	          player.grounded = true;
	          player.jumpcount = 0;
	          player.jumping = false;
	        }
	      } else {
	        //player approaching from side
	        // player approaching left side of platform
	        if (distanceX < 0 && !platform.passThrough) {
	          player.position.x = platform.x - player.size.width;
	          player.velocity.x /= 2;
	        }
	        // player approaching right side of platform
	        if (distanceX > 0 && !platform.passThrough) {
	          player.position.x = platform.width + platform.x;
	          player.velocity.x /= 2;
	        }
	      }
	      return true;
	    }

	    return false;
	  });
	};

	var playerCollisionCheck = function playerCollisionCheck(players) {
	  var player1 = players[0];
	  var player2 = players[1];

	  var distanceX = player2.position.x + player2.size.width / 2 - (player1.position.x + player1.size.width / 2);
	  var distanceY = player2.position.y + player2.size.height / 2 - (player1.position.y + player1.size.height / 2);

	  // if (Math.abs(distanceX) <= player1.size.width / 2 && distanceX > 0 && Math.abs(distanceY) < 25){
	  //   player1.velocity.x = -player1.velocity.x * 1.5;
	  //   player2.velocity.x = -player2.velocity.x * 1.5;
	  //   player2.position.x = player2.position.x + player2.size.width / 4;
	  //   player1.position.x = player1.position.x - player1.size.width / 4;
	  // }
	  //
	  // if (Math.abs(distanceX) <= player1.size.width / 2 && distanceX < 0 && Math.abs(distanceY) < 25) {
	  //   player1.velocity.x = -player1.velocity.x * 1.5;
	  //   player2.velocity.x = -player2.velocity.x * 1.5;
	  //   player2.position.x = player2.position.x - player2.size.width / 4;
	  //   player1.position.x = player1.position.x + player1.size.width / 4;
	  //
	  // }


	  //^^^^^^^^^player x collision


	  if (Math.abs(distanceY) <= player1.size.height / 2 && Math.abs(distanceY) >= player1.size.height / 2 - 20 && distanceY > 0 && Math.abs(Math.floor(distanceX)) < player1.size.width / 2 && player1.velocity.y > 1 && !player2.dead && !player1.stunned) {
	    player1.velocity.y = -15;
	    // player2.reset = true;
	    player2.dead = true;

	    player2.deathCooldown = Date.now() + 750;
	    return true;
	  }

	  if (Math.abs(distanceY) <= player1.size.height / 2 && Math.abs(distanceY) >= player1.size.height / 2 - 20 && distanceY < 0 && Math.abs(Math.floor(distanceX)) < player1.size.width / 2 && player2.velocity.y > 1 && !player1.dead && !player2.stunned) {
	    player2.velocity.y = -15;
	    // player1.reset = true;
	    player1.dead = true;
	    player1.deathCooldown = Date.now() + 750;
	    return true;
	  }

	  return false;
	};

	var projectileHitCheck = function projectileHitCheck(players) {

	  var player1 = players[0];
	  var player2 = players[1];

	  // let projectles = player1.bullets.concat(player2.bullets);

	  var collided = [];

	  collided[0] = player1.bullets.map(function (b) {
	    var distanceX = b.position.x + b.size.width / 2 - (player2.position.x + player2.size.width / 2);
	    var distanceY = b.position.y + b.size.height / 2 - (player2.position.y + player2.size.height / 2);

	    if (Math.abs(distanceX) < player2.size.width / 2 && Math.abs(distanceY) < player2.size.height / 3) {
	      player2.stunned = true;
	      player2.stunCooldown = Date.now() + 1000;
	      return true;
	    } else {
	      return false;
	    }
	  });

	  collided[1] = player2.bullets.map(function (b) {

	    var distanceX = b.position.x + b.size.width / 2 - (player1.position.x + player1.size.width / 2);
	    var distanceY = b.position.y + b.size.height / 2 - (player1.position.y + player1.size.height / 2);

	    if (Math.abs(distanceX) < player1.size.width / 2 && Math.abs(distanceY) < player1.size.height / 3) {
	      player1.stunned = true;
	      player1.stunCooldown = Date.now() + 1000;
	      return true;
	    } else {
	      return false;
	    }
	  });

	  return collided.reduce(function (a, b) {
	    return a.concat(b);
	  }, []);
	};

	exports.playerCollisionCheck = playerCollisionCheck;
	exports.platformCollisionCheck = platformCollisionCheck;
	exports.projectileHitCheck = projectileHitCheck;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderHUD;
	function renderHUD(hud, players) {

	  var canvas = hud.cnvs;
	  var context = hud.ctxt;

	  context.clearRect(0, 0, canvas.width, canvas.height);
	  context.save();

	  context.shadowColor = 'black';
	  context.shadowOffsetY = 1.4;
	  context.shadowOffsetX = 1.4;
	  context.fillStyle = "#838383";
	  context.font = "48px 'Carter One'";
	  context.fillText("Player 1", 10, 50);
	  context.font = "28px 'Carter One'";
	  context.fillText("Lives: " + players[0].lives, 45, 80);

	  context.shadowColor = 'black';
	  context.shadowOffsetY = 1.4;
	  context.shadowOffsetX = 1.4;
	  context.font = "48px 'Carter One'";
	  context.fillStyle = "#EC9F48";
	  context.fillText("Player 2", 1055, 50);
	  context.font = "28px 'Carter One'";
	  context.fillText("Lives: " + players[1].lives, 1085, 80);

	  context.restore();
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _bullet = __webpack_require__(6);

	var _bullet2 = _interopRequireDefault(_bullet);

	var _collision = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import Physics from './physics'

	var Player = function () {
	  function Player(options) {
	    _classCallCheck(this, Player);

	    this.jumpcount = 0;
	    this.lives = 10;
	    this.bullets = [];
	    this.gameSize = { x: 1250, y: 650 };
	    this.kb = options.kb;
	    this.id = 1;
	    this.position = { x: 0, y: 0 };
	    this.size = { width: 45, height: 65 };
	    this.speed = 6;
	    this.velocity = { x: 0, y: 0 };
	    this.jumping = false;
	    this.facing = options.facing;
	    this.grounded = true;
	    this.stunned = false;
	    this.stunCooldown = 0;
	    this.shootCooldown = 0;
	    this.dead = false;
	    this.deathCooldown = 0;
	    this.reset = false;
	    this.heroType = options.heroType;
	    // this.heroImage = new Image();
	    this.imageIndex = 0;
	    this.imageWidth = 100;
	    this.gravity = Math.exp(0.1);
	    this.friction = 0.62;
	    this.platforms = options.platforms;
	    this.fillStyle = options.fillStyle;
	    this.loader = options.loader;

	    Object.assign(this, options);
	  }

	  _createClass(Player, [{
	    key: 'jump',
	    value: function jump() {
	      if (this.jumpcount < 2) {
	        this.velocity.y = -this.speed * 2.5;
	        // this.velocity.y = -this.speed * 4;
	        // this.jumping = true;
	        this.jumping = true;
	        this.grounded = false;
	        this.jumpcount++;
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {

	      if (this.dead && this.facing === "west") {
	        this.imageIndex = 0;
	        this.imageWidth = 133;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'DeadLeft.png';
	      } else if (this.dead && this.facing === "east") {
	        this.imageIndex = 0;
	        this.imageWidth = 133;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'DeadRight.png';
	      } else if (this.stunned && this.facing === "west") {
	        this.imageIndex = 0;
	        this.imageWidth = 100;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'StunnedLeft.png';
	      } else if (this.stunned && this.facing === "east") {
	        this.imageIndex = 0;
	        this.imageWidth = 100;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'StunnedRight.png';
	      } else if (this.jumping && this.velocity.x < 0 && this.facing === "west") {
	        this.imageIndex = 0;
	        this.imageWidth = 100;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'JumpLeft.png';
	      } else if (this.jumping && this.velocity.y < 0 && this.facing === "east") {
	        this.imageIndex = 0;
	        this.imageWidth = 100;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'JumpRight.png';
	      } else if (this.jumping && this.velocity.y > 0 && this.facing === "west") {
	        this.imageIndex = 0;
	        this.imageWidth = 100;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'FallLeft.png';
	      } else if (this.jumping && this.velocity.y > 0 && this.facing === "east") {
	        this.imageIndex = 0;
	        this.imageWidth = 100;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'FallRight.png';
	      } else if (this.velocity.y > 0 && this.facing === "east") {
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'RunRight.png';
	        this.imageWidth = 100;
	        this.imageIndex === 7 ? this.imageIndex = 0 : this.imageIndex++;
	      } else if (this.velocity.x < 0 && this.facing === "west") {
	        this.imageIndex === 7 ? this.imageIndex = 0 : this.imageIndex++;
	        this.imageWidth = 100;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'RunLeft.png';
	      } else if (Math.abs(this.velocity.x) < 1 && this.facing === "east") {
	        this.imageIndex = 0;
	        this.imageWidth = 100;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'IdleRight.png';
	      } else if (Math.abs(this.velocity.x) < 1 && this.facing === "west") {
	        this.imageIndex = 0;
	        this.imageWidth = 100;
	        this.heroImage.src = './images/cat-dog-tileset/' + this.heroType + 'IdleLeft.png';
	      }

	      this.context.drawImage(this.heroImage, this.imageIndex * this.imageWidth, 0, this.imageWidth, 150, this.position.x, this.position.y, this.size.width, this.size.height);

	      // this.context.fillStyle = this.fillStyle;
	      // this.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.bullets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var bullet = _step.value;
	          bullet.draw();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'left',
	    value: function left() {
	      this.velocity.x -= this.speed;
	      this.facing = "west";
	    }
	  }, {
	    key: 'right',
	    value: function right() {
	      this.velocity.x += this.speed;
	      this.facing = "east";
	    }
	  }, {
	    key: 'shoot',
	    value: function shoot() {
	      if (this.shootCooldown < Date.now()) {
	        var bullet = new _bullet2.default({ ctx: this.context,
	          position: { x: this.position.x,
	            y: this.position.y + 40 },
	          playerID: this.id,
	          loader: this.loader });
	        // var projectile = new Projectile(this., this.y+40);
	        // projectile.player = this;

	        this.facing === "east" ? bullet.velocity.x = +bullet.speed : bullet.velocity.x = -bullet.speed;

	        bullet.velocity.y = -bullet.speed / 4;
	        this.bullets.push(bullet);
	        this.shootCooldown = Date.now() + 1750;
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'conditionCheck',
	    value: function conditionCheck() {
	      var now = Date.now();

	      if (this.deathCooldown > now) {
	        this.size.width = 58;
	      } else if (this.dead) {
	        this.reset = true;
	        this.dead = false;
	        this.size.width = 45;
	      }

	      if (this.stunCooldown < now) {
	        this.stunned = false;
	      }
	    }
	  }, {
	    key: 'playerReset',
	    value: function playerReset() {
	      if (this.reset && this.id === 1) {
	        this.lives--;
	        this.position.x = 200;
	        this.position.y = 515;
	        this.facing = "east";
	        this.stunned = false;
	        this.reset = false;
	        return true;
	      }

	      if (this.reset && this.id === 2) {
	        this.lives--;
	        this.position.x = 1000;
	        this.position.y = 515;
	        this.facing = "west";
	        this.stunned = false;
	        this.reset = false;
	        return true;
	      }

	      return false;
	    }
	  }, {
	    key: 'mapBoundryCheck',
	    value: function mapBoundryCheck() {
	      if (this.position.x >= this.gameSize.x - 10) {
	        this.position.x = -35;
	      } else if (this.position.x <= -35) {
	        this.position.x = this.gameSize.x - 10;
	      }

	      if (this.position.y > this.gameSize.y + 750) {
	        this.dead = true;
	      }
	    }

	    // update() returns false on player reset, true otherwise

	  }, {
	    key: 'update',
	    value: function update() {
	      var _this = this;

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {

	        for (var _iterator2 = this.bullets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var bullet = _step2.value;

	          bullet.update();
	        }

	        //remove bullet from screen when it falls to the height of the base platform
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      this.bullets = this.bullets.filter(function (bullet) {
	        return bullet.position.y <= _this.gameSize.y - 70;
	      });

	      if (this.kb.isDown(this.kb.KEYS[this.id].LEFT) && !this.stunned && !this.dead) {
	        this.left();
	      }

	      if (this.kb.isDown(this.kb.KEYS[this.id].RIGHT) && !this.stunned && !this.dead) {
	        this.right();
	      }

	      if (this.kb.isDown(this.kb.KEYS[this.id].UP) && !this.jumpHeld && !this.stunned && !this.dead) {
	        this.jump();
	        this.jumpHeld = true;
	      }

	      if (this.kb.isDown(this.kb.KEYS[this.id].DOWN) && !this.stunned && !this.dead) {
	        this.shoot();
	      }

	      if (this.kb.isUp(this.kb.KEYS[this.id].UP)) {
	        this.jumpHeld = false;
	      }

	      if (this.jumping && !this.kb.keyState[this.kb.KEYS[1].LEFT] && !this.kb.keyState[this.kb.KEYS[1].RIGHT] && !this.kb.keyState[this.kb.KEYS[2].LEFT] && !this.kb.keyState[this.kb.KEYS[2].RIGHT]) {
	        this.velocity.x /= this.friction;
	      }

	      if (Math.abs(this.velocity.x) < 1) {
	        this.velocity.x = 0;
	      }

	      if (Math.abs(this.velocity.x) > 0) {
	        this.grounded = false;
	      }

	      if (!this.grounded) {
	        if (this.velocity.y < 25) this.velocity.y += this.gravity;
	      } else {
	        this.velocity.y = 0;
	      }

	      this.velocity.x *= this.friction;
	      this.position.x += this.velocity.x;
	      this.position.y += this.velocity.y;

	      this.mapBoundryCheck();
	      this.conditionCheck();

	      (0, _collision.platformCollisionCheck)(this, this.platforms); //TODO: move to game object

	      if (this.playerReset()) {
	        return false;
	      } else {
	        return true;
	      }
	    }
	  }]);

	  return Player;
	}();

	exports.default = Player;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Physics from './physics'


	var _collision = __webpack_require__(3);

	var _collision2 = _interopRequireDefault(_collision);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bullet = function () {
	  function Bullet(options) {
	    _classCallCheck(this, Bullet);

	    this.playerID = options.playerID;
	    this.ctx = options.ctx;
	    this.position = options.position;
	    this.size = { width: 15, height: 15 };
	    this.speed = 25;
	    this.velocity = { x: 0, y: 0 };
	    this.gravity = 1.2;
	    this.friction = .75;
	    this.loader = options.loader;
	    this.img = undefined;

	    // this.img = new Image();
	    Object.assign(this, options);
	  }

	  _createClass(Bullet, [{
	    key: 'draw',
	    value: function draw() {
	      if (this.playerID === 1) {
	        this.img = this.loader.getImage('yarnBall');
	      }
	      if (this.playerID === 2) {
	        this.img = this.loader.getImage('tennisBall');
	      }

	      this.ctx.drawImage(this.img, 0, 0, 50, 50, this.position.x, this.position.y, this.size.width, this.size.height);
	      // this.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.velocity.y += this.gravity - .5;
	      this.position.x += this.velocity.x;
	      this.position.y += this.velocity.y;

	      if (this.position.x < 0 - this.size.width) {
	        this.position.x = 1250; //TODO: pass in map size instead of hard coding width
	      }

	      if (this.position.x > 1250) {
	        this.position.x = 0 - this.size.width;
	      }
	    }
	  }]);

	  return Bullet;
	}();

	exports.default = Bullet;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Keyboard = function () {
	  function Keyboard() {
	    var _this = this;

	    _classCallCheck(this, Keyboard);

	    this.keyState = {};
	    this.keyHeld = false;

	    // window.onkeydown = e => keyState[e.keyCode] = true;
	    // window.onkeyup = e => keyState[e.keyCode] = false;

	    this.KEYS = {
	      0: {
	        SPACE: 32,
	        ESCAPE: 27,
	        ENTER: 13,
	        LEFT: 37,
	        RIGHT: 39
	      },
	      1: {
	        UP: 87,
	        LEFT: 65,
	        DOWN: 83,
	        RIGHT: 68
	      }, //WASD
	      2: {
	        UP: 38,
	        LEFT: 37,
	        DOWN: 40,
	        RIGHT: 39
	      } //ARROWS
	    };

	    // hardcoded controls for 2 bluetooth NES GamePads

	    // this.KEYS = {
	    //   0: {
	    //     SPACE: 32,
	    //     ESCAPE: 27,
	    //     ENTER: 13,
	    //     LEFT: 37,
	    //     RIGHT: 39,
	    //   },
	    //   1: {
	    //     UP: 74,
	    //     LEFT: 69,
	    //     DOWN: 71,
	    //     RIGHT: 70,
	    //   }, //WASD
	    //   2: {
	    //     UP: 85,
	    //     LEFT: 82,
	    //     DOWN: 66,
	    //     RIGHT: 65,
	    //   } //ARROWS
	    // };

	    this.isDown = function (keyCode) {
	      return _this.keyState[keyCode] === true;
	    };
	    this.isUp = function (keyCode) {
	      return _this.keyState[keyCode] === false;
	    };
	  }

	  _createClass(Keyboard, [{
	    key: "addListeners",
	    value: function addListeners() {
	      var _this2 = this;

	      document.addEventListener("keydown", function (e) {
	        e.preventDefault();
	        _this2.keyState[e.keyCode] = true;
	      });

	      document.addEventListener("keyup", function (e) {
	        e.preventDefault();
	        _this2.keyState[e.keyCode] = false;
	      });
	    }

	    // document.addEventListener('keydown', e => {
	    //
	    // })

	  }]);

	  return Keyboard;
	}();

	exports.default = Keyboard;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controller = function () {
	  function Controller() {
	    _classCallCheck(this, Controller);

	    this.gamepads = {};
	  }

	  _createClass(Controller, [{
	    key: "addListeners",
	    value: function addListeners() {
	      window.addEventListener("gamepadconnected", function (e) {
	        var gp = navigator.getGamepads()[e.gamepad.index];
	        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", gp.index, gp.id, gp.buttons.length, gp.axes.length);
	      });

	      window.addEventListener("gamepaddisconnected", function (e) {
	        var gp = navigator.getGamepads()[e.gamepad.index];
	        console.log("Gamepad disconnected at index %d: %s. %d buttons, %d axes.", gp.index, gp.id, gp.buttons.length, gp.axes.length);
	      });
	    }
	  }]);

	  return Controller;
	}();

	exports.default = Controller;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var imageArray = [{
	  label: 'StartScreen',
	  src: './images/StartScreen.png'
	}, {
	  label: 'Player1Wins',
	  src: './images/Player1Wins.png'
	}, {
	  label: 'Player2Wins',
	  src: './images/Player2Wins.png'
	}, {
	  label: 'CatDeadLeft',
	  src: './images/cat-dog-tileset/CatDeadLeft.png'
	}, {
	  label: 'CatDeadRight',
	  src: './images/cat-dog-tileset/CatDeadRight.png'
	}, {
	  label: 'CatFallLeft',
	  src: './images/cat-dog-tileset/CatFallLeft.png'
	}, {
	  label: 'CatFallRight',
	  src: './images/cat-dog-tileset/CatFallRight.png'
	}, {
	  label: 'CatIdleLeft',
	  src: './images/cat-dog-tileset/CatIdleLeft.png'
	}, {
	  label: 'CatIdleRight',
	  src: './images/cat-dog-tileset/CatIdleRight.png'
	}, {
	  label: 'CatJumpLeft',
	  src: './images/cat-dog-tileset/CatJumpLeft.png'
	}, {
	  label: 'CatJumpRight',
	  src: './images/cat-dog-tileset/CatJumpRight.png'
	}, {
	  label: 'CatRunLeft',
	  src: './images/cat-dog-tileset/CatRunLeft.png'
	}, {
	  label: 'CatRunRight',
	  src: './images/cat-dog-tileset/CatRunRight.png'
	}, {
	  label: 'CatStunnedLeft',
	  src: './images/cat-dog-tileset/CatStunnedLeft.png'
	}, {
	  label: 'CatStunnedRight',
	  src: './images/cat-dog-tileset/CatStunnedRight.png'
	}, {
	  label: 'DogDeadLeft',
	  src: './images/cat-dog-tileset/DogDeadLeft.png'
	}, {
	  label: 'DogDeadRight',
	  src: './images/cat-dog-tileset/DogDeadRight.png'
	}, {
	  label: 'DogFallLeft',
	  src: './images/cat-dog-tileset/DogFallLeft.png'
	}, {
	  label: 'DogFallRight',
	  src: './images/cat-dog-tileset/DogFallRight.png'
	}, {
	  label: 'DogIdleLeft',
	  src: './images/cat-dog-tileset/DogIdleLeft.png'
	}, {
	  label: 'DogIdleRight',
	  src: './images/cat-dog-tileset/DogIdleRight.png'
	}, {
	  label: 'DogJumpLeft',
	  src: './images/cat-dog-tileset/DogJumpLeft.png'
	}, {
	  label: 'DogJumpRight',
	  src: './images/cat-dog-tileset/DogJumpRight.png'
	}, {
	  label: 'DogRunLeft',
	  src: './images/cat-dog-tileset/DogRunLeft.png'
	}, {
	  label: 'DogRunRight',
	  src: './images/cat-dog-tileset/DogRunRight.png'
	}, {
	  label: 'DogStunnedLeft',
	  src: './images/cat-dog-tileset/DogStunnedLeft.png'
	}, {
	  label: 'DogStunnedRight',
	  src: './images/cat-dog-tileset/DogStunnedRight.png'
	}, {
	  label: 'tennisBall',
	  src: './images/cat-dog-tileset/tennisBall.png'
	}, {
	  label: 'yarnBall',
	  src: './images/cat-dog-tileset/yarnBall.png'
	}];

	var soundArray = [{
	  label: 'happyMusic',
	  src: 'audio/happy.mp3'
	}, {
	  label: 'loadingLoop',
	  src: 'audio/loading-loop-0.wav'
	}, {
	  label: 'theLastEncounterExtended',
	  src: 'audio/tle-extended.mp3'
	}];

	exports.imageArray = imageArray;
	exports.soundArray = soundArray;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setBackground = exports.makePlatforms = undefined;

	var _platform = __webpack_require__(11);

	var _platform2 = _interopRequireDefault(_platform);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var makePlatforms = function makePlatforms(bg, mapNumber) {

	  var platforms = [];

	  if (mapNumber === 0) {
	    // Jungle Map
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(103,58,183,1)', bgContext: bg.ctxt, x: -100, y: 580, width: 1450, height: 70, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(255,152,0,1)', bgContext: bg.ctxt, x: 530, y: 425, width: 335, height: 40, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(0,150,136,1)', bgContext: bg.ctxt, x: 572, y: 180, width: 420, height: 40, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(205,220,57,1)', bgContext: bg.ctxt, x: 215, y: 315, width: 225, height: 40, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(233,30,99,1)', bgContext: bg.ctxt, x: 0, y: 215, width: 147, height: 40, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(33,150,243,1)', bgContext: bg.ctxt, x: 1070, y: 332, width: 180, height: 40, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(255,235,59,1)', bgContext: bg.ctxt, x: 1175, y: 504, width: 75, height: 40, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(63,81,181,1)', bgContext: bg.ctxt, x: 0, y: 400, width: 85, height: 40, passThrough: true }));
	  } else if (mapNumber === 1) {
	    //Desert Map
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(103,58,183,1)', bgContext: bg.ctxt, x: -100, y: 580, width: 352, height: 70, passThrough: false }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(255,152,0,1)', bgContext: bg.ctxt, x: 499, y: 580, width: 250, height: 70, passThrough: false }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(0,150,136,1)', bgContext: bg.ctxt, x: 999, y: 580, width: 352, height: 70, passThrough: false }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(205,220,57,1)', bgContext: bg.ctxt, x: 213, y: 420, width: 312, height: 40, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(233,30,99,1)', bgContext: bg.ctxt, x: 724, y: 420, width: 312, height: 40, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(33,150,243,1)', bgContext: bg.ctxt, x: 403, y: 260, width: 442, height: 40, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(255,235,59,1)', bgContext: bg.ctxt, x: -100, y: 100, width: 250, height: 40, passThrough: true }));
	    platforms.push(new _platform2.default({ fillStyle: 'rgba(63,81,181,1)', bgContext: bg.ctxt, x: 1100, y: 100, width: 250, height: 40, passThrough: true }));
	  }

	  return platforms;
	};

	var setBackground = function setBackground(mapNumber, loader) {
	  var imagePrefix;
	  if (mapNumber === 0) {
	    imagePrefix = 'gameMap4';
	  } else if (mapNumber === 1) {
	    imagePrefix = 'gameMapDesert';
	  }

	  var url = 'url(images/' + imagePrefix + '.png)';
	  document.getElementById('bg-layer').style.backgroundImage = url;
	};

	exports.makePlatforms = makePlatforms;
	exports.setBackground = setBackground;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Platform = function () {
	  function Platform(options) {
	    _classCallCheck(this, Platform);

	    this.x = options.x;
	    this.y = options.y;
	    this.width = options.width;
	    this.height = options.height;
	    this.passThrough = options.passThrough || false;
	    // this.bgContext = options.bg.ctxt;
	    this.fillStyle = options.fillStyle;

	    Object.assign(this, options);
	  }

	  _createClass(Platform, [{
	    key: "draw",
	    value: function draw() {

	      this.bgContext.fillStyle = this.fillStyle;
	      this.bgContext.globalAlpha = 0.5;
	      this.bgContext.fillRect(this.x, this.y, this.width, this.height);
	    }
	  }]);

	  return Platform;
	}();

	exports.default = Platform;

/***/ }
/******/ ]);