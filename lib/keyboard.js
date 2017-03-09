export default class Keyboard {
  constructor() {
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
        RIGHT: 39,
      },
      1: {
        UP: 87,
        LEFT: 65,
        DOWN: 83,
        RIGHT: 68,
      }, //WASD
      2: {
        UP: 38,
        LEFT: 37,
        DOWN: 40,
        RIGHT: 39,
      } //ARROWS
    }

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

    this.isDown = keyCode => this.keyState[keyCode] === true;
    this.isUp = keyCode => this.keyState[keyCode] === false;

  }

  addListeners() {
    document.addEventListener("keydown", e => {
      e.preventDefault();
      this.keyState[e.keyCode] = true;
    })

    document.addEventListener("keyup", e => {
      e.preventDefault();
      this.keyState[e.keyCode] = false;
    });
  }

  // document.addEventListener('keydown', e => {
  //
  // })

}
