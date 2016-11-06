export default class Keyboard {
  constructor() {
    this.keyState = {};

    // window.onkeydown = e => keyState[e.keyCode] = true;
    // window.onkeyup = e => keyState[e.keyCode] = false;

    document.addEventListener("keydown", e => {
      e.preventDefault();
      this.keyState[e.keyCode] = true;
    })

    document.addEventListener("keyup", e => {
      e.preventDefault();
      this.keyState[e.keyCode] = false;
    });


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

    this.isDown = keyCode => this.keyState[keyCode] === true;
    this.isUp = keyCode => this.keyState[keyCode] === false;

  }

}
