export default class Keyboard {
  constructor(game, playerID) {
    var keyState = {};

    // window.onkeydown = e => keyState[e.keyCode] = true;
    // window.onkeyup = e => keyState[e.keyCode] = false;

    document.addEventListener("keydown", e => {
      e.preventDefault();
      keyState[e.keyCode] = true;
    })

    document.addEventListener("keyup", e => {
      e.preventDefault();
      keyState[e.keyCode] = false;
      // if (event.keyCode === this.KEYS[1].UP) {
      //     game.player1.jumpHeld = false;
      // }
      // if (event.keyCode === this.KEYS[2].UP) {
      //     game.player2.jumpHeld = false;
      // }
    });

    this.isDown = keyCode => keyState[keyCode] === true;

    this.isUp = keyCode => keyState[keyCode] === false;

    this.KEYS = {
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
    }

  }
}




// Keyboard.listenForEvents = function (keys) {
//     window.addEventListener('keydown', this._onKeyDown.bind(this));
//     window.addEventListener('keyup', this._onKeyUp.bind(this));
//
//     keys.forEach(function (key) {
//         this._keys[key] = false;
//     }.bind(this));
// }
//
// Keyboard._onKeyDown = function (event) {
//     var keyCode = event.keyCode;
//     if (keyCode in this._keys) {
//         event.preventDefault();
//         this._keys[keyCode] = true;
//     }
// };
//
// Keyboard._onKeyUp = function (event) {
//     var keyCode = event.keyCode;
//     if (keyCode in this._keys) {
//         event.preventDefault();
//         this._keys[keyCode] = false;
//     }
// };
//
// Keyboard.isDown = function (keyCode) {
//     if (!keyCode in this._keys) {
//         throw new Error('Keycode ' + keyCode + ' is not being listened to');
//     }
//     return this._keys[keyCode];
// };
