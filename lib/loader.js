
export default class Loader {
  constructor() {
    this.images = {};
    this.sounds = {};
    this.fonts = {};
  }
// var initialize = _.once(createApplication);
  loadImages(images) {
    return images.map( image => {
      this.loadImage(image.label, image.src);
    });
  }

  loadImage(key, src) {
    var img = new Image();

    var d = new Promise(function (resolve, reject) {
        img.onload = function () {
            this.images[key] = img;
            resolve(img);
        }.bind(this);

        img.onerror = function () {
            reject('image failed to load: ' + src);
        };
    }.bind(this));

    img.src = src;
    return d;
  }

  getImage(key) {
    return (key in this.images) ? this.images[key] : null;
  }

  // loadSounds(sounds) {
  //
  // }


  loadSound(key, src) {
    var actx = new (window.AudioContext || window.webkitAudioContext)();
    var soundBuffer;
    var request = new XMLHttpRequest();
    request.open("GET", "../audio/tle-extended.mp3", true);
    // request.open("GET", "../audio/loading-loop-0.wav", true);
    request.responseType = 'arraybuffer';
    request.send();

    function loadHandler(e) {
      console.log('audio-loadHandler');
      actx.decodeAudioData(request.response,
        buffer => {
          soundBuffer = buffer;
          let soundNode = actx.createBufferSource();
          soundNode.buffer = soundBuffer;
          soundNode.connect(actx.destination);
          this.sounds[key] = soundNode;
        },
        error => { throw new Error("audio failed to load: " + error); });
      };
      request.addEventListener('load', loadHandler, false);

    }

   loadMusic() {
    var actx = new (window.AudioContext || window.webkitAudioContext)();
    var soundBuffer;
    var request = new XMLHttpRequest();
    request.open("GET", "../audio/tle-extended.mp3", true);
    // request.open("GET", "../audio/loading-loop-0.wav", true);
    request.responseType = 'arraybuffer';
    request.send();

    function loadHandler(e) {
      console.log('audio-loadHandler');
      actx.decodeAudioData(request.response,
        buffer => {
          soundBuffer = buffer;
          let soundNode = actx.createBufferSource();
          soundNode.buffer = soundBuffer;
          soundNode.connect(actx.destination);
          soundNode.loop = true;
          soundNode.start(0);
        },
        error => { throw new Error("audio failed to load: " + error); });
      };
      request.addEventListener('load', loadHandler, false);

    }
}
